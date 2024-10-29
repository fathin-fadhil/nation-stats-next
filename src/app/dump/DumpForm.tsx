"use client";

import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

export function DumpForm() {
  const searchParams = useSearchParams();

  const [data, handleSubmit]: [
    unknown,
    (payload: FormData) => void,
    isPending: boolean,
  ] = useFormState(async (_: unknown, formData: FormData) => {
    const data = formData.get("json_input");
    try {
      const res = await fetch("/api/dump", {
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${searchParams.get("admin")}`,
        },
      });

      return (await res.json()) as unknown;
    } catch (error) {
      return error;
    }
  }, {});

  return (
    <>
      <form action={handleSubmit}>
        <label className="flex flex-col font-mono">
          input json:
          <textarea name="json_input" rows={10} className="border-2"></textarea>
        </label>
        <button type="submit">submit</button>
        <LoadingIndicator />
      </form>
      <div className="">
        <p className="pt-4 font-bold">result:</p>
        <code>{JSON.stringify(data, null, 2)}</code>
      </div>
    </>
  );
}

function LoadingIndicator() {
  const { pending } = useFormStatus();
  return pending ? <p>loading...</p> : <p>waiting...</p>;
}
