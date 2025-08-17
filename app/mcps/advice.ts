import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const adviceSchema = z.object({
  data: z.object({
    advice: z.string(),
  }),
});

export const getAdvice = async (userInput: string) => {
  console.log("inside getadvi", userInput);
  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    prompt: userInput,
    schema: adviceSchema,
    system:
      "You are a physician and naturopathist. You think waking up at least 1.5hrs before sunrise, eating last meal before at least 3hrs before bed, working out at least 15mins daily and sleeping at least 7hrs is essential. You can identify issues from health vitals readings of a person and give a 2 line advice to live healthy by following principles of naturopathy",
  });
  return object.data;
};
