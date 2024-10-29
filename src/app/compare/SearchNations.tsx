"use client";

import { Loader, Plus, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { NationsDropdown } from "~/components/nations-dropdown";
import { Button } from "~/components/ui/button";

export function SearchNations({
  allNations,
}: {
  allNations: { id: string; code: string; name: string; slug: string }[];
}) {
  console.log("🚀 ~ allNations:", allNations);
  const params = useSearchParams();
  const router = useRouter();
  const [showNextNation, setShowNextNation] = useState(
    params.getAll("nations").length > 1,
  );
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
    if (!(selectedNationCode[0] || selectedNationCode[1])) return;
    if (selectedNationCode[0] === selectedNationCode[1]) return;

    let url = `/compare?nations=${selectedNationCode[0]}&`;
    if (selectedNationCode[1]) {
      url += `nations=${selectedNationCode[1]}`;
    } else setShowNextNation(false);

    startTransition(() => {
      router.push(url);
    });
  }

  function handleCloseSecondNation() {
    const newArr = [...selectedNationCode];
    newArr.pop();
    setSelectedNationCode(newArr);
    setShowNextNation(false);
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
      {showNextNation ? (
        <div className="relative mt-1 md:me-1 md:mt-0">
          <button
            onClick={handleCloseSecondNation}
            className="absolute right-0 top-0 aspect-square h-5 w-5 -translate-y-[50%] translate-x-[50%] rounded-full bg-red-600 p-1"
          >
            <X className="h-full w-full text-white" />
          </button>
          <NationsDropdown
            customSizeClass="w-64 md:w-72"
            initialValue={selectedNationCode[1] || ""}
            onSet={handleSelectNationTwo}
            allNations={allNations}
          />
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-64 md:w-fit"
          onClick={() => setShowNextNation(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
      <Button
        className="w-64 md:w-20"
        disabled={isPending}
        onClick={handleSearch}
      >
        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : " Cari!"}
      </Button>
    </div>
  );
}
