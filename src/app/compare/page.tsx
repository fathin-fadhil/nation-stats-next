import { redirect } from "next/navigation";
import { getAllNations, getNationData } from "~/server/actions/nations";
import { Header } from "~/components/header";
import { SearchNations } from "./SearchNations";
import { NationsGrid } from "./NationCard";
import { Info } from "lucide-react";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (!searchParams.nations) return redirect("/");

  let nationCodes: string[] = [];
  if (typeof searchParams.nations === "string")
    nationCodes.push(searchParams.nations);
  else nationCodes = searchParams.nations;

  const nationsData = await Promise.all(
    nationCodes.map(async (code) => await getNationData(code)),
  );

  const allNations = await getAllNations();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="mt-14">
        <h1 className="pt-3 text-center text-3xl font-bold">
          {nationsData.length === 1 ? "Eksplore Negara" : "Bandingkan Negara"}
        </h1>
        <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-4">
          <SearchNations allNations={allNations} />
          <p className="inline-flex items-center py-2 pl-1 text-xs">
            Klik simbol
            <Info className="mx-1 inline h-3 w-3 shrink-0" /> untuk melihat
            detail
          </p>
          <NationsGrid nations={nationsData.map((nat) => nat.nation!)} />
        </main>
      </div>
    </div>
  );
}
