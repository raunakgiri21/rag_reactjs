interface Props {
  open: boolean;

  fileName: string;

  loading: boolean;

  onCancel(): void;

  onConfirm(): void;
}

export default function DeleteDocumentModal({
  open,
  fileName,
  loading,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-\[400px\] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Delete Document</h2>

        <p className="mt-4">Are you sure you want to delete</p>

        <p className="font-semibold mt-2">{fileName}</p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded border px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="rounded bg-red-600 px-4 py-2 cursor-pointer text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
