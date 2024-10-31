import { Header } from "~/components/header";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { BackButton } from "~/components/back-button";
import { Skeleton } from "~/components/ui/skeleton";

export default function HeadOfStateLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="mt-14">
        <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-4">
          <Card>
            <CardHeader className="py-2 pt-6">
              <BackButton />
            </CardHeader>
            <CardContent>
              <article className="prose prose-sm max-w-none">
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-10 w-[60%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <br />
                  <Skeleton className="h-10 w-[60%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <br />
                  <Skeleton className="h-10 w-[60%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <br />
                  <Skeleton className="h-10 w-[60%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <br />
                  <Skeleton className="h-10 w-[60%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </article>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
