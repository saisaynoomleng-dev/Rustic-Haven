import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const createdAt = t
  .timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
  .notNull()
  .defaultNow();

export const updatedAt = t
  .timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const id = t.uuid().primaryKey().defaultRandom();

export const userTypes = t.pgEnum('userType', [
  'guest',
  'admin',
  'tenant',
  'business',
]);

export const unitTypes = t.pgEnum('unitType', ['residential', 'business']);

export const tenantStatus = t.pgEnum('tenantStatus', [
  'active',
  'ended',
  'evicted',
]);

export const subscriptionStatus = t.pgEnum('subscriptionStatus', [
  'active',
  'canceled',
  'past-due',
  'incomplete',
]);

export const contactStatus = t.pgEnum('contactStatus', [
  'new',
  'replied',
  'closed',
]);

export const employmentStatus = t.pgEnum('employmentStatus', [
  'employed',
  'unemployed',
]);

export const maintenanceCategory = t.pgEnum('maintaenanceCategory', [
  'appliances',
  'cabitnetry',
  'common-area',
  'construction',
  'doors',
  'drywall-repair',
  'electrical',
  'flooring',
  'general',
  'glass',
  'hvac',
  'hardware',
  'laundry-room',
  'lighting',
  'paint',
  'pest-control',
  'plumbing',
  'windows',
]);

export const maintenancePriorityStatus = t.pgEnum('maintenancePriorityStatus', [
  'low',
  'high',
  'medium',
]);

export const maintenanceStatus = t.pgEnum('maintenanceStatus', [
  'open',
  'done',
  'in-progress',
]);

export const rentPaymentStatus = t.pgEnum('rentPaymentStatus', [
  'pending',
  'paid',
  'failed',
]);

export const applicationStatus = t.pgEnum('applicationStatus', [
  'pending',
  'approved',
  'rejected',
]);

export const UserTable = t.pgTable('users', {
  id,
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).unique().notNull(),
  clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
  imageUrl: t.varchar('image_url', { length: 255 }),
  role: userTypes('role').notNull().default('guest'),
  createdAt,
  updatedAt,
});

export const UnitTable = t.pgTable('units', {
  id,
  name: t.varchar('name', { length: 255 }).unique().notNull(),
  sanityId: t.text('sanity_id').unique().notNull(),
  stripePriceId: t.varchar('stripe_price_id', { length: 255 }),
  pricePerMonthInCent: t.integer().notNull(),
  type: unitTypes('types').notNull().default('residential'),
  isAvailable: t.boolean('is_available').default(true).notNull(),
  createdAt,
  updatedAt,
});

export const TenantTable = t.pgTable(
  'tenants',
  {
    id,
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id)
      .notNull(),
    unitId: t
      .uuid('unit_id')
      .references(() => UnitTable.id)
      .notNull(),
    leaseStart: t.timestamp('lease_start', {
      withTimezone: true,
      mode: 'date',
    }),
    leaseEnd: t.timestamp('lease_end', { withTimezone: true, mode: 'date' }),
    status: tenantStatus('status'),
    createdAt,
    updatedAt,
  },
  (table) => [
    t.uniqueIndex('tenant_user_id_idx').on(table.userId),
    t.uniqueIndex('tenant_unit_id_idx').on(table.unitId),
  ],
);

export const ServiceTable = t.pgTable('services', {
  id,
  name: t.varchar('name', { length: 255 }).notNull(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  pricePerMonthInCents: t.integer('price_per_month_in_cents').notNull(),
  stripePriceId: t.varchar('stripe_price_id', { length: 255 }),
  isActive: t.boolean('is_active').notNull().default(true),
  createdAt,
  updatedAt,
});

export const ServiceSubscriptionTable = t.pgTable(
  'service_subscriptions',
  {
    id,
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id)
      .notNull(),
    serviceId: t
      .uuid('service_id')
      .references(() => ServiceTable.id)
      .notNull(),
    stripeSubscriptionId: t.varchar('stripe_subscription_id', { length: 255 }),
    stripeCheckoutSessionId: t.varchar('stripe_checkout_session_id', {
      length: 255,
    }),
    priceInCents: t.integer('price_in_cents').notNull(),
    status: subscriptionStatus('status').notNull().default('incomplete'),
    currentPeriodStart: t
      .timestamp('current_period_start')
      .notNull()
      .defaultNow(),
    currentPeriodEnd: t.timestamp('current_period_end'),
    createdAt,
    updatedAt,
  },
  (table) => [
    t
      .uniqueIndex('service_subscriptions_user_service_idx')
      .on(table.userId, table.serviceId),
  ],
);

