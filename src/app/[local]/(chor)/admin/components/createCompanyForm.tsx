"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { createCompanySchema } from "../../../../../server/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CustomField from "./customFiled";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { UploadButton } from "~/components/uploadthing";
import { toast } from "sonner";
import { 
  Building2, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CreditCard,
  Loader2,
  Banknote
} from "lucide-react";
import { Progress } from "~/components/ui/progress";


export default function CreateCompanyForm() {
  const t = useTranslations("Company");
  const m = useTranslations("Messages");
  const router = useRouter();
  const [progress, setProgress] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      company_logo: "https://utfs.io/f/e5483b43-61ea-4dc2-8d98-8e8623a9bab3-xznjn5.png",
      company_name: "",
      owner_name: "",
      owner_lastname: "",
      vat_number: "",
      street: "",
      zip_code: "",
      city: "",
      country: "",
      owner_email: "",
      owner_phone: "",
      owner_website: "",
      bank_name: "",
      bank_account_number: "",
      bic_number: "",
      bank_name2: "",
      bank_account_number2: "",
      bic_number2: "",
    },
    mode: "onChange"
  });

  const { mutate: submit } = api.company.createCompany.useMutation({
    onSuccess: async () => {
      setIsSubmitting(false);
      router.refresh();
      form.reset();
      toast.success(m("company_created"));
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error(error.message);
    },
  });

  React.useEffect(() => {
    const values = form.getValues();
    const totalFields = Object.keys(values).length;
    const filledFields = Object.values(values).filter(value => value !== "").length;
    setProgress((filledFields / totalFields) * 100);
  }, [form.watch()]);

  function onSubmit(values: z.infer<typeof createCompanySchema>) {
    setIsSubmitting(true);
    submit(values);
  }

  const FormCard = ({ 
    title, 
    icon: Icon, 
    children 
  }: { 
    title: string; 
    icon: React.ComponentType<any>; 
    children: React.ReactNode; 
  }) => (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-full space-y-2 pb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500">
              {progress.toFixed(0)}% Completed
            </p>
          </div>

          <FormCard title={t("company_info")} icon={Building2}>
            <Card className="p-4">
              <p className="pb-2 text-center">{t("logo")}</p>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  form.setValue("company_logo", res[0]!.url);
                  toast.success(t("logo_uploaded"));
                }}
                onUploadError={(error: Error) => {
                  toast.error(error.message);
                }}
              />
            </Card>
            <CustomField
              control={form.control}
              name="company_name"
              label={t("company_name")}
              placeholder={t("company_name")}
            />
            <div className="flex w-full gap-2">
              <CustomField
                control={form.control}
                name="owner_name"
                label={t("owner_name")}
                placeholder={t("owner_name")}
              />
              <CustomField
                control={form.control}
                name="owner_lastname"
                label={t("owner_lastname")}
                placeholder={t("owner_lastname")}
              />
            </div>
          </FormCard>

          <FormCard title={t("address_info")} icon={MapPin}>
            <CustomField
              control={form.control}
              name="street"
              label={t("street")}
              placeholder={t("street")}
            />
            <CustomField
              control={form.control}
              name="zip_code"
              label={t("zip_code")}
              placeholder={t("zip_code")}
            />
            <div className="flex w-full gap-2">
              <CustomField
                control={form.control}
                name="city"
                label={t("city")}
                placeholder={t("city")}
              />
              <CustomField
                control={form.control}
                name="country"
                label={t("country")}
                placeholder={t("country")}
              />
            </div>
          </FormCard>

          <FormCard title={t("contact_info")} icon={Phone}>
            <CustomField
              control={form.control}
              name="owner_email"
              label={t("owner_email")}
              placeholder={t("owner_email")}
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <CustomField
              control={form.control}
              name="owner_phone"
              label={t("owner_phone")}
              placeholder={t("owner_phone")}
              leftIcon={<Phone className="h-4 w-4" />}
            />
            <CustomField
              control={form.control}
              name="owner_website"
              label={t("owner_website")}
              placeholder={t("owner_website")}
              leftIcon={<Globe className="h-4 w-4" />}
            />
          </FormCard>

          <FormCard title="Vat" icon={CreditCard}>
            <CustomField
              control={form.control}
              name="vat_number"
              label={t("vat_number")}
              placeholder={t("vat_number")}
            />
          </FormCard>

          <FormCard title={t("bank_info")} icon={Banknote}>
            <CustomField
              control={form.control}
              name="bank_name"
              label={t("bank_name")}
              placeholder={t("bank_name")}
            />
            <CustomField
              control={form.control}
              name="bank_account_number"
              label={t("bank_account_number")}
              placeholder={t("bank_account_number")}
            />
            <CustomField
              control={form.control}
              name="bic_number"
              label={t("bic_number")}
              placeholder={t("bic_number")}
            />
          </FormCard>

          <FormCard title={t("bank_info2")} icon={Banknote}>
            <CustomField
              control={form.control}
              name="bank_name2"
              label={t("bank_name2")}
              placeholder={t("bank_name2")}
            />
            <CustomField
              control={form.control}
              name="bank_account_number2"
              label={t("bank_account_number2")}
              placeholder={t("bank_account_number2")}
            />
            <CustomField
              control={form.control}
              name="bic_number2"
              label={t("bic_number2")}
              placeholder={t("bic_number2")}
            />
          </FormCard>
        </div>

        <Button 
          type="submit" 
          className="my-4 w-full"
          disabled={isSubmitting || progress < 100}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("creating_company")}
            </>
          ) : (
            t("create_company")
          )}
        </Button>
      </form>
    </Form>
  );
}