"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("scrolling to top");
  }, []);

  return null;
}
