import { notFound } from "next/navigation";
import { Header } from "~/components/header";
import {
  getGovernmentFormData,
  getHeadOfStateData,
} from "~/server/actions/nations";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { BackButton } from "~/components/back-button";

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
              </article>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
