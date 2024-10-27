"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NationsDropdown } from "~/components/nations-dropdown";
import { Button } from "~/components/ui/button";

export function SearchNations({
  allNations,
}: {
  allNations: { id: string; code: string; name: string; slug: string }[];
}) {
  const [selectedNationCode, setSelectedNationCode] = useState<string[]>([]);
  const router = useRouter();

  function handleSelectNationOne(code: string) {
    const newArr = [...selectedNationCode];
    newArr[0] = code;
    setSelectedNationCode(newArr);
  }

  function handleSelectNationTwo(code: string) {
    const newArr = [...selectedNationCode];
    newArr[1] = code;
    setSelectedNationCode(newArr);
  }

  useEffect(() => {
    console.log(selectedNationCode);
  }, [selectedNationCode]);

  function handleSearch() {
    let url = `/compare?`;
    if (!(selectedNationCode[0] || selectedNationCode[1])) return;
    if (selectedNationCode[0]) url += `nations=${selectedNationCode[0]}&`;
    if (selectedNationCode[1]) url += `nations=${selectedNationCode[1]}`;
    router.push(url);
  }

  return (
    <div className="flex justify-center gap-2 py-2">
      <NationsDropdown onSet={handleSelectNationOne} allNations={allNations} />
      <NationsDropdown onSet={handleSelectNationTwo} allNations={allNations} />
      <Button onClick={handleSearch}>Cari!</Button>
    </div>
  );
}
