import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Phone number formatting helper function
export function formatPhoneNumber(phoneNumber: number | string): string {
  // Convert to string if it's a number
  const phoneString =
    typeof phoneNumber === "number" ? phoneNumber.toString() : phoneNumber;

  // Clean the input - remove any non-digit characters
  const cleaned = phoneString.replace(/\D/g, "");

  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Return original if it doesn't match expected format
  return phoneString;
}
