import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Please provide valid email" }),
  password: z
    .string()
    .min(6, {
      error: "Password must be at least 6 characters.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});
