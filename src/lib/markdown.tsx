import React from 'react';

/**
 * A lightweight, safe parser that converts standard markdown (headers, paragraphs, 
 * lists, and inline code blocks) into React JSX elements.
 */
export function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Split content into logical blocks by double newlines
  const blocks = text.split(/\n\s*\n/);

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Headings
    if (trimmed.startsWith('### ')) {
      return (
        <h4 key={idx} className="md-h4">
          {renderInlineFormatting(trimmed.replace('### ', ''))}
        </h4>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={idx} className="md-h3">
          {renderInlineFormatting(trimmed.replace('## ', ''))}
        </h3>
      );
    }
    if (trimmed.startsWith('# ')) {
      return (
        <h2 key={idx} className="md-h2">
          {renderInlineFormatting(trimmed.replace('# ', ''))}
        </h2>
      );
    }

    // Bullet Lists
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').map((line, i) => {
        const cleanLine = line.replace(/^[\*\-]\s+/, '');
        return (
          <li key={i} className="md-li">
            {renderInlineFormatting(cleanLine)}
          </li>
        );
      });
      return (
        <ul key={idx} className="md-ul">
          {items}
        </ul>
      );
    }

    // Default: Paragraph
    return (
      <p key={idx} className="md-p">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });
}

/**
 * Parses inline formatting (specifically backticks for `code` blocks)
 */
function renderInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/`([^`]+)`/g);
  if (parts.length === 1) return text;
  
  return parts.map((part, i) => {
    // Odd indexes represent content inside backticks
    if (i % 2 === 1) {
      return <code key={i} className="md-code">{part}</code>;
    }
    return part;
  });
}
