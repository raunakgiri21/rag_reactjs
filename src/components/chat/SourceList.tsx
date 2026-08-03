interface Source {
  source: string;
  score: number;
  page: number;
}

interface Props {
  sources: Source[];
}

export default function SourceList({ sources }: Props) {
  const uniqueSources = Array.from(
    new Map(sources.map((source) => [source.source, source])).values(),
  );

  return (
    <div className="mt-4 border-t pt-3">
      <p className="mb-2 text-sm font-semibold text-gray-600">Sources</p>

      <div className="space-y-2">
        {uniqueSources.map((source) => (
          <div
            key={source.source}
            className="rounded border bg-gray-50 p-2 text-sm"
          >
            <div className="font-medium">📄 {source.source}</div>

            <div className="text-xs text-gray-500">Page {source.page}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
