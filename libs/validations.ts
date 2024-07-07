import z from "zod"

export const fullnameValidation = z
  .string()
  .min(2, "Full name may not be less than 2 characters")
  .max(20, "Full name may not be more than 20 characters")
  .regex(/^[A-Za-z\s]+$/, "Full name must contain only letters")

export const usernameValidation = z
  .string()
  .min(3, "Username should be at least 3 characters long")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores")

export const bioValidation = z.string().max(230, "Too long")
