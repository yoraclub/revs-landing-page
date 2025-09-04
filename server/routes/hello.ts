import { RequestHandler } from "express";
import { HelloResponse } from "@shared/api";

export const handleHello: RequestHandler = (req, res) => {
  const response: HelloResponse = {
    message: "Hello from Revs server",
  };
  res.status(200).json(response);
};
