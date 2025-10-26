import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const portalId = "441982051";

export const forms = {
  newsletter: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string({ message: "Email is required" })
        .email("This is not a valid email address"),
      pageUri: z.string().url().optional(),
      pageName: z.string().optional(),
      hutk: z.string().optional(),
    }),
    handler: async ({ email, pageUri, pageName, hutk }) => {
      const newsletterFormId = "6c11f082-8477-498a-8660-b1c51362cb63";
      const newsletterFormUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${newsletterFormId}`;

      const payload = {
        fields: [{ name: "email", value: email }],
        context: {
          pageUri,
          pageName,
          hutk,
        },
      };

      const response = await fetch(newsletterFormUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to submit newsletter signup form to HubSpot");
      }
    },
  }),
  contact: defineAction({
    accept: "form",
    input: z.object({
      firstname: z.string({ message: "First name is required" }),
      lastname: z.string({ message: "Last name is required" }),
      email: z
        .string({ message: "Email is required" })
        .email("This is not a valid email address"),
      organization: z.string().optional(),
      url: z.string().optional(),
      role: z.string().optional(),
      request: z.string({ message: "Please describe how we can help you" }),
      currstage: z.string().optional(),
      time: z.string({ message: "Please select a preferred meeting time" }),
      timezone: z.string({ message: "Please enter your timezone" }),
      pageUri: z.string().url().optional(),
      pageName: z.string().optional(),
      hutk: z.string().optional(),
    }),
    handler: async ({
      firstname,
      lastname,
      email,
      organization,
      url,
      role,
      request,
      currstage,
      time,
      timezone,
      pageUri,
      pageName,
      hutk,
    }) => {
      const contactFormId = "a88bf23b-7694-4e89-96ef-e9a36ac7fe33";
      const contactFormUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${contactFormId}`;

      const payload = {
        fields: [
          { name: "firstname", value: firstname },
          { name: "lastname", value: lastname },
          { name: "email", value: email },
          { name: "company", value: organization ?? "unassigned" },
          { name: "website", value: url ?? "unassigned" }, // unassigned ensures previous value is cleared
          { name: "jobtitle", value: role ?? "unassigned" },
          { name: "yourrequest", value: request },
          { name: "companystage", value: currstage ?? "unassigned" },
          { name: "meetingtime", value: time },
          { name: "yourtimezone", value: timezone },
        ],
        context: {
          pageUri,
          pageName,
          hutk,
        },
      };

      const response = await fetch(contactFormUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to submit contact form to HubSpot");
      }
    },
  }),
};
