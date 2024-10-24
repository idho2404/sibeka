/*
  Warnings:

  - You are about to drop the column `jam` on the `jadwals` table. All the data in the column will be lost.
  - Added the required column `id_hari` to the `jadwals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jadwals" DROP COLUMN "jam",
ADD COLUMN     "id_hari" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "konselings" ALTER COLUMN "id_konseling" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "konselis" ALTER COLUMN "id_konseli" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "konselors" ALTER COLUMN "id_konselor" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "laporans" ALTER COLUMN "id_laporan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "pengajuans" ALTER COLUMN "id_pengajuan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "pimpinan" ALTER COLUMN "id_pimpinan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "tim_konseling" ALTER COLUMN "id_tim" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- CreateTable
CREATE TABLE "jam" (
    "id_jam" SERIAL NOT NULL,
    "waktu" VARCHAR(12) NOT NULL,

    CONSTRAINT "jam_pkey" PRIMARY KEY ("id_jam")
);

-- CreateTable
CREATE TABLE "hari" (
    "id_hari" SERIAL NOT NULL,
    "nama_hari" VARCHAR(10) NOT NULL,

    CONSTRAINT "hari_pkey" PRIMARY KEY ("id_hari")
);

-- CreateTable
CREATE TABLE "jadwal_jam" (
    "id_jadwal" INTEGER NOT NULL,
    "id_jam" INTEGER NOT NULL,

    CONSTRAINT "jadwal_jam_pkey" PRIMARY KEY ("id_jadwal","id_jam")
);

-- CreateIndex
CREATE UNIQUE INDEX "jam_waktu_key" ON "jam"("waktu");

-- CreateIndex
CREATE UNIQUE INDEX "hari_nama_hari_key" ON "hari"("nama_hari");

-- AddForeignKey
ALTER TABLE "jadwals" ADD CONSTRAINT "jadwals_id_hari_fkey" FOREIGN KEY ("id_hari") REFERENCES "hari"("id_hari") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_jam" ADD CONSTRAINT "jadwal_jam_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "jadwals"("id_jadwal") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_jam" ADD CONSTRAINT "jadwal_jam_id_jam_fkey" FOREIGN KEY ("id_jam") REFERENCES "jam"("id_jam") ON DELETE CASCADE ON UPDATE CASCADE;
