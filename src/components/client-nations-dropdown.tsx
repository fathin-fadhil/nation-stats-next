"use client";

import { useRouter } from "next/navigation";
import { NationsDropdown } from "./nations-dropdown";
import { useState } from "react";

export function ClientNationsDropdown({
  allNations,
}: {
  allNations: { id: string; code: string; name: string; slug: string }[];
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  function handleSet(code: string) {
    if (!code) return;
    router.push(`/compare?nations=${code}`);
    setDisabled(true);
  }

  return (
    <NationsDropdown
      loading={disabled}
      onSet={handleSet}
      size="big"
      allNations={allNations}
    />
  );
}
