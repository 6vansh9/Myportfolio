-- CreateTable
CREATE TABLE "SiteVisit" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "count" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteVisit_pkey" PRIMARY KEY ("id")
);
