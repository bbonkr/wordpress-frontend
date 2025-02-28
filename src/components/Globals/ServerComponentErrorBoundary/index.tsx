import React from "react";
import { notFound } from "next/navigation";

export const serverComponentErrorBoundary = async (
  fn: () => Promise<JSX.Element>
) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("404")) return notFound();

      return <div>{error.message}</div>;
    }
    throw error;
  }
};
