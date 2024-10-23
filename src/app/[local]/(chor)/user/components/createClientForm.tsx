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
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { createClientSchema } from "~/server/api/types";
import CustomField from "../../admin/components/customFiled";
import { useTranslations } from "next-intl";
import { Checkbox } from "~/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "sonner";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  Building,
  Hash,
  Globe,
  HomeIcon,
  MapPinned,
  Smartphone,
} from "lucide-react";

export default function CreateClientForm({
  company_id,
}: {
  company_id: string;
}) {
  const t = useTranslations("Client");
  const m = useTranslations("Messages");

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      company_id,
      is_company: false,
      surname: "",
      firstname: "",
      company_name: "",
      btw_number: "",
      street: "",
      postal_code: "",
      city: "",
      country: "",
      email: "",
      phone_number: "",
      mobile_number: "",
    },
  });

  const { mutate: submit } = api.client.addClient.useMutation();

  function onSubmit(values: z.infer<typeof createClientSchema>) {
    submit(
      {
        ...values,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success(m("client_created"));
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
          <User className="h-5 w-5" />
          {t("create_client")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Client Type & Basic Info */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="is_company"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-medium">
                        {t("is_company")}
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                  <CustomField
                    label={
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t("surname")}
                      </span>
                    }
                    name="surname"
                    control={form.control}
                    placeholder={t("surname")}
                  />
                  <CustomField
                    label={
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t("first_name")}
                      </span>
                    }
                    name="firstname"
                    control={form.control}
                    placeholder={t("first_name")}
                  />
                  <div className="md:col-span-2">
                    <CustomField
                      label={
                        <span className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {t("company_name")}
                        </span>
                      }
                      name="company_name"
                      control={form.control}
                      placeholder={t("company_name")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Hash className="h-4 w-4" />
                  {t("tax_information")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      {t("btw_number")}
                    </span>
                  }
                  name="btw_number"
                  control={form.control}
                  placeholder={t("btw_number")}
                />
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4" />
                  {t("address")}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <CustomField
                    label={
                      <span className="flex items-center gap-2">
                        <HomeIcon className="h-4 w-4" />
                        {t("street")}
                      </span>
                    }
                    name="street"
                    control={form.control}
                    placeholder={t("street")}
                  />
                </div>
                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <MapPinned className="h-4 w-4" />
                      {t("postal_code")}
                    </span>
                  }
                  name="postal_code"
                  control={form.control}
                  placeholder={t("postal_code")}
                />
                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {t("city")}
                    </span>
                  }
                  name="city"
                  control={form.control}
                  placeholder={t("city")}
                />
                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {t("country")}
                    </span>
                  }
                  name="country"
                  control={form.control}
                  placeholder={t("country")}
                />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Phone className="h-4 w-4" />
                  {t("contact")}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <CustomField
                    label={
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {t("email")}
                      </span>
                    }
                    name="email"
                    control={form.control}
                    placeholder={t("email")}
                  />
                </div>
                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t("phone")}
                    </span>
                  }
                  name="phone_number"
                  control={form.control}
                  placeholder={t("phone")}
                />
                <CustomField
                  label={
                    <span className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      {t("mobile")}
                    </span>
                  }
                  name="mobile_number"
                  control={form.control}
                  placeholder={t("mobile")}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              {t("create_client")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}