import { NextRequest, NextResponse } from "next/server";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { birthdayWishes } from "@/db/schema";
import { INITIAL_WISHES } from "@/data/wishes";

const ACCENT_PALETTE = [
  "#A855F7",
  "#EC4899",
  "#22D3EE",
  "#6366F1",
  "#34D399",
  "#FACC15",
];

async function ensureTableAndSeed() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS birthday_wishes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'Colleague & Friend',
      message TEXT NOT NULL,
      accent_color TEXT NOT NULL DEFAULT '#A855F7',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  const existing = await db.select().from(birthdayWishes).limit(1);
  if (existing.length === 0) {
    await db.insert(birthdayWishes).values(
      INITIAL_WISHES.map((w) => ({
        name: w.name,
        role: w.role,
        message: w.message,
        accentColor: w.accentColor,
      }))
    );
  }
}

export async function GET() {
  try {
    await ensureTableAndSeed();
    const rows = await db
      .select()
      .from(birthdayWishes)
      .orderBy(desc(birthdayWishes.id))
      .limit(50);

    return NextResponse.json({
      wishes: rows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role ?? "Colleague & Friend",
        message: r.message,
        accentColor: r.accentColor,
        createdAt: r.createdAt
          ? new Date(r.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : "Just now",
      })),
      persisted: true,
      mode: "postgresql",
    });
  } catch (error) {
    console.error("Failed to fetch wishes from DB, falling back to seed:", error);
    return NextResponse.json({
      wishes: INITIAL_WISHES,
      persisted: false,
      mode: "local-demo",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const role =
      typeof body?.role === "string" && body.role.trim().length > 0
        ? body.role.trim()
        : "Team & Community";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const requestedAccent =
      typeof body?.accentColor === "string" &&
      ACCENT_PALETTE.includes(body.accentColor)
        ? body.accentColor
        : ACCENT_PALETTE[Math.floor(Math.random() * ACCENT_PALETTE.length)];

    if (!name || name.length < 2 || name.length > 60) {
      return NextResponse.json(
        { error: "Please enter a valid name (2–60 characters)." },
        { status: 400 }
      );
    }

    if (!message || message.length < 4 || message.length > 360) {
      return NextResponse.json(
        { error: "Please enter a birthday wish between 4 and 360 characters." },
        { status: 400 }
      );
    }

    try {
      await ensureTableAndSeed();
      const [inserted] = await db
        .insert(birthdayWishes)
        .values({
          name,
          role: role.slice(0, 50),
          message,
          accentColor: requestedAccent,
        })
        .returning();

      return NextResponse.json({
        wish: {
          id: inserted.id,
          name: inserted.name,
          role: inserted.role ?? "Team & Community",
          message: inserted.message,
          accentColor: inserted.accentColor,
          createdAt: "Just now",
        },
        persisted: true,
        mode: "postgresql",
      });
    } catch (dbErr) {
      console.error("Database insert fallback:", dbErr);
      return NextResponse.json({
        wish: {
          id: `local-${Date.now()}`,
          name,
          role: role.slice(0, 50),
          message,
          accentColor: requestedAccent,
          createdAt: "Local Session",
        },
        persisted: false,
        mode: "local-demo",
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
