import { css } from "@emotion/react";
import { useState } from "react";
import { Converter, CommentList, extractDocId } from "@aokiapp/reark-renderer";

const containerStyle = css({
  display: "flex",
});

const mainContentStyle = css({
  flex: 3,
  padding: "20px",
});

const sidebarStyle = css({
  flex: 1,
  padding: "20px",
  borderLeft: "1px solid #ddd",
  overflowY: "auto",
});

const headerStyle = css({
  marginBottom: "24px",
});

const inputStyle = css({
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "16px",
  "&:focus": {
    outline: "none",
    borderColor: "#1a73e8",
    boxShadow: "0 0 0 2px rgba(26, 115, 232, 0.2)",
  },
});

export default function App() {
  const [documentId, setDocumentId] = useState("");

  const handleDocumentIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // example uri: https://aoki-app.jp.larksuite.com/docx/Q5Oqd7WljoQL6Nx4bdVjOASbpue?from=from_copylink
    // extracted Q5Oqd7WljoQL6Nx4bdVjOASbpue

    // extract the document ID from the URL
    const url = event.target.value;
    setDocumentId(extractDocId(url));
  };

  return (
    <div>
      <header css={headerStyle}>
        <h1>Lark to React</h1>
        <input
          type="text"
          value={documentId} // note: URL形式をコピーしたら勝手に変形するけどまあデモだしご愛嬌
          onChange={handleDocumentIdChange}
          placeholder="Enter Lark document URL"
          css={inputStyle}
        />
      </header>

      <div css={containerStyle}>
        <main css={mainContentStyle}>
          <Converter documentId={documentId} />
        </main>
        <aside css={sidebarStyle}>
          <CommentList documentId={documentId} />
        </aside>
      </div>
    </div>
  );
}
