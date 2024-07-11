import z from "zod"

export const fullnameValidation = z
  .string()
  .min(3, "Full name may not be less than 3 characters")
  .max(50, "Full name may not be more than 50 characters")
  .regex(/^[A-Za-z\s]+$/, "Full name must contain only letters")

export const usernameValidation = z
  .string()
  .min(3, "Username should be at least 3 characters long")
  .max(50, "Username can not be more than 50 characters")
  .regex(/^(?!\d)[a-z0-9.]+$/, "Username can only contain small letters, numbers and dots")

export const imageUrlValidation = z.string().url()

export const bioValidation = z.string().max(250, "Too long")

export const editProfileSchema = z.object({
  imageUrl: imageUrlValidation,
  fullname: fullnameValidation,
  bio: bioValidation,
})

export const createBlogSchema = z.object({
  imageUrl: imageUrlValidation,
  title: z.string(),
  content: z.string(),
})
