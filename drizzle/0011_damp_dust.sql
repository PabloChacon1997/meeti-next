ALTER TABLE "meeti_attendees" DROP CONSTRAINT "meeti_attendees_user_id_meetis_id_fk";
--> statement-breakpoint
ALTER TABLE "meeti_attendees" ADD CONSTRAINT "meeti_attendees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;