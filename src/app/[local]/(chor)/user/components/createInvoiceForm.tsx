"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import CustomField from "../../admin/components/customFiled";
import { useTranslations } from "next-intl";
import { createInvoiceSchema } from "~/server/api/types";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  PiggyBank,
  Receipt,
  Send,
  ToggleLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function CreateInvoiceForm({
  company_id,
  car_id,
  client_id,
}: {
  company_id: string;
  car_id: string | undefined;
  client_id: string | undefined;
}) {
  const t = useTranslations("Invoice");
  const m = useTranslations("Messages");

  const form = useForm<z.infer<typeof createInvoiceSchema>>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      company_id,
      client_id,
      car_id,
      date: new Date(),
      due_date: new Date(),
      advance: 0,
      amount: 0,
      payment_method: "",
      paid_status: false,
      memo: "",
    },
  });

  const { mutate: submit } = api.invoice.addInvoice.useMutation();

  function onSubmit(values: z.infer<typeof createInvoiceSchema>) {
    submit(
      {
        ...values,
        company_id,
        car_id,
        client_id,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success(m("invoice_created"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          {t("create_invoice")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dates Section */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {t("date")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value.toString()}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t("due_date")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value.toString()}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <CustomField
                      label={
                        <span className="flex items-center gap-2">
                          <PiggyBank className="h-4 w-4" />
                          {t("advance")}
                        </span>
                      }
                      name="advance"
                      control={form.control}
                      placeholder={t("advance")}
                    />
                  </div>
                  <div className="flex-1">
                    <CustomField
                      label={
                        <span className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          {t("amount")}
                        </span>
                      }
                      name="amount"
                      control={form.control}
                      placeholder={t("amount")}
                    />
                  </div>
                </div>

                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {t("payment_method")}
                    </span>
                  }
                  name="payment_method"
                  control={form.control}
                  placeholder={t("payment_method")}
                />

                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <ToggleLeft className="h-4 w-4" />
                      {t("paid_status")}
                    </span>
                  }
                  name="paid_status"
                  control={form.control}
                  placeholder={t("paid_status")}
                />
              </div>
            </div>

            <Separator />

            {/* Memo Section */}
            <div className="space-y-4">
              <CustomField
                label={
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("memo")}
                  </span>
                }
                name="memo"
                control={form.control}
                placeholder={t("memo")}
              />
            </div>

            <Button 
              type="submit" 
              disabled={!client_id || !car_id}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              {t("create_invoice")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}