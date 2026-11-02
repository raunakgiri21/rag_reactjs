import {
  Component,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

import { getDocumentPdf } from "@/api/documents/documents.api";
import ErrorFallback from "@/components/common/ErrorFallback";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PdfViewerProps {
  documentId: string;
  initialPage?: number;
}

interface PdfViewerErrorBoundaryProps {
  children: ReactNode;
}

interface PdfViewerErrorBoundaryState {
  hasError: boolean;
}

class PdfViewerErrorBoundary extends Component<
  PdfViewerErrorBoundaryProps,
  PdfViewerErrorBoundaryState
> {
  state: PdfViewerErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): PdfViewerErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PDF viewer failed to render.", error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          title="Unable to display PDF"
          message="The PDF viewer encountered an unexpected error."
          onRetry={this.retry}
        />
      );
    }

    return this.props.children;
  }
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 0.1;

function PdfViewerContent({
  documentId,
  initialPage = 1,
}: PdfViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [numPages, setNumPages] = useState(0);
  const [pageInput, setPageInput] = useState(String(initialPage));
  const [scale, setScale] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch PDF whenever the document changes.
  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | null = null;

    async function loadPdf() {
      setLoading(true);
      setError("");
      setPdfUrl(null);
      setNumPages(0);
      setScale(1);

      try {
        const blob = await getDocumentPdf(documentId, controller.signal);

        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError("Unable to load PDF. Please try again.");
        console.error(err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      controller.abort();

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [documentId]);

  // Synchronize page when document or requested page changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageNumber(initialPage);
    setPageInput(String(initialPage));
  }, [documentId, initialPage]);

  // Navigate to a valid page and synchronize the input.
  const goToPage = (page: number, totalPages = numPages) => {
    const requestedPage = Number.isFinite(page) ? Math.trunc(page) : 1;

    const validPage =
      totalPages > 0
        ? Math.max(1, Math.min(requestedPage, totalPages))
        : Math.max(1, requestedPage);

    setPageNumber(validPage);
    setPageInput(String(validPage));
  };

  // Zoom controls.
  const zoomIn = () => {
    setScale((current) =>
      Math.min(MAX_SCALE, Number((current + ZOOM_STEP).toFixed(1))),
    );
  };

  const zoomOut = () => {
    setScale((current) =>
      Math.max(MIN_SCALE, Number((current - ZOOM_STEP).toFixed(1))),
    );
  };

  const resetZoom = () => setScale(1);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b p-3">
        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            disabled={pageNumber <= 1 || !numPages}
            onClick={() => goToPage(pageNumber - 1)}
            className="rounded p-2 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <input
              type="number"
              min={1}
              max={numPages}
              value={pageInput}
              disabled={!numPages}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goToPage(Number(pageInput) || 1);
                }
              }}
              onBlur={() => {
                if (numPages) {
                  goToPage(Number(pageInput) || 1);
                }
              }}
              className="w-14 rounded border p-1 text-center"
            />

            <span className="text-gray-500">of {numPages || "--"}</span>
          </div>

          <button
            disabled={pageNumber >= numPages || !numPages}
            onClick={() => goToPage(pageNumber + 1)}
            className="rounded p-2 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="h-6 border-l" />

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={scale <= MIN_SCALE}
            onClick={zoomOut}
            className="rounded p-2 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Zoom out"
          >
            <ZoomOut size={18} />
          </button>

          <button
            onClick={resetZoom}
            className="min-w-14 rounded px-2 py-1 text-sm hover:bg-gray-100"
            title="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            disabled={scale >= MAX_SCALE}
            onClick={zoomIn}
            className="rounded p-2 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={resetZoom}
            className="rounded p-2 hover:bg-gray-100"
            title="Reset zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* PDF content */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        {loading && (
          <div className="flex justify-center p-10">
            <Loader2 className="animate-spin" />
            <span className="ml-2">Loading PDF...</span>
          </div>
        )}

        {error && <p className="p-6 text-center text-red-500">{error}</p>}

        {pdfUrl && !loading && (
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              goToPage(initialPage, numPages);
            }}
            onLoadError={(err) => {
              setError("Unable to render PDF.");
              console.error(err);
            }}
            loading="Rendering PDF..."
          >
            <div className="flex w-full justify-center">
              <Page
                pageNumber={pageNumber}
                width={Math.min(750, window.innerWidth - 80)}
                scale={scale}
                renderTextLayer
                renderAnnotationLayer
              />
            </div>
          </Document>
        )}
      </div>
    </div>
  );
}

export default function PdfViewer(props: PdfViewerProps) {
  return (
    <PdfViewerErrorBoundary>
      <PdfViewerContent {...props} />
    </PdfViewerErrorBoundary>
  );
}
