-- AlterTable
ALTER TABLE "konselings" ALTER COLUMN "id_konseling" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "konselis" ALTER COLUMN "id_konseli" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "konselors" ALTER COLUMN "id_konselor" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "laporans" ALTER COLUMN "id_laporan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "pengajuans" ALTER COLUMN "id_pengajuan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
ALTER COLUMN "jam_2" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pimpinan" ALTER COLUMN "id_pimpinan" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "tim_konseling" ALTER COLUMN "id_tim" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10);
