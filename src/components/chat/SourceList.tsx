import { useNavigate } from "react-router-dom";

interface Source {
  source: string;
  documentId: string;
  score: number;
  page: number;
}

interface Props {
  sources: Source[];
}

export default function SourceList({ sources }: Props) {
  const navigate = useNavigate();
  const uniqueSources = Array.from(
    new Map(sources.map((source) => [source.source, source])).values(),
  );

  return (
    <div className="mt-4 border-t pt-3">
      <p className="mb-2 text-sm font-semibold text-gray-600">Sources</p>

      <div className="space-y-2">
        {uniqueSources.map((source) => (
          <button
            key={`${source.documentId}-${source.page}`}
            onClick={() =>
              navigate(`/documents/${source.documentId}?page=${source.page}`)
            }
            className="w-full rounded border bg-gray-50 p-2 text-left text-sm transition hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
          >
            <div className="font-medium">📄 {source.source}</div>

            <div className="text-xs text-gray-500">Page {source.page}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
