import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {z } from "zod";


const prisma = new PrismaClient();
// Zod schema for validating incoming signup data
const signupSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = signupSchema.parse(body);

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Failed to signup" },
      { status: 500 }
    );
  }
}
