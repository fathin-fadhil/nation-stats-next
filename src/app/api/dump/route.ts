import { eq, InferSelectModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { env } from "~/env";
import { asyncCatchError } from "~/lib/utils";
import { db } from "~/server/db";
import {
  governmentForms,
  governmentFormsToNations,
  headOfGovernments,
  headOfStates,
  nations,
  politicalParties,
  politicalSystems,
  politicalSystemsToNations,
} from "~/server/db/schema";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")!.split(" ")[1];

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

  // checking if head of state exists, if not adding new
  const [HOSErr, similarHOS] = await asyncCatchError(
    db
      .select()
      .from(headOfStates)
      .where(eq(headOfStates.name, data.head_of_state)),
  );

  if (HOSErr)
    return new Response(
      JSON.stringify({
        message: "Error: checking head of state",
        error: HOSErr,
      }),
      { status: 500 },
    );

  let HOSId: string;
  if (similarHOS.length === 0) {
    const [addHOSErr, headOfState] = await asyncCatchError(
      db
        .insert(headOfStates)
        .values({
          name: data.head_of_state,
          slug: data.head_of_state.toLowerCase().replace(/ /g, "-"),
        })
        .returning({ id: headOfStates.id }),
    );

    if (addHOSErr)
      return new Response(
        JSON.stringify({
          message: "Error: adding head of state",
          error: addHOSErr,
        }),
        { status: 500 },
      );

    HOSId = headOfState[0]!.id;
  } else {
    HOSId = similarHOS[0]!.id;
  }

  // checking if head of government exists, if not adding new
  const [HOGErr, similarHOG] = await asyncCatchError(
    db
      .select()
      .from(headOfGovernments)
      .where(eq(headOfGovernments.name, data.head_of_government)),
  );

  if (HOGErr)
    return new Response(
      JSON.stringify({
        message: "Error: checking head of government",
        error: HOGErr,
      }),
      { status: 500 },
    );

  let HOGId: string;
  if (similarHOG.length === 0) {
    const [addHOSErr, headOfState] = await asyncCatchError(
      db
        .insert(headOfGovernments)
        .values({
          name: data.head_of_government,
          slug: data.head_of_government.toLowerCase().replace(/ /g, "-"),
        })
        .returning({ id: headOfStates.id }),
    );

    if (addHOSErr)
      return new Response(
        JSON.stringify({
          message: "Error: adding head of government",
          error: addHOSErr,
        }),
        { status: 500 },
      );

    HOGId = headOfState[0]!.id;
  } else {
    HOGId = similarHOG[0]!.id;
  }

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
        headOfStatesId: HOSId,
        headOfGovernmentId: HOGId,
      })
      .returning({ id: nations.id }),
  );

  if (addNatErr)
    return new Response(
      JSON.stringify({ message: "Error: adding nation", error: addNatErr }),
      { status: 500 },
    );

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

  // inserting political parties
  const [insertPoliticalPartiesErr] = await asyncCatchError(
    Promise.all(
      data.political_parties.map(async (party) => {
        return await db.insert(politicalParties).values({
          name: party.name,
          logoUrl: party.logo_url,
          nationId: nation[0]!.id,
        });
      }),
    ),
  );

  if (insertPoliticalPartiesErr)
    return new Response(
      JSON.stringify({
        message: "Error: adding political parties",
        error: insertPoliticalPartiesErr,
      }),
      { status: 500 },
    );

  // setting political system, or adding new if not exists
  const [addPolSysErr, polSysIdArray] = await asyncCatchError(
    Promise.all(
      data.political_system.map(async (polSys) => {
        const similarPolSys = await db
          .select()
          .from(politicalSystems)
          .where(eq(politicalSystems.name, polSys));
        if (similarPolSys.length !== 0) return similarPolSys[0]!.id;
        return (
          await db
            .insert(politicalSystems)
            .values({
              name: polSys,
              slug: polSys.toLowerCase().replace(/ /g, "-"),
            })
            .returning({ id: politicalSystems.id })
        )[0]!.id;
      }),
    ),
  );

  if (addPolSysErr)
    return new Response(
      JSON.stringify({
        message: "Error: adding political system",
        error: addPolSysErr,
      }),
      { status: 500 },
    );

  const [insertPolSysToNatErr] = await asyncCatchError(
    Promise.all(
      polSysIdArray.map(async (polSysId) => {
        return await db.insert(politicalSystemsToNations).values({
          politicalSystemId: polSysId,
          nationId: nation[0]!.id,
        });
      }),
    ),
  );

  if (insertPolSysToNatErr)
    return new Response(
      JSON.stringify({
        message: "Error: adding political system to nation",
        error: insertPolSysToNatErr,
      }),
      { status: 500 },
    );

  console.log("🚀 ~ nation ~ nation:", nation);

  revalidatePath("/");

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
  democracy_index: z.string().nullable(),
  rule_of_law_index: z.string().nullable(),
  corruption_index: z.string().nullable(),
  hdi: z.string().nullable(),
  description: z.string(),
});
