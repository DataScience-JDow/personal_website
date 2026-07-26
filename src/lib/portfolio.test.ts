import assert from 'node:assert/strict';
import test from 'node:test';

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
