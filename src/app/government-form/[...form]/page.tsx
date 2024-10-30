import { notFound } from "next/navigation";
import { Header } from "~/components/header";
import { getGovernmentFormData } from "~/server/actions/nations";

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
        <h1 className="pt-3 text-center text-3xl font-bold">
          {governmentFormData.name}
        </h1>
        <main className="mx-auto flex w-full max-w-5xl flex-col px-4">
          <pre>{JSON.stringify(governmentFormData, null, 2)}</pre>
        </main>
      </div>
    </div>
  );
}
