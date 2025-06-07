import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { requestId, action, comments } = await req.json();
    const request = await prisma.concessionRequest.findUnique({
      where: { id: requestId }
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // Handle approval based on user role
    if (session.user.role === "COLLEGE_STAFF" && request.status === "PENDING") {
      await prisma.concessionRequest.update({
        where: { id: requestId },
        data: {
          status: action === "approve" ? "COLLEGE_APPROVED" : "COLLEGE_REJECTED",
          collegeStaffId: session.user.id,
          collegeApprovalDate: new Date()
        }
      });
    } else if (session.user.role === "RAILWAY_STAFF" && request.status === "COLLEGE_APPROVED") {
      await prisma.concessionRequest.update({
        where: { id: requestId },
        data: {
          status: action === "approve" ? "RAILWAY_APPROVED" : "RAILWAY_REJECTED",
          railwayStaffId: session.user.id,
          railwayApprovalDate: new Date(),
          digitalStamp: action === "approve" ? generateDigitalStamp() : null
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Approval error:", error);
    return NextResponse.json({ error: "Failed to process approval" }, { status: 500 });
  }
}