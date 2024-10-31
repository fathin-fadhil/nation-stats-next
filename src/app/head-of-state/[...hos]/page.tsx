import { notFound } from "next/navigation";
import { Header } from "~/components/header";
import { getHeadOfStateData } from "~/server/actions/nations";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { BackButton } from "~/components/back-button";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ScrollToTop } from "~/components/scroll-to-top";

export default async function HeadOfState({
  params,
}: {
  params: { hos: string };
}) {
  const headOfState = await getHeadOfStateData(params.hos);

  if (!headOfState) return notFound();

  return (
    <div id="#" className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <ScrollToTop />
      <div className="mt-14">
        <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-4">
          <Card>
            <CardHeader className="py-2 pt-6">
              <BackButton />
            </CardHeader>
            <CardContent>
              <article className="prose prose-sm max-w-none">
                {headOfState.longDescriptionMd ? (
                  <Markdown>{headOfState.longDescriptionMd}</Markdown>
                ) : (
                  <>
                    <h1>Kepala Negara {headOfState.name}</h1>
                    <p>{headOfState.description}</p>
                  </>
                )}

                <hr />

                <h2>
                  Negara-Negara Dengan {headOfState.name} Sebagai Kepala Negara
                </h2>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2">
                  {headOfState.headOfStatesToNations.map((nation) => (
                    <div key={nation.id} className="p-2">
                      <Link
                        className={buttonVariants({
                          variant: "secondary",
                          className: "w-full",
                        })}
                        href={`/compare?nations=${nation.code}`}
                      >
                        <img
                          src={` https://flagcdn.com/w20/${nation.code}.png `}
                          width={20}
                          className="h-fit"
                        ></img>
                        {nation.name}
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </article>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
