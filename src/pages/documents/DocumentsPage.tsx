import { useState } from "react";
import type { Document } from "@/api/documents/documents.schema";
import DocumentCard from "@/components/common/documents/DocumentCard";
import DeleteDocumentModal from "@/components/common/documents/DeleteDocumentModal";
import { useDocumentsQuery } from "@/hooks/queries/useDocumentsQuery";
import { useDeleteDocumentMutation } from "@/hooks/mutations/useDeleteDocumentMutation";

export default function DocumentsPage() {
  const { data, isLoading } = useDocumentsQuery();

  const deleteMutation = useDeleteDocumentMutation();

  const [selected, setSelected] = useState<Document | null>(null);

  if (isLoading) {
    return <h1>Loading...</h1>;
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
