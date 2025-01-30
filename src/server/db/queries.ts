import "server-only";
import { db } from "./db";
import { matches } from "./db/schema";

export async function uploadMatches(matchesToBeUploaded: []) {

  await db.insert(matches).values(matchesToBeUploaded);

}
