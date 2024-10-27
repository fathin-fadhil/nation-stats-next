import { redirect } from "next/navigation";
import { getAllNations, getNationData } from "~/server/actions/nations";
import { Header } from "~/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SearchNations } from "./SearchNations";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.nations) return redirect("/");

  let nationCodes: string[] = [];
  if (typeof searchParams.nations === "string")
    nationCodes.push(searchParams.nations);
  else nationCodes = searchParams.nations;
  console.log("🚀 ~ nationCodes:", nationCodes);

  const nationsData = await Promise.all(
    nationCodes.map(async (code) => await getNationData(code)),
  );

  const allNations = await getAllNations();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="mt-14">
        <h1 className="pt-3 text-center text-3xl font-bold">
          {nationsData.length === 1
            ? nationsData[0]?.nation?.name
            : "Bandingkan Negara"}
        </h1>
        <main className="mx-auto w-full max-w-5xl flex-col px-4">
          <SearchNations allNations={allNations} />
          <Card>
            <CardHeader>
              <CardTitle>{searchParams.nations}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
