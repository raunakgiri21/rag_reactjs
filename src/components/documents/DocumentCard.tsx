import { X } from "lucide-react";

import type { Document } from "@/api/documents/documents.schema";

interface Props {
  document: Document;
  onDelete(document: Document): void;
}

export default function DocumentCard({ document, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <h3 className="font-semibold">{document.fileName}</h3>
      </div>

      <button
        onClick={() => onDelete(document)}
        className="rounded p-2 hover:bg-red-100 cursor-pointer"
      >
        <X className="h-5 w-5 text-red-600" />
      </button>
    </div>
  );
}
