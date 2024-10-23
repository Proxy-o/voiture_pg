import { Car, Users, FileText, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import Invoices from "src/app/[local]/(chor)/user/invoice/all/page";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { buttonVariants } from "~/components/ui/button";

export default async function Page() {
  const { session, user } = await validateRequest();
  const t = await getTranslations("User");

  if (!session || !user) {
    redirect("/login");
  }

  const company = await api.user.getUserCompany.query(parseInt(user.id));
  
  if (!company) {
    redirect("/login");
  }

  const companyId = parseInt(company.compagny.id.toString());
  const cars = await api.car.getCompanyCars.query(companyId);
  const clients = await api.client.getCompanyClients.query(companyId);

  const DashboardCard = ({ 
    title, 
    count, 
    href, 
    addText, 
    icon: Icon 
  }: { 
    title: string; 
    count: number; 
    href: string; 
    addText: string; 
    icon: React.ComponentType<any>; 
  }) => (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-center text-6xl font-bold">{count}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={href}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary p-2 transition-colors hover:bg-secondary/80"
        >
          {addText}
          <Plus className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardCard
          title={t("car_num")}
          count={cars.length}
          href="/user/car"
          addText={t("add_car")}
          icon={Car}
        />
        <DashboardCard
          title={t("client_num")}
          count={clients.length}
          href="/user/client"
          addText={t("add_client")}
          icon={Users}
        />
      </div>
      
      <div className="">
        <Invoices />
      </div>

      <Link
        href="/user/invoice"
        className={buttonVariants({
          variant: "default",
          size: "default",
        }) + " flex items-center"


        }
      >
        <FileText className="h-5 w-5" />
        {t("add_invoice")}
        <Plus className="h-4 w-4" />
      </Link>
    </div>
  );
}