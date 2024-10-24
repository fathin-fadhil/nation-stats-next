import { eq, InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { env } from "~/env";
import { AsyncCatchError } from "~/lib/utils";
import { db } from "~/server/db";
import {
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

  const [err, nationJson] = await AsyncCatchError(request.json());
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
  const nation = await db
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
    .returning({ id: nations.id });

  // adding or setting head of state if already exists
  const similarHeadOfState = await db
    .select()
    .from(headOfStates)
    .where(eq(headOfStates.name, data.head_of_state));

  let headOfStateId: string;
  if (similarHeadOfState.length === 0) {
    headOfStateId = (
      await db
        .insert(headOfStates)
        .values({
          name: data.head_of_state,
          slug: data.head_of_state.toLowerCase().replace(/ /g, "-"),
        })
        .returning({ id: headOfStates.id })
    )[0]?.id!;
  } else {
    headOfStateId = similarHeadOfState[0]!.id;
  }

  await db.insert(headOfStatesToNations).values({
    headOfStateId,
    nationId: nation[0]!.id,
  });

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
