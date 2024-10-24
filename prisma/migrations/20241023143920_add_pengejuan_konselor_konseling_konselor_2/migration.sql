/*
  Warnings:

  - You are about to drop the column `id_konselor` on the `konselings` table. All the data in the column will be lost.
  - Added the required column `id_konselor_1` to the `konselings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `konselings` table without a default value. This is not possible if the table is not empty.
  - Made the column `nim` on table `konselis` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "konselings" DROP CONSTRAINT "konselings_id_konselor_fkey";

-- AlterTable
ALTER TABLE "konselings" DROP COLUMN "id_konselor",
ADD COLUMN     "id_konselor_1" TEXT NOT NULL,
ADD COLUMN     "id_konselor_2" TEXT,
ADD COLUMN     "status" VARCHAR(20) NOT NULL,
ALTER COLUMN "id_konseling" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "konselis" ALTER COLUMN "id_konseli" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
ALTER COLUMN "nim" SET NOT NULL;

-- AlterTable
ALTER TABLE "konselors" ALTER COLUMN "id_konselor" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "laporans" ALTER COLUMN "id_laporan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "pengajuans" ADD COLUMN     "id_konselor" TEXT,
ALTER COLUMN "id_pengajuan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "pimpinan" ALTER COLUMN "id_pimpinan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "tim_konseling" ALTER COLUMN "id_tim" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AddForeignKey
ALTER TABLE "pengajuans" ADD CONSTRAINT "pengajuans_id_konselor_fkey" FOREIGN KEY ("id_konselor") REFERENCES "konselors"("id_konselor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konselings" ADD CONSTRAINT "konselings_id_konselor_1_fkey" FOREIGN KEY ("id_konselor_1") REFERENCES "konselors"("id_konselor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konselings" ADD CONSTRAINT "konselings_id_konselor_2_fkey" FOREIGN KEY ("id_konselor_2") REFERENCES "konselors"("id_konselor") ON DELETE CASCADE ON UPDATE CASCADE;
