"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to frontend scan slide as the default
    router.push("/frontend/scan");
  }, [router]);

  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <h1>{"Frontend 101"}</h1>
      <p>{"Redirecting to first slide..."}</p>
    </div>
  );
}
