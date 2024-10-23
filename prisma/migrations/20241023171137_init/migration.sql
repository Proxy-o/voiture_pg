-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company_logo" TEXT,
    "company_name" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "owner_lastname" TEXT NOT NULL,
    "vat_number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "owner_email" TEXT NOT NULL,
    "owner_phone" TEXT NOT NULL,
    "owner_website" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "bic_number" TEXT NOT NULL,
    "bank_name2" TEXT,
    "bank_account_number2" TEXT,
    "bic_number2" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" DATETIME,
    "password" TEXT NOT NULL,
    "remember_token" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "compagny_id" INTEGER NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_compagny_id_fkey" FOREIGN KEY ("compagny_id") REFERENCES "Settings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chassis_number" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "car_type" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "first_registration" DATETIME NOT NULL,
    "mileage" INTEGER NOT NULL,
    "engine_power" INTEGER NOT NULL,
    "cylinder" INTEGER NOT NULL,
    "fuel" TEXT NOT NULL,
    "co2" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "number_keys" INTEGER NOT NULL,
    "cer_of_conf" BOOLEAN NOT NULL DEFAULT false,
    "inspection_form" BOOLEAN NOT NULL DEFAULT false,
    "car_pass" BOOLEAN NOT NULL DEFAULT false,
    "register_cert" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "compagny_id" INTEGER NOT NULL,
    CONSTRAINT "Car_compagny_id_fkey" FOREIGN KEY ("compagny_id") REFERENCES "Settings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "is_company" BOOLEAN NOT NULL,
    "surname" TEXT,
    "firstname" TEXT,
    "company_name" TEXT,
    "btw_number" TEXT,
    "street" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" TEXT,
    "mobile_number" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "compagny_id" INTEGER NOT NULL,
    CONSTRAINT "Client_compagny_id_fkey" FOREIGN KEY ("compagny_id") REFERENCES "Settings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "due_date" DATETIME NOT NULL,
    "advance" DECIMAL NOT NULL,
    "amount" DECIMAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "paid_status" BOOLEAN NOT NULL,
    "memo" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Invoice_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Settings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_chassis_number_key" ON "Car"("chassis_number");
