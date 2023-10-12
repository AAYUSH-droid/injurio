-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InjuryReport" (
    "id" SERIAL NOT NULL,
    "reporter_id" INTEGER NOT NULL,
    "report_date_time" TIMESTAMP(3) NOT NULL,
    "injury_date_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InjuryReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InjuryLocation" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "label" INTEGER NOT NULL,
    "area_description" TEXT NOT NULL,

    CONSTRAINT "InjuryLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InjuryDetail" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "InjuryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "InjuryReport" ADD CONSTRAINT "InjuryReport_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InjuryLocation" ADD CONSTRAINT "InjuryLocation_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "InjuryReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InjuryDetail" ADD CONSTRAINT "InjuryDetail_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "InjuryLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
