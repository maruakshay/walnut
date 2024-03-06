-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "scheduleDate" TEXT NOT NULL,
    "scheduleTime" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "scheduleDate" JSONB[],
    "patientName" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patientName_key" ON "Patient"("patientName");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_patientName_key" ON "Doctor"("patientName");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_patientName_fkey" FOREIGN KEY ("patientName") REFERENCES "Patient"("patientName") ON DELETE RESTRICT ON UPDATE CASCADE;
