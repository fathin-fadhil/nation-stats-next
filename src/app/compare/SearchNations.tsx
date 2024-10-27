"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { NationsDropdown } from "~/components/nations-dropdown";
import { Button } from "~/components/ui/button";

export function SearchNations({
  allNations,
}: {
  allNations: { id: string; code: string; name: string; slug: string }[];
}) {
  const params = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedNationCode, setSelectedNationCode] = useState<string[]>(
    params.getAll("nations"),
  );

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

  function handleSearch() {
    let url = `/compare?`;
    if (!(selectedNationCode[0] || selectedNationCode[1])) return;
    if (selectedNationCode[0]) url += `nations=${selectedNationCode[0]}&`;
    if (selectedNationCode[1]) url += `nations=${selectedNationCode[1]}`;
    startTransition(() => {
      router.push(url);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-2 align-middle md:flex-row">
      <div className="">
        <NationsDropdown
          customSizeClass="w-64 md:w-72"
          initialValue={selectedNationCode[0] || ""}
          onSet={handleSelectNationOne}
          allNations={allNations}
        />
      </div>
      <div className="">
        <NationsDropdown
          customSizeClass="w-64 md:w-72"
          initialValue={selectedNationCode[1] || ""}
          onSet={handleSelectNationTwo}
          allNations={allNations}
        />
      </div>
      <Button
        className="w-64 md:w-fit"
        disabled={isPending}
        onClick={handleSearch}
      >
        {isPending ? "Loading" : " Cari!"}
      </Button>
    </div>
  );
}
