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

export const matches = createTable(
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
    playerOnePerfect: boolean("player_one_perfect"),
    playerTwoName: varchar("player_two_name", { length: 256 }),
    playerTwoChar: varchar("player_two_char", { length: 256 }),
    playerTwoSA: varchar("player_two_s_a", { length: 256 }),
    playerTwoWinLoss: boolean("player_two_win_loss"),
    playerTwoPerfect: boolean("player_two_perfect"),
    mirror: integer("mirror"),
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

export const players = createTable(
  "characters",
  {
    id: serial("id").primaryKey(),
    location: varchar("location", { length: 256 }),
    image: varchar("image", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);

export const events = createTable(
  "events",
  {
    id: serial("id").primaryKey(),
    location: varchar("location", { length: 256 }),
    image: varchar("image", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);

export const venues = createTable(
  "venues",
  {
    id: serial("id").primaryKey(),
    location: varchar("location", { length: 256 }),
    image: varchar("image", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);

export const matchesPlayers = createTable(
  "matchesPlayers",
  {
    id: serial("id").primaryKey(),
    matchesId: integer("matches_id"),
    playersId: integer("players_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);

export const matchesEvents = createTable(
  "matchesEvents",
  {
    id: serial("id").primaryKey(),
    matchesId: integer("matches_id"),
    eventsId: integer("events_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);

export const matchesVenues = createTable(
  "matchesVenues",
  {
    id: serial("id").primaryKey(),
    matchesId: integer("matches_id"),
    venuesId: integer("venues_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);
