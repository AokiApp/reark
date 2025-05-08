import { Block, TextElement } from "@aokiapp/reark-lark-api";
import React from "react";
import "../styles/TableOfContents.css";

type TOCEntry = {
  blockId: string;
  level: number;
  text: string;
};

function extractHeadings(blocks: Block[]): TOCEntry[] {
  const rootBlockId = blocks[0]?.block_id;
  const headings: TOCEntry[] = [];
  for (const block of blocks) {
    if (block.parent_id !== rootBlockId) {
      // ルートブロックの子供でない場合はスキップ
      continue;
    }
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
  /**
   * どのレベル以上をデフォルトで開くか（例: 3ならlevel3以上はopen、1,2は閉じる）
   */
  openLevelThreshold?: number;
};

/**
 * TOCEntryTree: ネスト構造用
 */
type TOCEntryTree = TOCEntry & { children: TOCEntryTree[] };

/**
 * フラットなheadings配列をツリー構造に変換
 */
function buildTOCTree(headings: TOCEntry[]): TOCEntryTree[] {
  const root: TOCEntryTree[] = [];
  const stack: TOCEntryTree[] = [];

  for (const h of headings) {
    const node: TOCEntryTree = { ...h, children: [] };
    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  }
  return root;
}

/**
 * 再帰的にTOCを描画
 */
const TOCList: React.FC<{
  nodes: TOCEntryTree[];
  openLevelThreshold: number;
}> = ({ nodes, openLevelThreshold }) => {
  return (
    <ul>
      {nodes.map((node) => (
        <li
          key={node.blockId}
          className={`reark-toc__item reark-toc__item--level${node.level}`}
        >
          {node.children.length > 0 ? (
            <details open={node.level >= openLevelThreshold}>
              <summary>
                <a href={`#${node.blockId}`}>{node.text}</a>
              </summary>
              <TOCList
                nodes={node.children}
                openLevelThreshold={openLevelThreshold}
              />
            </details>
          ) : (
            <a href={`#${node.blockId}`}>{node.text}</a>
          )}
        </li>
      ))}
    </ul>
  );
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  blocks,
  openLevelThreshold,
}) => {
  const headings = extractHeadings(blocks);

  if (headings.length === 0) {
    return null;
  }

  const tocTree = buildTOCTree(headings);
  const threshold = openLevelThreshold ?? 3;

  return (
    <nav className="reark-toc">
      <TOCList nodes={tocTree} openLevelThreshold={threshold} />
    </nav>
  );
};
