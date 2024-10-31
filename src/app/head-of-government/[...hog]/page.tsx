import { notFound } from "next/navigation";
import { Header } from "~/components/header";
import { getHeadOfGovernmentData } from "~/server/actions/nations";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { BackButton } from "~/components/back-button";

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
              </article>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
