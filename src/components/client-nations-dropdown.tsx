"use client";

import { useRouter } from "next/navigation";
import { NationsDropdown } from "./nations-dropdown";

export function ClientNationsDropdown({
  allNations,
}: {
  allNations: { id: string; code: string; name: string; slug: string }[];
}) {
  const router = useRouter();

  function handleSet(code: string) {
    if (code) router.push(`/compare?nations=${code}`);
  }

  return (
    <NationsDropdown onSet={handleSet} size="big" allNations={allNations} />
  );
}
