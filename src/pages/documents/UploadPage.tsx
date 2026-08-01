import { useState } from "react";
import { useUploadDocumentMutation } from "@/hooks/mutations/useUploadDocumentMutation";
import FileDropzone from "@/components/common/uploadFile/FileDropzone";
import UploadProgress from "@/components/common/uploadFile/UploadProgress";

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
      <h1 className="text-3xl font-bold">Upload Document</h1>

      <FileDropzone onFileChange={handleFile} />

      {mutation.isPending && <UploadProgress progress={progress} />}
    </div>
  );
}
