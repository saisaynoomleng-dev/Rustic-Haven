CREATE TYPE "public"."applicationStatus" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."contactStatus" AS ENUM('new', 'replied', 'closed');--> statement-breakpoint
CREATE TYPE "public"."employmentStatus" AS ENUM('employed', 'unemployed');--> statement-breakpoint
CREATE TYPE "public"."maintaenanceCategory" AS ENUM('appliances', 'cabitnetry', 'common-area', 'construction', 'doors', 'drywall-repair', 'electrical', 'flooring', 'general', 'glass', 'hvac', 'hardware', 'laundry-room', 'lighting', 'paint', 'pest-control', 'plumbing', 'windows');--> statement-breakpoint
CREATE TYPE "public"."maintenancePriorityStatus" AS ENUM('low', 'high', 'medium');--> statement-breakpoint
CREATE TYPE "public"."maintenanceStatus" AS ENUM('open', 'done', 'in-progress');--> statement-breakpoint
CREATE TYPE "public"."rentPaymentStatus" AS ENUM('pending', 'paid', 'failed');--> statement-breakpoint
CREATE TYPE "public"."subscriptionStatus" AS ENUM('active', 'canceled', 'past-due', 'incomplete');--> statement-breakpoint
CREATE TYPE "public"."tenantStatus" AS ENUM('active', 'ended', 'evicted');--> statement-breakpoint
CREATE TYPE "public"."unitType" AS ENUM('residential', 'business');--> statement-breakpoint
CREATE TYPE "public"."userType" AS ENUM('guest', 'admin', 'tenant', 'business');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"preferred_unit_id" uuid NOT NULL,
	"preferred_move_in_date" timestamp,
	"employment_status" "employmentStatus",
	"employer_name" varchar,
	"income" integer,
	"lease_duration" integer,
	"status" "applicationStatus" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"preferred_sqft" integer NOT NULL,
	"subject" text,
	"message" text,
	"status" "contactStatus" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contacts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "maintenance_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"unit_id" uuid NOT NULL,
	"category" "maintaenanceCategory",
	"allow_entry_without_notice" boolean DEFAULT false NOT NULL,
	"body" text NOT NULL,
	"priority_status" "maintenancePriorityStatus" NOT NULL,
	"status" "maintenanceStatus" DEFAULT 'open' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscriptions_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "rent_payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"unit_id" uuid NOT NULL,
	"stripe_payment_intent_id" varchar(255),
	"stripe_checkout_session_id" varchar(255),
	"month" date,
	"amountInCents" integer NOT NULL,
	"status" "rentPaymentStatus" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"service_id" uuid NOT NULL,
	"stripe_subscription_id" varchar(255),
	"stripe_checkout_session_id" varchar(255),
	"price_in_cents" integer NOT NULL,
	"status" "subscriptionStatus" DEFAULT 'incomplete' NOT NULL,
	"current_period_start" timestamp DEFAULT now() NOT NULL,
	"current_period_end" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"price_per_month_in_cents" integer NOT NULL,
	"stripe_price_id" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "services_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"unit_id" uuid NOT NULL,
	"lease_start" timestamp with time zone,
	"lease_end" timestamp with time zone,
	"status" "tenantStatus",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"sanity_id" text NOT NULL,
	"stripe_price_id" varchar(255),
	"pricePerMonthInCent" integer NOT NULL,
	"types" "unitType" DEFAULT 'residential' NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "units_name_unique" UNIQUE("name"),
	CONSTRAINT "units_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"role" "userType" DEFAULT 'guest' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_preferred_unit_id_units_id_fk" FOREIGN KEY ("preferred_unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_request" ADD CONSTRAINT "maintenance_request_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rent_payments" ADD CONSTRAINT "rent_payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rent_payments" ADD CONSTRAINT "rent_payments_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_subscriptions" ADD CONSTRAINT "service_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_subscriptions" ADD CONSTRAINT "service_subscriptions_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "service_subscriptions_user_service_idx" ON "service_subscriptions" USING btree ("user_id","service_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_user_id_idx" ON "tenants" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_unit_id_idx" ON "tenants" USING btree ("unit_id");