import { redirect } from "next/navigation";
import { env } from "~/env";
import { DumpForm } from "./DumpForm";

export default function DumpPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams?.admin !== env.ADMIN_SECRET) redirect("/");

  return (
    <div className="p-4">
      <h1>dump page - admin only</h1>
      <br />
      <DumpForm />
    </div>
  );
}
