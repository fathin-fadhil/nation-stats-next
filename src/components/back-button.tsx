"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  function goBack() {
    router.back();
  }
  return (
    <button onClick={goBack} className="w-fit">
      <span className="inline-flex items-center gap-2">
        <MoveLeft className="h-5 w-5" />
        Kembali
      </span>
    </button>
  );
}
