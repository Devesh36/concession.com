import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    // 1. Get and validate session
    const session = await getServerSession(authOptions);
    console.log("Current session:", session); // Debug log

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify user exists and has STUDENT role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    console.log("Found user:", user); // Debug log

    if (!user || user.role !== "STUDENT") {
      console.error(`User role check failed - Role: ${user?.role}`);
      return NextResponse.json({ 
        error: "Only students can create concession requests" 
      }, { status: 403 });
    }

    // 3. Get and validate request body
    const body = await req.json();
    console.log("Request body:", body);

    // 4. Create the concession request
    try {
      const concessionRequest = await prisma.concessionRequest.create({
        data: {
          userId: user.id, // Direct userId assignment
          from: body.from,
          to: body.to,
          period: Number(body.period),
          class: body.class,
          studentId: body.studentId,
          dateOfBirth: new Date(body.dateOfBirth),
          residentialAddress: body.residentialAddress,
          aadharNumber: body.aadharNumber,
          collegeIdNumber: body.collegeIdNumber,
          status: "PENDING"
        }
      });

      return NextResponse.json({
        message: "Concession request created successfully",
        data: concessionRequest
      });

    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ 
        error: "Failed to create request in database",
        details: dbError instanceof Error ? dbError.message : "Unknown database error"
      }, { status: 500 });
    }

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      error: "Failed to process request",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
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
      ...(status && status !== "all"
        ? { status: status as any } // Replace 'any' with 'RequestStatus' if imported
        : {}),
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