"use client"

import * as React from "react"
import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: "default", icon: Sun, label: "Svetlá Téma" },
    { name: "default-dark", icon: Moon, label: "Tmavá Téma" },
    { name: "vibrant-night", icon: Sparkles, label: "Vibrant Night Téma" },
  ]

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.name === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  }

  const currentTheme = themes.find(t => t.name === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-full text-brand-text hover:bg-brand-light-gray dark:text-brand-bg dark:hover:bg-brand-dark-teal/80 transition-colors"
      aria-label={currentTheme.label}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" />
    </button>
  )
}
