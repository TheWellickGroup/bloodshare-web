"use client";

import DashboardCard from "@/components/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState("SUPERADMIN");

  return <DashboardCard props={role} />;
}
