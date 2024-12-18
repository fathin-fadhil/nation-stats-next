import { notFound } from "next/navigation";
import { Header } from "~/components/header";
import { getHeadOfGovernmentData } from "~/server/actions/nations";
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
  params: { hog: string };
}) {
  const headOfGovernment = await getHeadOfGovernmentData(params.hog);

  if (!headOfGovernment) return notFound();

  return (
    <div id="#" className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="mt-14">
        <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-4">
          <Card>
            <CardHeader className="py-2 pt-6">
              <BackButton />
            </CardHeader>
            <CardContent>
              <article className="prose prose-sm max-w-none">
                {headOfGovernment.longDescriptionMd ? (
                  <Markdown>{headOfGovernment.longDescriptionMd}</Markdown>
                ) : (
                  <>
                    <h1>Kepala Pemerintahan {headOfGovernment.name}</h1>
                    <p>{headOfGovernment.description}</p>
                  </>
                )}

                <hr />

                <h2>
                  Negara-Negara Dengan {headOfGovernment.name} Sebagai Kepala
                  Pemerintahan
                </h2>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2">
                  {headOfGovernment.headOfGovernmentsToNations.map((nation) => (
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
