import { Eye, X } from "lucide-react";
import { Link } from "react-router-dom";

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

      <div className="flex items-center gap-2">
        <Link
          to={`/documents/${document.id}`}
          className="rounded p-2 hover:bg-blue-100"
          aria-label={`View ${document.fileName}`}
        >
          <Eye className="h-5 w-5 text-blue-600" />
        </Link>

        <button
          onClick={() => onDelete(document)}
          className="cursor-pointer rounded p-2 hover:bg-red-100"
          aria-label={`Delete ${document.fileName}`}
        >
          <X className="h-5 w-5 text-red-600" />
        </button>
      </div>
    </div>
  );
}
