import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || process.env.PRISMA_POSTGRES_PRISMA_DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "POST") {
      // Increment visit count
      const visit = await prisma.siteVisit.upsert({
        where: { id: 1 },
        update: { count: { increment: 1 } },
        create: { id: 1, count: 1 },
      });

      return res.status(200).json({ count: visit.count });
    }

    if (req.method === "GET") {
      // Get current count without incrementing
      const visit = await prisma.siteVisit.findUnique({
        where: { id: 1 },
      });

      return res.status(200).json({ count: visit?.count ?? 0 });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Visit counter error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
