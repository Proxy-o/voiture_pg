import { redirect } from "next/navigation";
import React from "react";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { EyeIcon, Pen } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";

export default async function Page() {
  const { session, user } = await validateRequest();
  const i = await getTranslations("Invoice");
  if (!session || !user) {
    redirect("/login");
  }
  const company = await api.user.getUserCompany.query(parseInt(user.id));
  if (!company) {
    redirect("/login");
  }
  const invoices = await api.invoice.getAllInvoices.query(
    Number(company.compagny.id),
  );
  return (
    <div className="flex flex-col items-end justify-end space-y-2 p-2">
      <Link
        href="/user/invoice"
        className={buttonVariants({
          variant: "default",
          size: "default",
        }) + " flex items-center"}
      >
        <Pen className=" " />
        <div className="ml-2 w-full text-sm">{i("add_invoice")}</div>
      </Link>
      <Table className="h-full border">
        <TableCaption>{i("list_of_invoices")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">{i("invoice_number")}</TableHead>
            <TableHead>{i("client_name")}</TableHead>
            <TableHead>{i("client_email")}</TableHead>
            <TableHead>{i("paid_status")}</TableHead>
            <TableHead>{i("action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-full">
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id.toString()}</TableCell>
              <TableCell>{invoice.client.surname}</TableCell>
              <TableCell>{invoice.client.email}</TableCell>
              <TableCell>{invoice.paid_status ? "pending" : "done"}</TableCell>
              <TableCell>
                <Link
                  href={`/user/invoice/${invoice.id}`}
                  className="flex items-center  gap-2"
                >
                  View <EyeIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
