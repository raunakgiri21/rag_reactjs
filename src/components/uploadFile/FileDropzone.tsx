import { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  onFileChange(file: File): void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function FileDropzone({ onFileChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File) {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Maximum file size is 10 MB.");
      return;
    }

    onFileChange(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    handleFile(file);
  }

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all
          ${
            isDragging
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 bg-white hover:border-blue-400"
          }`}
      >
        <div className="text-5xl">📄</div>

        <h2 className="mt-4 text-lg font-semibold">Drag & Drop PDF Here</h2>

        <p className="mt-2 text-sm text-gray-500">or click to browse</p>

        <p className="mt-1 text-xs text-gray-400">Maximum file size: 10 MB</p>
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          handleFile(file);

          // Allow selecting the same file again
          e.target.value = "";
        }}
      />
    </>
  );
}