export const ContactTable = t.pgTable('contacts', {
  id,
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  preferredSqft: t.integer('preferred_sqft').notNull(),
  subject: t.text('subject'),
  message: t.text('message'),
  status: contactStatus('status').notNull().default('new'),
  createdAt,
  updatedAt,
});

export const NewsletterSubscriptionTable = t.pgTable(
  'newsletter_subscriptions',
  {
    id,
    email: t.varchar('email', { length: 255 }).notNull().unique(),
    createdAt,
    updatedAt,
  },
);

export const ApplicationTable = t.pgTable('applications', {
  id,
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id)
    .notNull(),
  preferredUnitId: t
    .uuid('preferred_unit_id')
    .references(() => UnitTable.id)
    .notNull(),
  preferredMoveInDate: t.timestamp('preferred_move_in_date'),
  employmentStatus: employmentStatus('employment_status'),
  employerName: t.varchar('employer_name'),
  income: t.integer('income'),
  leaseDurationInMonths: t.integer('lease_duration'),
  status: applicationStatus('status').notNull().default('pending'),
  createdAt,
  updatedAt,
});

export const MaintenanceRequestTable = t.pgTable('maintenance_request', {
  id,
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id)
    .notNull(),
  unitId: t
    .uuid('unit_id')
    .references(() => UnitTable.id)
    .notNull(),
  category: maintenanceCategory('category'),
  allowEntryWithoutNotice: t
    .boolean('allow_entry_without_notice')
    .notNull()
    .default(false),
  body: t.text('body').notNull(),
  priorityStatus: maintenancePriorityStatus('priority_status').notNull(),
  status: maintenanceStatus('status').notNull().default('open'),
  createdAt,
  updatedAt,
});

export const RentPaymentTable = t.pgTable('rent_payments', {
  id,
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id)
    .notNull(),
  unitId: t
    .uuid('unit_id')
    .references(() => UnitTable.id)
    .notNull(),
  stripePaymentIntentId: t.varchar('stripe_payment_intent_id', {
    length: 255,
  }),
  stripeCheckoutSessionId: t.varchar('stripe_checkout_session_id', {
    length: 255,
  }),
  month: t.date('month'),
  amountInCents: t.integer().notNull(),
  status: rentPaymentStatus('status').notNull().default('pending'),
  createdAt,
  updatedAt,
});

// relations

export const UserTableRelations = relations(UserTable, ({ one, many }) => ({
  tenant: one(TenantTable),
  applications: many(ApplicationTable),
  serviceSubscriptions: many(ServiceSubscriptionTable),
  maintenanceRequests: many(MaintenanceRequestTable),
  rentPayments: many(RentPaymentTable),
}));

export const TenantTableRelations = relations(TenantTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [TenantTable.userId],
    references: [UserTable.id],
  }),
  unit: one(UnitTable, {
    fields: [TenantTable.unitId],
    references: [UnitTable.id],
  }),
}));

export const ApplicationTableRelations = relations(
  ApplicationTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [ApplicationTable.userId],
      references: [UserTable.id],
    }),
    preferredUnit: one(UnitTable, {
      fields: [ApplicationTable.preferredUnitId],
      references: [UnitTable.id],
    }),
  }),
);

export const MaintenanceRequestTableRelations = relations(
  MaintenanceRequestTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [MaintenanceRequestTable.userId],
      references: [UserTable.id],
    }),
  }),
);

export const UnitTableRelations = relations(UnitTable, ({ one, many }) => ({
  tenant: one(TenantTable),
  rentPayments: many(RentPaymentTable),
}));

export const RentPaymentTableRelations = relations(
  RentPaymentTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [RentPaymentTable.userId],
      references: [UserTable.id],
    }),
    unit: one(UnitTable, {
      fields: [RentPaymentTable.unitId],
      references: [UnitTable.id],
    }),
  }),
);
