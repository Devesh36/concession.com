import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { from, to, period, class: ticketClass, studentId, dateOfBirth, residentialAddress } = body;

    // Create new concession request
    const concessionRequest = await prisma.concessionRequest.create({
      data: {
        userId: session.user.id,
        from,
        to,
        period,
        class: ticketClass,
        studentId,
        dateOfBirth: new Date(dateOfBirth),
        residentialAddress,
        status: "PENDING"
      },
    });

    return NextResponse.json(concessionRequest, { status: 201 });
  } catch (error) {
    console.error("Failed to create concession request:", error);
    return NextResponse.json(
      { error: "Failed to create concession request" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const status = searchParams.get("status");
    const dateRange = searchParams.get("dateRange");
    const ITEMS_PER_PAGE = 10;

    const where = {
      // ...your filters based on status and dateRange
    };

    // Get user's concession requests
    const [requests, total] = await Promise.all([
      prisma.concessionRequest.findMany({
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        where,
        orderBy: {
          createdAt: "desc"
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