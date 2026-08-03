import { useState } from "react";
import { useUploadDocumentMutation } from "@/hooks/mutations/useUploadDocumentMutation";
import FileDropzone from "@/components/uploadFile/FileDropzone";
import UploadProgress from "@/components/uploadFile/UploadProgress";

export default function UploadPage() {
  const mutation = useUploadDocumentMutation();

  const [progress, setProgress] = useState(0);

  function handleFile(file: File) {
    mutation.mutate({
      file,

      onProgress(progress) {
        setProgress(progress);
      },
    });
  }

  return (
    <div className="space-y-6">
      <FileDropzone onFileChange={handleFile} />

      {mutation.isPending && <UploadProgress progress={progress} />}
    </div>
  );
}
