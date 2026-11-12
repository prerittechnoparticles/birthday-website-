import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const birthdayWishes = pgTable("birthday_wishes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").default("Colleague & Friend"),
  message: text("message").notNull(),
  accentColor: text("accent_color").default("#A855F7").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type BirthdayWishRecord = typeof birthdayWishes.$inferSelect;
export type NewBirthdayWishRecord = typeof birthdayWishes.$inferInsert;
