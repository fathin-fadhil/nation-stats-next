import {
  Building2,
  Crown,
  ExternalLink,
  HandCoins,
  PersonStanding,
  Scale,
  ScrollText,
  UserRound,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { ScrollArea } from "~/components/ui/scroll-area";
import { stringToColor } from "~/lib/utils";
import { Nation } from "~/server/actions/nations";
import dynamic from "next/dynamic";
import { ContextComponent } from "./ContextComponent";

const RadarChart = dynamic(() => import("./RadarChart"), {
  ssr: false,
  loading: () => <div className="h-96 w-full">Loading Chart</div>,
});

export function NationsGrid({ nations }: { nations: Nation[] }) {
  return (
    <Card className={`px-2 py-5 md:px-4 md:py-6 lg:px-6`}>
      <table className="w-full">
        <thead>
          <tr>
            {nations.map((nation) => (
              <th key={nation.id + "head"} className="w-[50%]">
                <CardTitle className="text-xl font-bold lg:text-2xl">
                  <img
                    src={` https://flagcdn.com/h120/${nation.code}.png `}
                    width={40}
                    className="me-2 inline h-fit"
                  ></img>
                  {nation.name}
                </CardTitle>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <td colSpan={nations.length}>
              <h3 className="mb-2 text-center text-lg font-semibold">
                Deskripsi
              </h3>
            </td>
          </tr>
          <tr>
            {nations.map((nation) => (
              <td key={nation.id + "desc"} className="w-[50%]">
                <ScrollArea
                  type="always"
                  className="h-80 w-full rounded-md border p-2 md:h-56 md:p-4"
                >
                  {nation.description?.split("\n").map((desc, i) => (
                    <p
                      key={nation.id + "desc" + i}
                      className="mb-2 text-sm text-gray-600"
                    >
                      {desc}
                    </p>
                  ))}
                </ScrollArea>
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan={nations.length} className="pb-3 pt-6">
              <h3 className="text-center text-lg font-semibold">
                Pemerintahan
              </h3>
            </td>
          </tr>
          <tr>
            {nations.map((nation) => (
              <td key={nation.id + "govform"} className="w-[50%]">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex flex-col items-center justify-center gap-1 text-sm font-medium md:flex-row lg:text-base">
                    <Building2 className="h-5 w-5 text-gray-500" />
                    Bentuk Pemerintahan:
                  </span>
                  <span className="lg:textbase inline-flex flex-wrap justify-center gap-1 text-sm md:gap-2">
                    {nation.governmentForms.map(({ governmentForm }) => (
                      <ContextComponent
                        key={governmentForm.id}
                        TriggerComponent={
                          <Badge
                            style={{
                              backgroundColor: stringToColor(
                                governmentForm.name,
                              ),
                            }}
                            className="inline-flex items-center gap-1 text-xs hover:cursor-pointer hover:underline md:text-sm"
                          >
                            {governmentForm.name}
                            <ExternalLink className="size-4" />
                          </Badge>
                        }
                        TitleComponent={
                          "Bentuk Pemerintah " + governmentForm.name
                        }
                        ContentComponent={
                          governmentForm.description ||
                          "Deskripsi tidak tersedia"
                        }
                      />
                    ))}
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            {nations.map((nation) => (
              <td key={nation.id + "hos"} className="w-[50%] pt-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex flex-col items-center justify-center gap-1 text-sm font-medium md:flex-row lg:text-base">
                    <Crown className="h-5 w-5 text-gray-500" />
                    Kepala Negara:
                  </span>
                  <span className="lg:textbase inline-flex flex-wrap justify-center gap-1 text-sm md:gap-2">
                    <ContextComponent
                      TriggerComponent={
                        <Badge
                          key={nation.headOfStates?.id}
                          style={{
                            backgroundColor: stringToColor(
                              nation.headOfStates?.name || "",
                            ),
                          }}
                          className="inline-flex items-center gap-1 text-xs hover:cursor-pointer hover:underline md:text-sm"
                        >
                          {nation.headOfStates?.name || "Data tidak tersedia"}
                          <ExternalLink className="size-4" />
                        </Badge>
                      }
                      ContentComponent={
                        nation.headOfStates?.description ??
                        "Data tidak tersedia"
                      }
                      TitleComponent={
                        "Kepala Negara: " + nation.headOfStates?.name ||
                        "Data tidak tersedia"
                      }
                    />
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            {nations.map((nation) => (
              <td key={nation.id + "hog"} className="w-[50%] pt-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex flex-col items-center justify-center gap-1 text-sm font-medium md:flex-row lg:text-base">
                    <UserRound className="h-5 w-5 text-gray-500" />
                    Kepala Pemerintahan:
                  </span>
                  <span className="lg:textbase inline-flex flex-wrap justify-center gap-1 text-sm md:gap-2">
                    <ContextComponent
                      TriggerComponent={
                        <Badge
                          key={nation.headOfGovernments?.id}
                          style={{
                            backgroundColor: stringToColor(
                              nation.headOfGovernments?.name || "",
                            ),
                          }}
                          className="inline-flex items-center gap-1 text-xs hover:cursor-pointer hover:underline md:text-sm"
                        >
                          {nation.headOfGovernments?.name ||
                            "Data tidak tersedia"}
                          <ExternalLink className="size-4" />
                        </Badge>
                      }
                      ContentComponent={
                        nation.headOfGovernments?.description ||
                        "Data tidak tersedia"
                      }
                      TitleComponent={
                        "Kepala Pemerintah: " +
                          nation.headOfGovernments?.name ||
                        "Data tidak tersedia"
                      }
                    />
                  </span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan={nations.length} className="pb-3 pt-6">
              <h3 className="text-center text-lg font-semibold">
                Partai Populer
              </h3>
            </td>
          </tr>
          <tr>
            {nations.map((nation) => (
              <td key={nation.id + "parties"} className="w-[50%] align-top">
                <div className="flex w-full flex-col gap-2 rounded-lg border-[1px] p-1 md:p-2">
                  {nation.parties.map((party, i) => (
                    <div
                      key={party.id}
                      className={`flex items-center gap-1 ${nation.parties.length - 1 !== i && "border-b-[1px]"} px-1 py-2 md:gap-2 md:px-2 md:py-4`}
                    >
                      <img
                        src={party.logoUrl!}
                        height={40}
                        width={40}
                        className=""
                      />
                      <span className="text-sm font-medium lg:text-base">
                        {party.name}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td colSpan={nations.length} className="pb-3 pt-6">
              <h3 className="text-center text-lg font-semibold">
                Indeks Negara
              </h3>
            </td>
          </tr>
          <tr>
            <td colSpan={nations.length} className="">
              <RadarChart nations={nations} />
            </td>
          </tr>
          <tr>
            {nations.map((nation) => (
              <td
                key={nation.id + "demoidx"}
                className="w-[50%] px-2 align-top text-sm md:text-base"
              >
                <span className="mb-1 flex flex-col items-center justify-center gap-1 text-sm font-medium md:mb-2 md:flex-row lg:text-base">
                  <ScrollText className="h-5 w-5 text-gray-500" />
                  <span className="cursor-pointer text-center hover:underline">
                    Indeks Demokrasi
                    <ExternalLink className="ms-1 inline size-3" />
                  </span>
                </span>
                <Progress
                  colorClass="bg-red-600"
                  className="bg-gray-300"
                  value={
                    parseFloat(
                      nation.democracyIndex?.replace(",", ".") || "0",
                    ) * 10
                  }
                />
                <div className="flex justify-between">
                  <span className="text-sm">0</span>
                  <span>{nation.democracyIndex}</span>
                  <span className="text-sm">10</span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            {nations.map((nation) => {
              const rolIdxText = nation.RuleOfLawIndex?.split(" ")[0] || "0";
              const rolIdxVal = parseFloat(rolIdxText.replace(",", "."));
              const rank = nation.RuleOfLawIndex?.split(" ")[1] || null;

              return (
                <td
                  key={nation.id + "rolidx"}
                  className="w-[50%] px-2 pt-6 align-top text-sm md:text-base"
                >
                  <span className="flex flex-col items-center justify-center gap-1 text-sm font-medium md:flex-row lg:text-base">
                    <Scale className="h-5 w-5 text-gray-500" />
                    <span className="cursor-pointer text-center hover:underline">
                      Indeks Supremasi Hukum
                      <ExternalLink className="ms-1 inline size-3" />
                    </span>
                  </span>
                  <p className="text-center">
                    {rank ? `Rank ${rank}` : "Data tidak ditemukan"}
                  </p>
                  <Progress
                    colorClass="bg-purple-600"
                    className="bg-gray-300"
                    value={rolIdxVal * 100}
                    max={100}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">0</span>
                    <span>{rolIdxText}</span>
                    <span className="text-sm">1</span>
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            {nations.map((nation) => {
              const corruptionIdxText =
                nation.corruptionIndex?.split(" ")[0] || "0";
              const corIdxVal = parseFloat(corruptionIdxText.replace(",", "."));
              const rank = nation.corruptionIndex?.split(" ")[1] || null;

              return (
                <td
                  key={nation.id + "rolidx"}
                  className="w-[50%] px-2 pt-6 align-top text-sm md:text-base"
                >
                  <span className="flex flex-col items-center justify-center gap-1 text-sm font-medium md:flex-row lg:text-base">
                    <HandCoins className="h-5 w-5 text-gray-500" />
                    <span className="cursor-pointer text-center hover:underline">
                      Indeks Persepsi Korupsi
                      <ExternalLink className="ms-1 inline size-3" />
                    </span>
                  </span>
                  <p className="text-center">
                    {rank ? `Rank ${rank}` : "Data tidak ditemukan"}
                  </p>
                  <Progress
                    colorClass="bg-green-600"
                    className="bg-gray-300"
                    value={corIdxVal}
                    max={100}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">0</span>
                    <span>{corruptionIdxText}</span>
                    <span className="text-sm">100</span>
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            {nations.map((nation) => {
              const hdiIdxText =
                nation.humanDevelopmentIndex?.split(" ")[0] || "0";
              const hdiIdxVal = parseFloat(hdiIdxText.replace(",", "."));
              const rank = nation.humanDevelopmentIndex?.split(" ")[1] || null;

              return (
                <td
                  key={nation.id + "rolidx"}
                  className="w-[50%] px-2 pt-6 align-top text-sm md:text-base"
                >
                  <span className="flex flex-col items-center justify-center gap-1 text-sm font-medium md:flex-row lg:text-base">
                    <PersonStanding className="h-5 w-5 text-gray-500" />
                    <span className="cursor-pointer text-center hover:underline">
                      Indeks Pembangunan Manusia
                      <ExternalLink className="ms-1 inline size-3" />
                    </span>
                  </span>
                  <p className="text-center">
                    {rank ? `Rank ${rank}` : "Data tidak ditemukan"}
                  </p>
                  <Progress
                    colorClass="bg-blue-600"
                    className="bg-gray-300"
                    value={hdiIdxVal * 100}
                    max={100}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">0</span>
                    <span>{hdiIdxText}</span>
                    <span className="text-sm">1</span>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
