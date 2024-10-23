-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "email" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "googleId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "userId" TEXT NOT NULL,
    "roleId" SMALLINT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "konselors" (
    "id_konselor" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "userId" TEXT NOT NULL,
    "nip" VARCHAR(25),
    "jenis_kelamin" CHAR(1),
    "no_hp" VARCHAR(15),
    "tanggal_lahir" DATE,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "konselors_pkey" PRIMARY KEY ("id_konselor")
);

-- CreateTable
CREATE TABLE "pimpinan" (
    "id_pimpinan" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "userId" TEXT NOT NULL,
    "nip" VARCHAR(25),
    "tanggal_lahir" DATE,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "pimpinan_pkey" PRIMARY KEY ("id_pimpinan")
);

-- CreateTable
CREATE TABLE "tim_konseling" (
    "id_tim" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "userId" TEXT NOT NULL,
    "nip" VARCHAR(25),
    "tanggal_lahir" DATE,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "tim_konseling_pkey" PRIMARY KEY ("id_tim")
);

-- CreateTable
CREATE TABLE "jadwals" (
    "id_jadwal" SERIAL NOT NULL,
    "id_konselor" TEXT NOT NULL,
    "tanggal" DATE,
    "jam" VARCHAR(12),

    CONSTRAINT "jadwals_pkey" PRIMARY KEY ("id_jadwal")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "konselis" (
    "id_konseli" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "userId" TEXT NOT NULL,
    "nim" VARCHAR(9),
    "jenis_kelamin" CHAR(1),
    "prodi" VARCHAR(8),
    "tingkat" SMALLINT NOT NULL,
    "tanggal_lahir" DATE,
    "no_hp" VARCHAR(15),
    "kelas" VARCHAR(25),

    CONSTRAINT "konselis_pkey" PRIMARY KEY ("id_konseli")
);

-- CreateTable
CREATE TABLE "pengajuans" (
    "id_pengajuan" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "id_konseli" TEXT NOT NULL,
    "tanggal_1" DATE,
    "jam_1" VARCHAR(12) NOT NULL,
    "tanggal_2" DATE,
    "jam_2" VARCHAR(12) NOT NULL,
    "jk_konselor" CHAR(1) NOT NULL,
    "pengaju" VARCHAR(8) NOT NULL,
    "ditemani" BOOLEAN NOT NULL,
    "status" SMALLINT NOT NULL,

    CONSTRAINT "pengajuans_pkey" PRIMARY KEY ("id_pengajuan")
);

-- CreateTable
CREATE TABLE "konselings" (
    "id_konseling" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "id_pengajuan" TEXT NOT NULL,
    "id_konseli" TEXT NOT NULL,
    "id_konselor" TEXT NOT NULL,
    "id_laporan" TEXT,
    "jadwal" TIMESTAMP(3) NOT NULL,
    "ruangan" VARCHAR(50) NOT NULL,
    "rujukan" VARCHAR(255),

    CONSTRAINT "konselings_pkey" PRIMARY KEY ("id_konseling")
);

-- CreateTable
CREATE TABLE "laporans" (
    "id_laporan" VARCHAR(10) NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::text), 1, 10),
    "id_konseling" TEXT NOT NULL,
    "tanggal" DATE,
    "topik" VARCHAR(15) NOT NULL,
    "hasil" TEXT NOT NULL,
    "solusi" TEXT NOT NULL,

    CONSTRAINT "laporans_pkey" PRIMARY KEY ("id_laporan")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "konselors_userId_key" ON "konselors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "konselors_nip_key" ON "konselors"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "pimpinan_userId_key" ON "pimpinan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "pimpinan_nip_key" ON "pimpinan"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "tim_konseling_userId_key" ON "tim_konseling"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tim_konseling_nip_key" ON "tim_konseling"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "konselis_userId_key" ON "konselis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "konselis_nim_key" ON "konselis"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "laporans_id_konseling_key" ON "laporans"("id_konseling");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konselors" ADD CONSTRAINT "konselors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pimpinan" ADD CONSTRAINT "pimpinan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tim_konseling" ADD CONSTRAINT "tim_konseling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwals" ADD CONSTRAINT "jadwals_id_konselor_fkey" FOREIGN KEY ("id_konselor") REFERENCES "konselors"("id_konselor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konselis" ADD CONSTRAINT "konselis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengajuans" ADD CONSTRAINT "pengajuans_id_konseli_fkey" FOREIGN KEY ("id_konseli") REFERENCES "konselis"("id_konseli") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konselings" ADD CONSTRAINT "konselings_id_pengajuan_fkey" FOREIGN KEY ("id_pengajuan") REFERENCES "pengajuans"("id_pengajuan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konselings" ADD CONSTRAINT "konselings_id_konseli_fkey" FOREIGN KEY ("id_konseli") REFERENCES "konselis"("id_konseli") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konselings" ADD CONSTRAINT "konselings_id_konselor_fkey" FOREIGN KEY ("id_konselor") REFERENCES "konselors"("id_konselor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporans" ADD CONSTRAINT "laporans_id_konseling_fkey" FOREIGN KEY ("id_konseling") REFERENCES "konselings"("id_konseling") ON DELETE CASCADE ON UPDATE CASCADE;
