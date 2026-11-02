import PdfViewer from "@/components/pdf/PdfViewer";
import { useParams, useSearchParams } from "react-router-dom";

export default function DocumentPreview() {
  const { documentId } = useParams();
  const [searchParams] = useSearchParams();

  const requestedPage = Number(searchParams.get("page")) || 1;

  if (!documentId) {
    return <p>Document unavailable.</p>;
  }

  return (
    <div className="flex h-screen flex-col p-4">
      <h1 className="mb-4 text-lg font-semibold">Document Preview</h1>

      <div className="min-h-0 flex-1">
        <PdfViewer
          key={`${documentId}-${requestedPage}`}
          documentId={documentId}
          initialPage={requestedPage}
        />
      </div>
    </div>
  );
}
