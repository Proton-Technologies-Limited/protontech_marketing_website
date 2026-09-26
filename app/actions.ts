"use server";

import { apply } from "@/lib/content";

export type ApplyField = "name" | "business" | "email" | "type" | "website" | "message";

export type ApplyState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ApplyField, string>>;
  values?: Partial<Record<ApplyField, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles "Apply for a free website" submissions.
 * TODO: forward `application` to your inbox or CRM (e.g. Resend, HubSpot, Airtable).
 */
export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();
  const values = {
    name: get("name"),
    business: get("business"),
    email: get("email"),
    type: get("type"),
    website: get("website"),
    message: get("message"),
  };

  // Honeypot: real people never see or fill this field.
  if (get("company_url")) return { status: "success", message: "Thanks, we'll be in touch." };

  const errors: ApplyState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (values.business.length < 2) errors.business = "Please add your business name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!apply.businessTypes.includes(values.type)) errors.type = "Please choose your type of business.";
  if (values.website && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+\S*$/i.test(values.website)) errors.website = "That doesn't look like a web address.";
  if (values.message.length > 1500) errors.message = "Please keep your message under 1,500 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const application = { ...values, receivedAt: new Date().toISOString() };
  console.info("[apply] New free-website application", application);

  const firstName = values.name.split(" ")[0];
  return {
    status: "success",
    message: `Thanks ${firstName}! Your application for ${values.business} is in. We'll be in touch shortly to arrange your discovery call.`,
  };
}
