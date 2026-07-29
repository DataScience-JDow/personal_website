import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ArchitectureDiagram from '../components/ArchitectureDiagram';
import ProjectProofPage from '../app/projects/[slug]/page';

import {
  caseStudies,
  getCaseStudyById,
  getPublicProofPageBySlug,
  publicProofPages,
} from './portfolio';

test('Hermes LifeScore has a linked public case study and proof page', () => {
  const study = getCaseStudyById('hermes-lifescore');
  const proofPage = getPublicProofPageBySlug('hermes-lifescore');

  assert.ok(study);
  assert.equal(study.category, 'personal');
  assert.equal(study.proofPageSlug, 'hermes-lifescore');
  assert.ok(study.stack.includes('HealthKit'));
  assert.ok(study.stack.includes('Python'));

  assert.ok(proofPage);
  assert.equal(proofPage.studyId, study.id);
  assert.ok(proofPage.architecture.some((item) => item.detail.includes('HMAC')));
  assert.ok(proofPage.publicProof.some((item) => item.includes('redacted')));

  assert.ok(proofPage.diagram);
  assert.equal(proofPage.diagram.title, 'LifeScore data flow and trust boundaries');
  assert.deepEqual(
    proofPage.diagram.stages.map((stage) => stage.title),
    [
      'HealthKit',
      'Signed iOS summary',
      'Authenticated ingest',
      'SQLite and scoring',
      'Hermes scheduler',
      'Telegram reflection',
    ],
  );
  assert.ok(proofPage.diagram.stages.every((stage) => stage.failureSignal.length > 0));
  assert.ok(proofPage.diagram.trustBoundaries.length >= 2);
  const stageIds = proofPage.diagram.stages.map((stage) => stage.id);
  assert.equal(new Set(stageIds).size, stageIds.length, 'diagram stage IDs must be unique');
  for (const boundary of proofPage.diagram.trustBoundaries) {
    const boundaryIndex = stageIds.indexOf(boundary.afterStage);
    assert.ok(boundaryIndex >= 0 && boundaryIndex < stageIds.length - 1);
  }
  for (const flow of proofPage.diagram.feedbackFlows) {
    assert.ok(stageIds.includes(flow.fromStage));
    assert.ok(stageIds.includes(flow.toStage));
    assert.notEqual(flow.fromStage, flow.toStage);
  }
  assert.ok(
    proofPage.diagram.feedbackFlows.some(
      (flow) => flow.fromStage === 'telegram-reflection' && flow.toStage === 'sqlite-scoring',
    ),
    'subjective Telegram replies must be represented as an inbound flow',
  );
  assert.match(proofPage.diagram.description, /outbound.*health-derived guidance/i);
  assert.equal(
    stageIds.indexOf('telegram-reflection'),
    stageIds.indexOf('hermes-scheduler') + 1,
    'the primary outbound path must connect the scheduler to Telegram',
  );
  assert.ok(
    !proofPage.nextIterations.some((item) => item.includes('architecture diagram')),
    'published diagram must not remain listed as a future iteration',
  );

  const publicDiagramText = JSON.stringify(proofPage.diagram).toLowerCase();
  for (const privateDetail of [
    '/opt/',
    'device id',
    'chat id',
    'source_device',
    'runtime path',
    'bot token',
    'shared secret',
  ]) {
    assert.ok(!publicDiagramText.includes(privateDetail), `diagram exposes ${privateDetail}`);
  }
});

test('public proof identifiers are unique and every proof link resolves both ways', () => {
  const studyIds = caseStudies.map((study) => study.id);
  const proofSlugs = publicProofPages.map((page) => page.slug);

  assert.equal(new Set(studyIds).size, studyIds.length);
  assert.equal(new Set(proofSlugs).size, proofSlugs.length);

  for (const page of publicProofPages) {
    const study = caseStudies.find((candidate) => candidate.id === page.studyId);
    assert.ok(study, `missing case study for ${page.slug}`);
    assert.equal(study.proofPageSlug, page.slug);
  }

  for (const study of caseStudies.filter((candidate) => candidate.proofPageSlug)) {
    const page = publicProofPages.find((candidate) => candidate.slug === study.proofPageSlug);
    assert.ok(page, `missing public proof page for ${study.id}`);
    assert.equal(page.studyId, study.id);
  }
});

test('architecture diagrams render an accessible SVG and complete text fallback', () => {
  const proofPage = getPublicProofPageBySlug('hermes-lifescore');

  assert.ok(proofPage?.diagram);
  const markup = renderToStaticMarkup(
    createElement(ArchitectureDiagram, { diagram: proofPage.diagram }),
  );

  assert.match(markup, /<svg[^>]+role="img"[^>]+aria-labelledby=/);
  assert.match(markup, /<title[^>]*>LifeScore data flow and trust boundaries<\/title>/);
  assert.match(markup, /Authenticated write boundary/);
  assert.match(markup, /Messaging boundary/);
  assert.match(markup, /Subjective check-in reply/);
  assert.match(markup, /<ol class="architecture-diagram-fallback">/);
  assert.match(markup, /style="min-width:[0-9]+px"/);
  assert.ok(
    markup.lastIndexOf('<figcaption>') > markup.lastIndexOf('architecture-diagram-boundary-notes'),
    'figcaption must be the final figure child',
  );

  for (const stage of proofPage.diagram.stages) {
    assert.ok(markup.includes(stage.title));
    assert.ok(markup.includes(stage.detail));
    assert.ok(markup.includes(stage.failureSignal));
  }
});

test('architecture diagrams wrap long stage titles without changing the fallback text', () => {
  const proofPage = getPublicProofPageBySlug('hermes-lifescore');
  assert.ok(proofPage?.diagram);

  const longTitle = 'A deliberately long architecture stage title';
  const markup = renderToStaticMarkup(
    createElement(ArchitectureDiagram, {
      diagram: {
        ...proofPage.diagram,
        stages: [{ ...proofPage.diagram.stages[0], title: longTitle }],
        trustBoundaries: [],
        feedbackFlows: [],
      },
    }),
  );

  assert.ok(markup.includes(longTitle));
  assert.ok((markup.match(/<tspan/g) ?? []).length >= 2);
  assert.match(markup, /style="min-width:220px"/);

  const unbrokenTitle = 'AnUnbrokenArchitectureIdentifierThatCannotWrapNaturally';
  const unbrokenMarkup = renderToStaticMarkup(
    createElement(ArchitectureDiagram, {
      diagram: {
        ...proofPage.diagram,
        stages: [{ ...proofPage.diagram.stages[0], title: unbrokenTitle }],
        trustBoundaries: [],
        feedbackFlows: [],
      },
    }),
  );

  assert.ok(unbrokenMarkup.includes(unbrokenTitle));
  assert.ok((unbrokenMarkup.match(/<tspan/g) ?? []).length > 1);
  assert.ok((unbrokenMarkup.match(/<tspan/g) ?? []).length <= 3);
  assert.match(unbrokenMarkup, /…/);
});

test('proof pages render an optional architecture diagram from portfolio data', async () => {
  const page = await ProjectProofPage({
    params: Promise.resolve({ slug: 'hermes-lifescore' }),
  });
  const markup = renderToStaticMarkup(page);

  assert.match(markup, /<figure class="architecture-diagram">/);
  assert.match(markup, /LifeScore data flow and trust boundaries/);
});
