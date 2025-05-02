export interface UnsupportedBlockProps {
  type: number;
}

export function UnsupportedBlock({ type }: UnsupportedBlockProps) {
  return (
    <div className="reark-unsupported-block">
      <strong>Unsupported block type: {type}</strong>
    </div>
  );
}
