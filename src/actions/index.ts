import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  newsletter: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string({ message: "This field has to be filled" })
        .email("This is not a valid email address"),
      pageUri: z.string().url().optional(),
      pageName: z.string().optional(),
    }),
    handler: async ({ email, pageUri, pageName }) => {
      const portalId = "441982051";
      const formGuid = "6c11f082-8477-498a-8660-b1c51362cb63";
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

      const payload = {
        fields: [{ name: "email", value: email }],
        context: {
          pageUri,
          pageName,
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form to HubSpot");
      }
    },
  }),
};

