import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import connectToDatabase from "@/lib/db";  // your mongoose connection helper
import User from "@/lib/models/User";      // your Mongoose User model

// Zod schema for validating incoming signup data
const signupSchema = z.object({
  name: z.string().min(1, "username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: NextRequest) {

    await connectToDatabase();

  try {
    const body = await req.json();
    const { name, email, password } = signupSchema.parse(body);

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

     const raj =  await user.save();
    console.log(raj)
    return NextResponse.json(
      { message: "User registered successfully", user: { id: user._id, name, email } },
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
