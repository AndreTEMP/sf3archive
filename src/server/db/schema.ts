// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sf3archive_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const matchs = createTable(
  "matches",
  {
    id: serial("id").primaryKey(),
    video: varchar("video", { length: 256 }),
    timeStampedHours: integer("time_stamped_hours"),
    timeStampedMinutes: integer("time_stamped_minutes"),
    timeStampedSeconds: integer("time_stamped_seconds"),
    startingSeconds: integer("starting_seconds"),
    hyperlinkSeconds: varchar("hyperlink_seconds", { length: 256 }),
    playerOneName: varchar("player_one_name", { length: 256 }),
    playerOneChar: varchar("player_one_char", { length: 256 }),
    playerOneSA: varchar("player_one_s_a", { length: 256 }),
    playerOneWinLoss: boolean("player_one_win_loss"),
    playerTwoName: varchar("player_two_name", { length: 256 }),
    playerTwoChar: varchar("player_two_char", { length: 256 }),
    playerTwoSA: varchar("player_two_s_a", { length: 256 }),
    playerTwoWinLoss: boolean("player_two_win_loss"),
    playerOnePerfect: integer("player_one_perfect", { length: 256 }),
    playerTwoPerfect: integer("player_two_perfect", { length: 256 }),
    mirror: integer("mirror", { length: 256 }),
    event: varchar("event", { length: 256 }),
    type: varchar("type", { length: 256 }),
    date: integer("date"),
    location: varchar("location", { length: 256 }),
    breakdown: varchar("breakdown", { length: 256 }),
    version: varchar("version", { length: 256 }),
    ytDescription: varchar("yt_description", { length: 256 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);
