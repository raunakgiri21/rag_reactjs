import { useQuery } from "@tanstack/react-query";

import { getDocuments } from "@/api/documents/documents.api";

import { documentKeys } from "@/api/documents/documents.keys";

export function useDocumentsQuery() {
  return useQuery({
    queryKey: documentKeys.list(),

    queryFn: getDocuments,
  });
}
