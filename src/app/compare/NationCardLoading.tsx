import { Card, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function NationsGridLoadingUI({
  nationCodes,
}: {
  nationCodes: string[];
}) {
  return (
    <Card className={`px-2 py-5 md:px-4 md:py-6 lg:px-6`}>
      <table className="w-full">
        <thead>
          <tr>
            {nationCodes.map((i) => (
              <th key={i + "head"} className="w-[50%]">
                <CardTitle className="flex justify-center text-xl font-bold lg:text-2xl">
                  <Skeleton className="h-5 w-[30%] min-w-12 lg:h-8" />
                </CardTitle>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <td colSpan={nationCodes.length}>
              <Skeleton className="mx-auto mt-1 h-5 w-[30%] min-w-12 lg:h-8" />
            </td>
          </tr>

          <tr>
            {nationCodes.map((code) => (
              <td key={code + "desc"} className="w-[50%]">
                <Skeleton className="h-80 w-full md:h-56" />
              </td>
            ))}
          </tr>

          <tr>
            <td colSpan={nationCodes.length} className="pb-3 pt-6">
              <div className="flex justify-center">
                <Skeleton className="h-7 w-[40%] min-w-10" />
              </div>
            </td>
          </tr>

          <tr>
            {nationCodes.map((code) => (
              <td key={code + "govform"} className="w-[50%]">
                <div className="flex flex-col justify-center gap-2">
                  <div className="flex w-full justify-center">
                    <Skeleton className="h-7 w-[40%] min-w-10" />
                  </div>
                  {[1, 2, 3, 4].map((e, i) => (
                    <div key={e + i} className="flex w-full justify-center">
                      <Skeleton className="h-[99px] w-[50%] min-w-10 md:h-[83px]" />
                    </div>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td colSpan={nationCodes.length} className="pb-3 pt-6">
              <div className="flex justify-center">
                <Skeleton className="h-7 w-[50%] min-w-10" />
              </div>
            </td>
          </tr>
          <tr>
            {nationCodes.map((code) => (
              <td key={code + "parties"} className="w-[50%] align-top">
                <div className="flex w-full flex-col gap-2 rounded-lg border-[1px] p-1 md:p-2">
                  {[0, 9, 8].map((e, i) => (
                    <Skeleton key={e + i} className="h-[73px] w-full" />
                  ))}
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td colSpan={nationCodes.length} className="pb-3 pt-6">
              <div className="flex justify-center">
                <Skeleton className="h-7 w-[40%] min-w-10" />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={nationCodes.length} className="">
              <div className="mx-auto aspect-[10/10] w-full sm:aspect-[10/6] md:aspect-[10/5]">
                <Skeleton className="mx-auto aspect-square h-full" />
              </div>
            </td>
          </tr>

          <tr>
            {nationCodes.map((nation) => (
              <td
                key={nation + "demoidx"}
                className="mt-2 w-[50%] px-2 align-top text-sm md:text-base"
              >
                <span className="mb-1 flex flex-col items-center justify-center gap-1 text-sm font-medium md:mb-2 md:flex-row lg:text-base">
                  <Skeleton className="h-5 w-[50%] min-w-10" />
                </span>
                <div className="flex h-[40px] items-center">
                  <Skeleton className="h-full w-full" />
                </div>
              </td>
            ))}
          </tr>

          <tr>
            {nationCodes.map((code) => (
              <td
                key={code + "rolidx"}
                className="w-[50%] px-2 pt-6 align-top text-sm md:text-base"
              >
                <span className="mb-1 flex flex-col items-center justify-center gap-1 text-sm font-medium md:mb-2 md:flex-row lg:text-base">
                  <Skeleton className="h-5 w-[50%] min-w-10" />
                </span>
                <div className="flex h-[40px] items-center">
                  <Skeleton className="h-full w-full" />
                </div>
              </td>
            ))}
          </tr>

          <tr>
            {nationCodes.map((code) => (
              <td
                key={code + "rolidx"}
                className="w-[50%] px-2 pt-6 align-top text-sm md:text-base"
              >
                <span className="mb-1 flex flex-col items-center justify-center gap-1 text-sm font-medium md:mb-2 md:flex-row lg:text-base">
                  <Skeleton className="h-5 w-[50%] min-w-10" />
                </span>
                <div className="flex h-[40px] items-center">
                  <Skeleton className="h-full w-full" />
                </div>
              </td>
            ))}
          </tr>

          <tr>
            {nationCodes.map((code) => (
              <td
                key={code + "rolidx"}
                className="w-[50%] px-2 pt-6 align-top text-sm md:text-base"
              >
                <span className="mb-1 flex flex-col items-center justify-center gap-1 text-sm font-medium md:mb-2 md:flex-row lg:text-base">
                  <Skeleton className="h-5 w-[50%] min-w-10" />
                </span>
                <div className="flex h-[40px] items-center">
                  <Skeleton className="h-full w-full" />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
