ALTER TABLE "government_form" ADD CONSTRAINT "government_form_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "head_of_government" ADD CONSTRAINT "head_of_government_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "head_of_state" ADD CONSTRAINT "head_of_state_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "political_system" ADD CONSTRAINT "political_system_name_unique" UNIQUE("name");