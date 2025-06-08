import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import DashboardNav from "@/components/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const roleDashboards = {
    STUDENT: "/dashboard/student",
    COLLEGE_STAFF: "/dashboard/college",
    RAILWAY_STAFF: "/dashboard/railway",
  } as const;

  type ValidRole = keyof typeof roleDashboards;
  const isValidRole = (role: string): role is ValidRole => {
    return role in roleDashboards;
  };

  if (!isValidRole(session.user.role)) {
    console.error("Invalid user role:", session.user.role);
    redirect("/login");
  }

  const correctPath = roleDashboards[session.user.role];

  try {
    // Make headers() call async
    const headersList = await headers();
    const currentPath = await headersList.get("next-url") || "";

    // Only redirect if we're not already on the correct path
    if (currentPath && !currentPath.startsWith(correctPath)) {
      redirect(correctPath);
    }
  } catch (error) {
    console.error("Error checking path:", error);
    // Fallback to redirect if headers check fails
    redirect(correctPath);
  }

  const navLinks = {
    STUDENT: [
      { href: "/dashboard/student", label: "Overview" },
      { href: "/dashboard/student/requests", label: "My Requests" },
      { href: "/dashboard/student/new-request", label: "New Request" },
    ],
    COLLEGE_STAFF: [
      { href: "/dashboard/college", label: "Overview" },
      { href: "/dashboard/college/pending", label: "Pending Approvals" },
      { href: "/dashboard/college/approved", label: "Approved Requests" },
    ],
    RAILWAY_STAFF: [
      { href: "/dashboard/railway", label: "Overview" },
      { href: "/dashboard/railway/pending", label: "Pending Approvals" },
      { href: "/dashboard/railway/approved", label: "Approved Passes" },
    ],
  };

  const userNavLinks = isValidRole(session.user.role)
    ? navLinks[session.user.role]
    : [];

  return (
    <div className="min-h-screen bg-amber-50">
      <DashboardNav
        userName={session.user.name}
        userRole={session.user.role}
        navLinks={userNavLinks}
      />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
