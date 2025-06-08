import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Get and validate session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get and validate request body
    const body = await req.json();
    console.log("Request body:", body);

    // Validate and format date
    let dateOfBirth;
    try {
      dateOfBirth = new Date(body.dateOfBirth);
      if (isNaN(dateOfBirth.getTime())) {
        throw new Error("Invalid date");
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid date of birth format" },
        { status: 400 }
      );
    }

    // 3. Create the concession request
    try {
      const concessionRequest = await prisma.concessionRequest.create({
        data: {
          userId: session.user.id, // Direct userId assignment
          from: body.from,
          to: body.to,
          period: Number(body.period),
          class: body.class,
          studentId: body.studentId,
          dateOfBirth: dateOfBirth,
          residentialAddress: body.residentialAddress,
          aadharNumber: body.aadharNumber,
          collegeIdNumber: body.collegeIdNumber,
          status: "PENDING"
        }
      });

      return NextResponse.json(concessionRequest);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { 
          error: "Database error", 
          details: dbError instanceof Error ? dbError.message : "Unknown error" 
        }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const status = searchParams.get("status");
    const ITEMS_PER_PAGE = 10;

    const where = {
      userId: session.user.id,
      ...(status && status !== "all" ? { status } : {}),
    };

    const [requests, total] = await Promise.all([
      prisma.concessionRequest.findMany({
        where,
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.concessionRequest.count({ where })
    ]);

    return NextResponse.json({
      requests,
      pagination: {
        total,
        pages: Math.ceil(total / ITEMS_PER_PAGE),
        current: page
      }
    });

  } catch (error) {
    console.error("Failed to fetch concession requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch concession requests" },
      { status: 500 }
    );
  }
}