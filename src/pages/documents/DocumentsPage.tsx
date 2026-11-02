import { useState } from "react";
import type { Document } from "@/api/documents/documents.schema";
import DocumentCard from "@/components/documents/DocumentCard";
import DeleteDocumentModal from "@/components/documents/DeleteDocumentModal";
import { useDocumentsQuery } from "@/hooks/queries/useDocumentsQuery";
import { useDeleteDocumentMutation } from "@/hooks/mutations/useDeleteDocumentMutation";
import { Link } from "react-router-dom";
import { getApiError } from "@/utils/api-error";

export default function DocumentsPage() {
  const { data, isLoading, isError, error, refetch } = useDocumentsQuery();

  const deleteMutation = useDeleteDocumentMutation();

  const [selected, setSelected] = useState<Document | null>(null);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border border-red-200 bg-white">
        <h2 className="text-xl font-semibold text-red-700">
          Unable to load documents
        </h2>

        <p className="mt-2 text-sm text-gray-500">{getApiError(error)}</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
        <h2 className="text-xl font-semibold text-gray-700">
          No documents found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Upload a PDF document to get started.
        </p>

        <Link
          to="/upload"
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          Upload Document
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="space-y-3">
        {data?.data.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onDelete={setSelected}
          />
        ))}
      </div>

      <DeleteDocumentModal
        open={!!selected}
        fileName={selected?.fileName ?? ""}
        loading={deleteMutation.isPending}
        onCancel={() => setSelected(null)}
        onConfirm={() => {
          if (!selected) return;

          deleteMutation.mutate(selected.id, {
            onSuccess() {
              setSelected(null);
            },
          });
        }}
      />
    </>
  );
}
