import { Header } from "~/components/header";
import { SearchNationsLoadingUI } from "./SearchNations";
import { NationsGridLoadingUI } from "./NationCardLoading";

export default async function ComparePageLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="mt-14">
        <h1 className="pt-3 text-center text-3xl font-bold">
          {1 === 1 ? "Eksplore Negara" : "Bandingkan Negara"}
        </h1>
        <main className="mx-auto flex w-full max-w-5xl flex-col px-4">
          <SearchNationsLoadingUI nationCodes={["placeholder"]} />
          <NationsGridLoadingUI nationCodes={["placeholder"]} />
        </main>
      </div>
    </div>
  );
}
