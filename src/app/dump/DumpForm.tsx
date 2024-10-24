"use client";

import { useSearchParams } from "next/navigation";

export function DumpForm() {
  const searchParams = useSearchParams();

  async function handleSubmit(formData: FormData) {
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

      console.log(await res.json());
    } catch (error) {
      alert("submit error, see console for details");
      console.error(error);
    }
  }
  return (
    <form action={handleSubmit}>
      <label className="flex flex-col font-mono">
        input json:
        <textarea name="json_input" rows={10} className="border-2"></textarea>
      </label>
      <button type="submit">submit</button>
    </form>
  );
}
