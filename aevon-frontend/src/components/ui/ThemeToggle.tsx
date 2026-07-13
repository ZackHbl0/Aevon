"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0"></div>
    );
  }

  const isDark = theme === "dark";

  return (
    <Magnetic intensity={0.1}>
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="w-10 h-10 rounded-full glass border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{
            y: isDark ? 0 : 30,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute"
        >
          <Moon size={18} />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            y: isDark ? -30 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute"
        >
          <Sun size={18} />
        </motion.div>
      </button>
    </Magnetic>
  );
}
