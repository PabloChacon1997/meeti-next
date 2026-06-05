ALTER TABLE "meeti_attendeess" RENAME TO "meeti_attendees";--> statement-breakpoint
ALTER TABLE "meeti_attendees" DROP CONSTRAINT "meeti_attendeess_meeti_id_meetis_id_fk";
--> statement-breakpoint
ALTER TABLE "meeti_attendees" DROP CONSTRAINT "meeti_attendeess_user_id_meetis_id_fk";
--> statement-breakpoint
ALTER TABLE "meeti_attendees" ADD CONSTRAINT "meeti_attendees_meeti_id_meetis_id_fk" FOREIGN KEY ("meeti_id") REFERENCES "public"."meetis"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeti_attendees" ADD CONSTRAINT "meeti_attendees_user_id_meetis_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."meetis"("id") ON DELETE cascade ON UPDATE no action;