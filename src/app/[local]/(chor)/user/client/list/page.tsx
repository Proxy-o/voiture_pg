"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "~/app/_context/SessionContext";
import { api } from "~/trpc/react";

import ClientTable from "./clientTable";

export default function Page() {
  const { session, user } = useSession();

  if (!session || !user) {
    redirect("/login");
  }

  const { data: company, isSuccess } = api.user.getUserCompany.useQuery(
    parseInt(user.id),
  );

  if (!company && isSuccess) {
    return redirect("/login");
  }

  return (
    <div className="w-full ">
      {company && isSuccess && (
        <ClientTable company_id={company.compagny.id.toString()} />
      )}
    </div>
  );
}
