"use client";

import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { DashboardNav } from "@/app/components/primitives/dashboard-nav";
import Sidebar from "@/app/components/primitives/sidebar";

export const DashboardLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} pathname={pathname} />
      <div className="flex flex-col flex-1">
        <DashboardNav pathname={pathname} session={session} isOpen={isOpen} />
        <div className="bg-grey-button-text flex flex-col flex-1 p-10 overflow-y-auto text-black">
          {children}
        </div>
      </div>
    </div>
  );
};
