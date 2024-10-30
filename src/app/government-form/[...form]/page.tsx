import { notFound } from "next/navigation";
import { Header } from "~/components/header";
import { getGovernmentFormData } from "~/server/actions/nations";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { BackButton } from "~/components/back-button";

export default async function GovernmentFormPage({
  params,
}: {
  params: { form: string };
}) {
  const governmentFormData = await getGovernmentFormData(params.form);

  if (!governmentFormData) return notFound();

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
              <article className="prose-sm prose max-w-none">
                {governmentFormData.longDescriptionMd ? (
                  <Markdown>{governmentFormData.longDescriptionMd}</Markdown>
                ) : (
                  <>
                    <h1>Bentuk Pemerintah {governmentFormData.name}</h1>
                    <p>{governmentFormData.description}</p>
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
