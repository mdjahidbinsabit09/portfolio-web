"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ReturnVisitor() {
  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem("visited_before");

      if (hasVisited) {
        const timer = setTimeout(() => {
          toast.info("Welcome back! 👋 Great to see you again.", {
            position: "bottom-right",
            autoClose: 4000,
          });
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          localStorage.setItem("visited_before", "true");
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable — fail silently
    }
  }, []);

  return null;
}
