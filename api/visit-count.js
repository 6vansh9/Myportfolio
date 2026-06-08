export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const connectionString =
    process.env.DATABASE_URL ||
    process.env.PRISMA_POSTGRES_PRISMA_DATABASE_URL;

  // No database configured — return 0 gracefully instead of crashing
  if (!connectionString) {
    return res.status(200).json({ count: 0 });
  }

  try {
    const { PrismaClient } = await import("@prisma/client");
    const { PrismaPg } = await import("@prisma/adapter-pg");

    const adapter = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter });

    if (req.method === "POST") {
      const visit = await prisma.siteVisit.upsert({
        where: { id: 1 },
        update: { count: { increment: 1 } },
        create: { id: 1, count: 1 },
      });
      await prisma.$disconnect();
      return res.status(200).json({ count: visit.count });
    }

    if (req.method === "GET") {
      const visit = await prisma.siteVisit.findUnique({ where: { id: 1 } });
      await prisma.$disconnect();
      return res.status(200).json({ count: visit?.count ?? 0 });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Visit counter error:", error);
    // Return 0 instead of 500 so the frontend never crashes
    return res.status(200).json({ count: 0 });
  }
}
