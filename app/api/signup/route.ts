import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hash,compare } from "bcrypt"

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    const isPasswordCorrect = await compare(password, user?.password || "");

    if (isPasswordCorrect) {
      return NextResponse.json(
        { message: "User Already Exists" },
      );
    }

    const hashPassword = await hash(password,10);

    await prisma.user.create({
      data: {
        username,
        password:hashPassword,
      },
    });
    return NextResponse.json({ message: "User Created Successfully" });
  } catch (err) {
    console.log("error from backend");
    console.error(err);

    // Returning an error response with status 500
    return NextResponse.json(
      { message: "An error occurred while creating the user." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
