"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    const visibilityMap = new Map<string, boolean>();

    const updateActiveSection = () => {
      // Find the first section that is visible
      let currentActive = "";
      for (const id of sectionIds) {
        if (visibilityMap.get(id)) {
          currentActive = id;
          break;
        }
      }
      
      if (currentActive) {
        setActiveSection(currentActive);
        // We could update URL hash here, but it might interfere with smooth scrolling
        // or history if done too frequently. We'll let the click handler manage the hash,
        // or just quietly update state for the UI highlight.
      }
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              visibilityMap.set(id, entry.isIntersecting);
            });
            updateActiveSection();
          },
          {
            rootMargin: "-20% 0px -60% 0px", // Trigger when element is somewhat in the middle of viewport
            threshold: 0,
          }
        );
        observer.observe(element);
        observers.set(id, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
