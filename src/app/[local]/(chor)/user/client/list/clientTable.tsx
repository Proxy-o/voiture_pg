"use client";
import { Search, UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

export default function ClientTable({ company_id }: { company_id: string }) {
  const c = useTranslations("Client");
  const u = useTranslations("User");
  const { data: clients } = api.client.getCompanyClients.useQuery(
    parseInt(company_id),
  );
  const { mutate, data, isSuccess } = api.client.searchClients.useMutation();
  const [real_clients, setRealClients] = useState(clients);

  const handelSearch = (search: string) => {
    mutate(search);
  };
  if (isSuccess && (real_clients !== data || !real_clients)) {
    setRealClients(data);
    console.log("client", data);
  }
  useEffect(() => {
    setRealClients(clients);
  }, [clients]);

  return (
    <div className="flex flex-col items-end justify-end space-y-1 ">
      <Link
        href="/user/client"
        className="relative flex w-fit items-center justify-center border bg-primary/50 p-4 hover:bg-primary"
      >
        <UserRoundPlus className=" " />
        <div className="ml-2 w-full">{u("add_client")}</div>
      </Link>
      <Card className="w-full space-y-2 border-none  p-1 ">
        <div className="relative">
          <Input
            placeholder={c("search")}
            //   value={search}
            onChange={(e) => handelSearch(e.target.value)}
          />
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 transform" />
        </div>
        <Table className="h-full w-full border">
          <TableCaption>{c("client_list")}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">{"id"}</TableHead>
              <TableHead>{c("first_name")}</TableHead>
              <TableHead>{c("surname")}</TableHead>
              <TableHead>{c("is_company")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-full">
            {real_clients ? (
              real_clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id.toString()}</TableCell>
                  <TableCell>{client.firstname}</TableCell>
                  <TableCell>{client.surname}</TableCell>
                  <TableCell>{client.is_company ? "true" : "false"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  {"..."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
