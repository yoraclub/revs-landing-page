import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../db";
import { subscribers } from "../db/schema";
import { SubscribeResponse } from "@shared/api";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const handleSubscribe: RequestHandler = async (req, res) => {
  try {
    const { email } = subscribeSchema.parse(req.body);

    await db.insert(subscribers).values({ email });

    const response: SubscribeResponse = {
      success: true,
      message: "Successfully subscribed!",
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: SubscribeResponse = {
        success: false,
        message: error.issues[0].message,
      };
      return res.status(400).json(response);
    }

    // Handle duplicate email (PostgreSQL unique constraint violation)
    const errorCode = (error as any)?.code || (error as any)?.cause?.code;
    if (errorCode === "23505") {
      const response: SubscribeResponse = {
        success: true,
        message: "You're already on the list!",
      };
      return res.status(200).json(response);
    }

    console.error("Subscribe error:", error);
    const response: SubscribeResponse = {
      success: false,
      message: "Failed to subscribe. Please try again.",
    };
    res.status(500).json(response);
  }
};
