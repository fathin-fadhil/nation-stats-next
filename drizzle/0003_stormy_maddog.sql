CREATE TABLE IF NOT EXISTS "head_of_government" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	CONSTRAINT "head_of_government_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "head_of_government_to_nation" (
	"nation_id" varchar(255) NOT NULL,
	"head_of_government_id" varchar(255) NOT NULL
);
