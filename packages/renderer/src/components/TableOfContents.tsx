import { Block, TextElement } from "@aokiapp/reark-lark-api";
import React from "react";

type TOCEntry = {
  blockId: string;
  level: number;
  text: string;
};

function extractHeadings(blocks: Block[]): TOCEntry[] {
  const headings: TOCEntry[] = [];
  for (const block of blocks) {
    for (let level = 1; level <= 9; level++) {
      const key = `heading${level}` as keyof Block;
      const heading = block[key] as
        | {
            elements: TextElement[];
          }
        | undefined;
      if (heading && Array.isArray(heading.elements)) {
        // テキスト抽出
        const text = heading.elements
          .map((el) => el.text_run?.content || "")
          .join("");
        headings.push({
          blockId: block.block_id,
          level,
          text,
        });
        break; // 1ブロックに複数headingはない前提
      }
    }
  }
  return headings;
}

export type TableOfContentsProps = {
  blocks: Block[];
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ blocks }) => {
  const headings = extractHeadings(blocks);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="reark-toc">
      <ul>
        {headings.map((h) => (
          <li
            key={h.blockId}
            style={{ marginLeft: (h.level - 1) * 16 }}
            className={`reark-toc__item reark-toc__item--level${h.level}`}
          >
            {h.text}
          </li>
        ))}
      </ul>
    </nav>
  );
};
