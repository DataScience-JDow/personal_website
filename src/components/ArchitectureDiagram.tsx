import { useId } from 'react';

import type { ProofArchitectureDiagram } from '@/lib/portfolio';

type ArchitectureDiagramProps = {
  diagram: ProofArchitectureDiagram;
};

const stageWidth = 164;
const stageGap = 28;
const stageStart = 28;

function wrapSvgTitle(title: string, maxLineLength = 18, maxLines = 3): string[] {
  const words = title
    .trim()
    .split(/\s+/)
    .flatMap((word) => word.match(new RegExp(`.{1,${maxLineLength}}`, 'g')) ?? []);
  const lines: string[] = [];

  for (const word of words) {
    const current = lines.at(-1);
    if (!current || current.length + word.length + 1 > maxLineLength) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${current} ${word}`;
    }
  }

  if (lines.length <= maxLines) return lines;

  const visibleLines = lines.slice(0, maxLines);
  visibleLines[maxLines - 1] = `${visibleLines[maxLines - 1].slice(0, maxLineLength - 1)}…`;
  return visibleLines;
}

export default function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  const titleId = useId();
  const descriptionId = useId();
  const viewWidth =
    stageStart * 2 + diagram.stages.length * stageWidth + (diagram.stages.length - 1) * stageGap;

  return (
    <figure className="architecture-diagram">
      <div
        className="architecture-diagram-canvas"
        role="region"
        aria-label={`${diagram.title} visual; scroll horizontally to view all stages`}
        tabIndex={0}
      >
        <svg
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
          viewBox={`0 0 ${viewWidth} 350`}
          style={{ minWidth: `${viewWidth}px` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={titleId}>{diagram.title}</title>
          <desc id={descriptionId}>{diagram.description}</desc>
          <defs>
            <marker
              id={`${titleId}-arrow`}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="7"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0L8 4L0 8Z" className="architecture-diagram-arrowhead" />
            </marker>
          </defs>

          {diagram.stages.slice(0, -1).map((stage, index) => {
            const x1 = stageStart + index * (stageWidth + stageGap) + stageWidth;
            const x2 = x1 + stageGap - 6;

            return (
              <line
                className="architecture-diagram-connector"
                key={`${stage.id}-connector`}
                markerEnd={`url(#${titleId}-arrow)`}
                x1={x1}
                x2={x2}
                y1="142"
                y2="142"
              />
            );
          })}

          {diagram.feedbackFlows.map((flow) => {
            const fromIndex = diagram.stages.findIndex((stage) => stage.id === flow.fromStage);
            const toIndex = diagram.stages.findIndex((stage) => stage.id === flow.toStage);
            if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return null;

            const fromX = stageStart + fromIndex * (stageWidth + stageGap) + stageWidth / 2;
            const toX = stageStart + toIndex * (stageWidth + stageGap) + stageWidth / 2;
            const labelX = (fromX + toX) / 2;

            return (
              <g className="architecture-diagram-feedback" key={`${flow.fromStage}-${flow.toStage}`}>
                <path
                  d={`M ${fromX} 230 C ${fromX} 302, ${toX} 302, ${toX} 230`}
                  markerEnd={`url(#${titleId}-arrow)`}
                />
                <text textAnchor="middle" x={labelX} y="318">
                  {flow.label}
                </text>
              </g>
            );
          })}

          {diagram.trustBoundaries.map((boundary) => {
            const stageIndex = diagram.stages.findIndex(
              (stage) => stage.id === boundary.afterStage,
            );

            if (stageIndex < 0 || stageIndex === diagram.stages.length - 1) {
              return null;
            }

            const x =
              stageStart + stageIndex * (stageWidth + stageGap) + stageWidth + stageGap / 2;

            return (
              <g className="architecture-diagram-boundary" key={boundary.label}>
                <line x1={x} x2={x} y1="42" y2="260" />
                <text textAnchor="middle" transform={`translate(${x + 5} 252) rotate(-90)`}>
                  {boundary.label}
                </text>
              </g>
            );
          })}

          {diagram.stages.map((stage, index) => {
            const x = stageStart + index * (stageWidth + stageGap);
            const titleLines = wrapSvgTitle(stage.title);

            return (
              <g className="architecture-diagram-stage" key={stage.id}>
                <rect height="164" rx="12" width={stageWidth} x={x} y="60" />
                <text className="architecture-diagram-zone" x={x + 16} y="88">
                  {stage.trustZone}
                </text>
                <text className="architecture-diagram-title" x={x + 16} y="116">
                  {titleLines.map((line, lineIndex) => (
                    <tspan key={`${lineIndex}-${line}`} x={x + 16} dy={lineIndex === 0 ? 0 : 18}>
                      {line}
                    </tspan>
                  ))}
                </text>
                <circle cx={x + 18} cy="187" r="5" />
                <text className="architecture-diagram-signal" x={x + 32} y="192">
                  Failure signal
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <ol className="architecture-diagram-fallback">
        {diagram.stages.map((stage) => (
          <li key={stage.id}>
            <span className="architecture-diagram-fallback-zone">{stage.trustZone}</span>
            <strong>{stage.title}</strong>
            <span>{stage.detail}</span>
            <span>
              <b>Failure / observability:</b> {stage.failureSignal}
            </span>
          </li>
        ))}
      </ol>

      <div className="architecture-diagram-boundary-notes">
        <strong>Trust boundaries and feedback</strong>
        <ul>
          {diagram.trustBoundaries.map((boundary) => (
            <li key={boundary.label}>
              <b>{boundary.label}:</b> {boundary.detail}
            </li>
          ))}
          {diagram.feedbackFlows.map((flow) => (
            <li key={`${flow.fromStage}-${flow.toStage}`}>
              <b>{flow.label}:</b> {flow.detail}
            </li>
          ))}
        </ul>
      </div>

      <figcaption>
        <strong>{diagram.title}</strong>
        <span>{diagram.description}</span>
      </figcaption>
    </figure>
  );
}
