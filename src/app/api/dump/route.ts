import { eq, InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { env } from "~/env";
import { asyncCatchError } from "~/lib/utils";
import { db } from "~/server/db";
import {
  governmentForms,
  governmentFormsToNations,
  headOfStates,
  headOfStatesToNations,
  nations,
} from "~/server/db/schema";

export async function POST(request: Request) {
  const token = (request.headers.get("Authorization") as string).split(" ")[1];

  if (token !== env.ADMIN_SECRET)
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  const [err, nationJson] = await asyncCatchError(request.json());
  if (err)
    return new Response(JSON.stringify({ message: "Error: bad json" }), {
      status: 400,
    });

  const { success, data, error: parseErr } = dumpSchema.safeParse(nationJson);
  if (!success)
    return new Response(JSON.stringify({ message: parseErr.errors }), {
      status: 400,
    });

  console.log("adding new nation");

  // adding new nation
  const [addNatErr, nation] = await asyncCatchError(
    db
      .insert(nations)
      .values({
        code: data.country_code,
        name: data.country_name,
        slug: data.country_name.toLowerCase().replace(/ /g, "-"),
        description: data.description,
        democracyIndex: data.democracy_index,
        RuleOfLawIndex: data.rule_of_law_index,
        corruptionIndex: data.corruption_index,
        humanDevelopmentIndex: data.hdi,
      })
      .returning({ id: nations.id }),
  );

  if (addNatErr)
    return new Response(
      JSON.stringify({ message: "Error: adding nation", error: addNatErr }),
      { status: 500 },
    );

  // adding or setting head of state if already exists
  const [similarHOSErr, similarHOS] = await asyncCatchError(
    db
      .select()
      .from(headOfStates)
      .where(eq(headOfStates.name, data.head_of_state)),
  );

  if (similarHOSErr)
    return new Response(
      JSON.stringify({
        message: "Error: selecting head of state",
        error: similarHOSErr,
      }),
      { status: 500 },
    );

  const [insertHOSErr, headOfStateId] = await asyncCatchError(
    (async () => {
      if (similarHOS.length !== 0) return similarHOS[0]!.id;

      return (
        await db
          .insert(headOfStates)
          .values({
            name: data.head_of_state,
            slug: data.head_of_state.toLowerCase().replace(/ /g, "-"),
          })
          .returning({ id: headOfStates.id })
      )[0]?.id!;
    })(),
  );

  if (insertHOSErr)
    return new Response(
      JSON.stringify({
        message: "Error: adding head of state",
        error: insertHOSErr,
      }),
      { status: 500 },
    );

  await db.insert(headOfStatesToNations).values({
    headOfStateId,
    nationId: nation[0]!.id,
  });

  // adding or setting government form if already exists
  const [addGovFromErr, govFormIdArray] = await asyncCatchError(
    Promise.all(
      data.government_form.map(async (form) => {
        const similarForm = await db
          .select()
          .from(governmentForms)
          .where(eq(governmentForms.name, form));

        if (similarForm.length !== 0) return similarForm[0]!.id;

        return (
          await db
            .insert(governmentForms)
            .values({
              name: form,
              slug: form.toLowerCase().replace(/ /g, "-"),
            })
            .returning({ id: governmentForms.id })
        )[0]!.id;
      }),
    ),
  );

  if (addGovFromErr)
    return new Response(
      JSON.stringify({
        message: "Error: adding government form",
        error: addGovFromErr,
      }),
      { status: 500 },
    );

  const [insertGovFormToNatErr] = await asyncCatchError(
    Promise.all(
      govFormIdArray.map(async (govFormId) => {
        return await db.insert(governmentFormsToNations).values({
          governmentFormId: govFormId,
          nationId: nation[0]!.id,
        });
      }),
    ),
  );

  if (insertGovFormToNatErr)
    return new Response(
      JSON.stringify({
        message: "Error: adding government form to nation",
        error: insertGovFormToNatErr,
      }),
      {
        status: 500,
      },
    );

  console.log("🚀 ~ nation ~ nation:", nation);

  return new Response(JSON.stringify({ message: "Success" }));
}

const dumpSchema = z.object({
  country_name: z.string(),
  country_code: z.string(),
  government_form: z.array(z.string()),
  political_parties: z.array(
    z.object({
      name: z.string(),
      logo_url: z.string(),
    }),
  ),
  head_of_state: z.string(),
  head_of_government: z.string(),
  political_system: z.array(z.string()),
  democracy_index: z.string(),
  rule_of_law_index: z.string(),
  corruption_index: z.string(),
  hdi: z.string(),
  description: z.string(),
});
