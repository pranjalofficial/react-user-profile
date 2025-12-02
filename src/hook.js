import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryCLient = new QueryClient();

export const fetchUserWithLogs = async ({ queryKey, signal }) => {
  const [_, userId] = queryKey;
  console.log(
    `%c[Network] Starting fetch for User ID: ${userId}`,
    "color: cyan; font-weight: bold;"
  );

  if (signal.aborted) {
    console.log(
      `%c[Network] Aborted immediately for User ID: ${userId}`,
      "color: red;"
    );
  }

  signal.addEventListener("abort", () => {
    console.log(
      `%c[AbortController] SIGNAL RECEIVED: Cancel request for User ID: ${userId}`,
      "color: red; font-weight: bold;"
    );
  });

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      {
        signal,
      }
    );

    if (!response.ok) throw new Error("Network Error");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const data = await response.json();
    console.log(
      `%c[Network] Success! Data received for User ID: ${userId}`,
      "color: green;"
    );
    return data;
  } catch (err) {
    if (error.name === "AbortError") {
      console.log(
        `%c[Network] Fetch was officially cancelled for User ID: ${userId}`,
        "color: orange;"
      );
    } else {
      console.error(`[Network] Error: ${error.message}`);
    }

    throw error;
  }
};
