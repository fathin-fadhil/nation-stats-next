import * as React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Search, BarChart2, GitCompare, ExternalLink } from "lucide-react";
import { Header } from "./header";
import { getAllNations } from "~/server/actions/nations";
import { ClientNationsDropdown } from "./client-nations-dropdown";
import { NationSearchLoadingUI } from "./nations-dropdown";
import { db } from "~/server/db";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="globe-container">
        <img
          src="/assets/images/globe.png"
          alt="Globe"
          className="h-full w-full object-cover opacity-60"
        />
      </div>
      <Header />
      <main className="flex-1 pt-10">
        <section className="relative flex w-full justify-center bg-gradient-to-t from-gray-100 to-transparent py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Eksplore dan Bandingkan Negara Dengan Mudah
                </h1>
                <p className="mx-auto max-w-[700px] dark:text-gray-400 md:text-xl">
                  Temukan karakteristik unik negara di seluruh dunia. Bandingkan
                  sistem politik, pemerintahan, dan banyak lagi hanya dengan
                  beberapa klik.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <React.Suspense fallback={<NationSearchLoadingUI size="big" />}>
                  <NationSearch />
                </React.Suspense>
                <p className="text-xs text-muted-foreground">
                  Select a country to view its detailed information
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex w-full justify-center bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2
              id="features"
              className="mb-12 scroll-m-16 text-center text-3xl font-bold tracking-tighter sm:text-5xl"
            >
              Fitur Utama
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Search className="mb-2 h-10 w-10" />
                  <CardTitle>Data yang lengkap</CardTitle>
                </CardHeader>
                <CardContent>
                  Akses informasi detail tentang bentuk pemerintahan, sistem
                  politik, proses pemilihan, dan banyak lagi untuk negara di
                  seluruh dunia.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <GitCompare className="mb-2 h-10 w-10" />
                  <CardTitle>Pembandingan Langsung</CardTitle>
                </CardHeader>
                <CardContent>
                  Dengan mudah bandingkan dua atau lebih negara untuk memahami
                  kesamaan dan perbedaan mereka di berbagai metrik politik dan
                  sosial.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart2 className="mb-2 h-10 w-10" />
                  <CardTitle>Wawasan Visual</CardTitle>
                </CardHeader>
                <CardContent>
                  Eksplor data melalui grafik dan diagram interaktif, membuat
                  informasi yang kompleks mudah dipahami hanya dengan sekilas.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="flex w-full justify-center bg-white py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Mulai Eksplore Negara
            </h2>

            <React.Suspense fallback={<RandomNationCardLoadingUI />}>
              <RandomNationCard />
            </React.Suspense>
          </div>
        </section>
        <section className="flex w-full justify-center bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Explore the World&apos;s Nations?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Start comparing countries and discovering fascinating insights
                  about global political systems today.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">Get Started Now</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-white px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 NationStat. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <a className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </a>
          <a className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

async function NationSearch() {
  const allNations = await getAllNations();
  return <ClientNationsDropdown allNations={allNations} />;
}

async function RandomNationCardLoadingUI() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
      {[1, 2, 3, 4].map(() => (
        <Card className="border-2 transition-colors hover:border-gray-800">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <Skeleton className="h-6 w-[60%]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li className="">
                <span className="inline-flex w-[80%]">
                  Bentuk Pemerintahan:
                  <Skeleton className="my-auto inline-block h-4 min-h-1 grow" />
                </span>
              </li>
              <li className="">
                <span className="inline-flex w-[80%]">
                  Sistem Politik: <Skeleton className="h-4 min-w-1 flex-grow" />
                </span>
              </li>
              <li className="">
                <span className="inline-flex w-[80%]">
                  Kepala Pemerintahan:
                  <Skeleton className="h-4 min-w-1 flex-grow" />
                </span>
              </li>
              <li className="">
                <span className="inline-flex w-[80%]">
                  Partai Politik: <Skeleton className="h-4 min-w-1 flex-grow" />
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function RandomNationCard() {
  const nations = await db.query.nations.findMany({
    limit: 4,
    orderBy: () => sql`RANDOM()`,
    with: {
      parties: {
        columns: {
          id: true,
        },
      },
      headOfGovernments: {
        columns: {
          name: true,
        },
      },
      politicalSystems: {
        with: {
          politicalSystem: {
            columns: {
              name: true,
            },
          },
        },
      },
      governmentForms: {
        with: {
          governmentForm: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
      {nations.map((nation) => (
        <Link href={`/compare?nations=${nation.code}`}>
          <Card className="border-2 transition-colors hover:border-gray-800">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <img
                  src={` https://flagcdn.com/w20/${nation.code}.png `}
                  width={20}
                  className="inline h-fit"
                ></img>
                {nation.name} <ExternalLink className="inline h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  Bentuk Pemerintahan:{" "}
                  {nation.governmentForms.map(({ governmentForm }, i) => (
                    <span>
                      {governmentForm.name}
                      {i < nation.governmentForms.length - 1 ? ", " : ""}
                    </span>
                  ))}{" "}
                </li>
                <li>
                  Sistem Politik:{" "}
                  {nation.politicalSystems.map(({ politicalSystem }, i) => (
                    <span>
                      {politicalSystem.name}
                      {i < nation.politicalSystems.length - 1 ? ", " : ""}
                    </span>
                  ))}{" "}
                </li>
                <li>Kepala Pemerintahan: {nation.headOfGovernments?.name}</li>
                <li>
                  Partai Politik:{" "}
                  {nation.parties?.length
                    ? `${nation.parties?.length} Partai Populer`
                    : "Tidak ada data"}{" "}
                </li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
