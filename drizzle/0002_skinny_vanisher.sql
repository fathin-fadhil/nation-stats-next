CREATE TABLE IF NOT EXISTS "head_of_state" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	CONSTRAINT "head_of_state_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "head_of_state_to_nation" (
	"nation_id" varchar(255) NOT NULL,
	"head_of_state_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "political_system" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "political_system_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "political_system_to_nation" (
	"nation_id" varchar(255) NOT NULL,
	"political_system_id" varchar(255) NOT NULL
);
