import z from "zod";

const passwordRegex = /[^a-zA-Z0-9]/;

export const passwordValidation = z
  .string()
  .min(8, "Password should be at least 8 characters")
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must have at least one capital letter",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Password must have at least one number",
  })
  .refine((value) => passwordRegex.test(value), {
    message: "Password must contain at least one special character",
  });

export const fullnameValidation = z
  .string()
  .min(3, "Full name may not be less than 3 characters")
  .max(50, "Full name may not be more than 50 characters")
  .regex(/^[A-Za-z\s]+$/, "Full name must contain only letters");

export const usernameValidation = z
  .string()
  .min(3, "Username should be at least 3 characters long")
  .max(50, "Username can not be more than 50 characters")
  .regex(
    /^(?!\d)[a-z0-9.]+$/,
    "Username can only contain small letters, numbers and dots",
  );

export const imageUrlValidation = z.string();

export const bioValidation = z.string().max(250, "Too long");

export const editProfileSchema = z.object({
  imageUrl: imageUrlValidation,
  fullname: fullnameValidation,
  bio: bioValidation,
});

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is can not be empty"),
  content: z.string().refine(
    (content) => {
      const text = content.replace(/<[^>]*>?/gm, "");
      const wordCount = text.trim().split(/\s+/).length;
      return wordCount >= 100;
    },
    { message: "Content must be at least 100 words" },
  ),
  imageUrl: z.string().optional(),
  categories: z.array(z.string()).optional(),
});
