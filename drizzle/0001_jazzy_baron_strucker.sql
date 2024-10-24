CREATE TABLE IF NOT EXISTS "government_form" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "government_form_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "government_form_to_nation" (
	"nation_id" varchar(255) NOT NULL,
	"government_form_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nation" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"democracy_index" varchar(255),
	"rule_of_law_index" varchar(255),
	"corruption_index" varchar(255),
	"hdi" varchar(255),
	CONSTRAINT "nation_code_unique" UNIQUE("code"),
	CONSTRAINT "nation_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "political_party" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo_url" text,
	"nation_id" varchar(255) NOT NULL
);
