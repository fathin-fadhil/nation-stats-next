import { desc, relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const nations = createTable("nation", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  code: varchar("code", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  democracyIndex: varchar("democracy_index", { length: 255 }),
  RuleOfLawIndex: varchar("rule_of_law_index", { length: 255 }),
  corruptionIndex: varchar("corruption_index", { length: 255 }),
  humanDevelopmentIndex: varchar("hdi", { length: 255 }),
  headOfStatesId: varchar("head_of_state_id", { length: 255 }),
  headOfGovernmentId: varchar("head_of_government_id", { length: 255 }),
});

export const nationsRelations = relations(nations, ({ many, one }) => ({
  parties: many(politicalParties),
  governmentForms: many(governmentFormsToNations),
  politicalSystems: many(politicalSystemsToNations),
  headOfStates: one(headOfStates, {
    fields: [nations.headOfStatesId],
    references: [headOfStates.id],
  }),
  headOfGovernments: one(headOfGovernments, {
    fields: [nations.headOfGovernmentId],
    references: [headOfGovernments.id],
  }),
}));

// policical parties (one nation to many parties relationship)
export const politicalParties = createTable("political_party", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: text("logo_url"),
  nationId: varchar("nation_id", { length: 255 }).notNull(),
});

export const politicalPartiesRelations = relations(
  politicalParties,
  ({ one }) => ({
    nation: one(nations, {
      fields: [politicalParties.nationId],
      references: [nations.id],
    }),
  }),
);

// government form (many to many relationship)
export const governmentForms = createTable("government_form", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const governmentFormsRelations = relations(
  governmentForms,
  ({ many }) => ({
    govermentFormsToNations: many(governmentFormsToNations),
  }),
);

export const governmentFormsToNations = createTable(
  "government_form_to_nation",
  {
    id: serial("id").notNull().primaryKey(),
    nationId: varchar("nation_id", { length: 255 }).notNull(),
    governmentFormId: varchar("government_form_id", { length: 255 }).notNull(),
  },
);

export const governmentFormsToNationsRelations = relations(
  governmentFormsToNations,
  ({ one }) => ({
    nation: one(nations, {
      fields: [governmentFormsToNations.nationId],
      references: [nations.id],
    }),
    governmentForm: one(governmentForms, {
      fields: [governmentFormsToNations.governmentFormId],
      references: [governmentForms.id],
    }),
  }),
);

// political system (many to many relationship)
export const politicalSystems = createTable("political_system", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const politicalSystemsRelations = relations(
  politicalSystems,
  ({ many }) => ({
    politicalSystemsToNations: many(politicalSystemsToNations),
  }),
);

export const politicalSystemsToNations = createTable(
  "political_system_to_nation",
  {
    id: serial("id").notNull().primaryKey(),
    nationId: varchar("nation_id", { length: 255 }).notNull(),
    politicalSystemId: varchar("political_system_id", {
      length: 255,
    }).notNull(),
  },
);

export const politicalSystemsToNationsRelations = relations(
  politicalSystemsToNations,
  ({ one }) => ({
    nation: one(nations, {
      fields: [politicalSystemsToNations.nationId],
      references: [nations.id],
    }),
    politicalSystem: one(politicalSystems, {
      fields: [politicalSystemsToNations.politicalSystemId],
      references: [politicalSystems.id],
    }),
  }),
);

// head of state (one to many relationship)
export const headOfStates = createTable("head_of_state", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
});

export const headOfStatesRelations = relations(headOfStates, ({ many }) => ({
  headOfStatesToNations: many(nations),
}));

// head of government (one to many relationship)
export const headOfGovernments = createTable("head_of_government", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
});

export const headOfGovernmentsRelations = relations(
  headOfGovernments,
  ({ many }) => ({ headOfGovernmentsToNations: many(nations) }),
);
