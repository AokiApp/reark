import { redirect } from "next/navigation";

// Utility to extract documentId from Lark URL or plain ID
function extractDocId(input: string): string {
  const match = input.match(/docx\/([a-zA-Z0-9]+)/);
  if (match) return match[1];
  if (/^[a-zA-Z0-9]+$/.test(input)) return input;
  return "";
}

// Server action for form submission
async function submitLarkForm(formData: FormData) {
  "use server";
  const input = formData.get("input") as string;
  const docId = extractDocId(input);
  if (docId) {
    redirect(`/?documentId=${encodeURIComponent(docId)}`);
  }
}

type LarkFormProps = {
  initialValue?: string;
};

export default function LarkForm({ initialValue = "" }: LarkFormProps) {
  // Optionally, you can get searchParams from props or context if needed
  return (
    <form action={submitLarkForm}>
      <input
        type="text"
        name="input"
        defaultValue={initialValue}
        placeholder="Enter Lark document URL"
        style={{
          width: "100%",
          padding: "8px 12px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>
        Load Document
      </button>
    </form>
  );
}
