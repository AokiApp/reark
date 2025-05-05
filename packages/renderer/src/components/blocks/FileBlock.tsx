import { BlockInnerComponent } from "../../types";

/**
 * FileBlock: Renders a file block (block_type: 23).
 * - Shows file name and download link if available.
 * - This block is usually paired with a ViewBlock (block_type: 33) for visual representation.
 * - If rendered directly, provides basic file info.
 */
export const FileBlock: BlockInnerComponent = ({ block }) => {
  const file = block.file;
  if (!file) {
    return (
      <div className="reark-file-block reark-file-block--empty">
        No file data
      </div>
    );
  }

  return (
    <div className="reark-file-block">
      <div>
        <strong>File:</strong> {file.name || "(no name)"}
      </div>
      {file.token ? (
        <a
          href={`https://open.feishu.cn/drive/file/${file.token}`}
          target="_blank"
          rel="noopener noreferrer"
          className="reark-file-block__file-link"
        >
          Download / Open
        </a>
      ) : (
        <span className="reark-file-block__file-link--disabled">
          (No file token)
        </span>
      )}
    </div>
  );
};
