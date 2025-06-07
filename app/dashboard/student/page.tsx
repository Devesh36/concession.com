import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardContent from "@/components/DashboardContent";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    const requests = await prisma.concessionRequest.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return <DashboardContent initialRequests={requests} totalRequests={requests.length} />;
  } catch (error) {
    console.error("Error fetching concession requests:", error);
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          Error loading concession requests. Please try again later.
        </div>
      </div>
    );
  }
}