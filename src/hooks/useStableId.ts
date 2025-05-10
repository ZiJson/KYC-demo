import { useId } from "react";

export function useStableId(externalId?: string) {
  const generatedId = useId();
  return externalId || generatedId;
}
