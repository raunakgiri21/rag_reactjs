interface Props {
  onFileChange(file: File): void;
}

export default function FileDropzone({ onFileChange }: Props) {
  return (
    <input
      type="file"
      accept=".pdf"
      onChange={(e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        onFileChange(file);
      }}
    />
  );
}
