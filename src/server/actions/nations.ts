"use server";

import { asyncCatchError } from "~/lib/utils";
import { db } from "../db";

export type Nation = Exclude<
  Awaited<ReturnType<typeof getNationData>>["nation"],
  null
>;

export async function getNationData(nationCode: string) {
  const [err, nation] = await asyncCatchError(
    db.query.nations.findFirst({
      where(nation, { eq }) {
        return eq(nation.code, nationCode);
      },
      with: {
        governmentForms: {
          columns: {
            governmentFormId: false,
            id: false,
            nationId: false,
          },
          with: {
            governmentForm: true,
          },
        },
        politicalSystems: {
          columns: {
            id: false,
            nationId: false,
            politicalSystemId: false,
          },
          with: {
            politicalSystem: true,
          },
        },
        headOfGovernments: true,
        headOfStates: true,
        parties: true,
      },
    }),
  );

  if (!nation) return { found: false as const, nation: null };

  return { found: true as const, nation: nation };
}

export async function getAllNations() {
  const [err, nations] = await asyncCatchError(
    db.query.nations.findMany({
      columns: {
        id: true,
        code: true,
        name: true,
        slug: true,
      },
    }),
  );

  return nations as { id: string; code: string; name: string; slug: string }[];
}

export async function getGovernmentFormData(slug: string) {
  const [err, governmentForm] = await asyncCatchError(
    db.query.governmentForms.findFirst({
      where(fields, operators) {
        return operators.eq(fields.slug, slug);
      },
      with: {
        govermentFormsToNations: {
          with: {
            nation: true,
          },
        },
      },
    }),
  );

  if (!governmentForm) return null;
  return governmentForm;
}

export async function getHeadOfStateData(slug: string) {
  const [err, headOfState] = await asyncCatchError(
    db.query.headOfStates.findFirst({
      where(fields, operators) {
        return operators.eq(fields.slug, slug);
      },
      with: {
        headOfStatesToNations: true,
      },
    }),
  );

  if (!headOfState) return null;
  return headOfState;
}
