"use client";

import * as React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Globe2, Search, BarChart2, GitCompare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";

// This is a mock list of countries. In a real application, you'd fetch this from an API or database.
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "India",
  "South Africa",
].sort();

export function LandingPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredCountries, setFilteredCountries] = React.useState(countries);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="globe-container">
        <img
          src="/assets/images/globe.png"
          alt="Globe"
          className="h-full w-full object-cover opacity-60"
        />
      </div>
      <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center border-b-[1px] bg-white/50 px-4 backdrop-blur-lg lg:px-6">
        <a className="flex items-center justify-center" href="#">
          <Globe2 className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">NationStats</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Features
          </a>
          <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </a>
          <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contact
          </a>
        </nav>
      </header>
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
                <Select
                  onValueChange={(value) => console.log(`Selected: ${value}`)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Search for a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="flex items-center border-b px-3 pb-2">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <Input
                        placeholder="Search..."
                        className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    {filteredCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select a country to view its detailed information
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex w-full justify-center bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
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
              Mulai Bandingkan Negara
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>United States</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>
                      Government Form: Federal Presidential Constitutional
                      Republic
                    </li>
                    <li>Political System: Two-party system</li>
                    <li>Electoral System: Electoral College</li>
                    <li>Number of Political Parties: 2 major parties</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>United Kingdom</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>
                      Government Form: Unitary Parliamentary Constitutional
                      Monarchy
                    </li>
                    <li>Political System: Multi-party system</li>
                    <li>Electoral System: First-past-the-post voting</li>
                    <li>Number of Political Parties: 3+ major parties</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="flex w-full justify-center bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Explore the World's Nations?
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
