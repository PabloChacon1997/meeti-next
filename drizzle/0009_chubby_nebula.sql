CREATE TABLE "meeti_attendeess" (
	"meeti_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meeti_attendeess" ADD CONSTRAINT "meeti_attendeess_meeti_id_meetis_id_fk" FOREIGN KEY ("meeti_id") REFERENCES "public"."meetis"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeti_attendeess" ADD CONSTRAINT "meeti_attendeess_user_id_meetis_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."meetis"("id") ON DELETE cascade ON UPDATE no action;