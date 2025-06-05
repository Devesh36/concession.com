import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
// Update the path below if your prisma client is located elsewhere
// Update the path below if your prisma client is located elsewhere
import { prisma } from "@/lib/prisma"; // Adjust the import path as necessary
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  college: z.string().min(2),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, college } = registerSchema.parse(body);

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        college,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          college: user.college,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}