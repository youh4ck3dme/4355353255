import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        'brand-dark-teal': '#1A5255',
        'brand-bright-green': '#33CC66',
        'brand-text': '#000000',
        'brand-bg': '#FFFFFF',
        'brand-light-gray': '#F8F8F8',
        'brand-secondary-grey': '#64748b',
        // for shadcn/ui components
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        'medium': '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'large': '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
       textShadow: {
        '3d': '1px 1px 0px rgba(0,0,0,0.1), 2px 2px 0px rgba(0,0,0,0.09), 3px 3px 0px rgba(0,0,0,0.08), 4px 4px 0px rgba(0,0,0,0.07), 5px 5px 0px rgba(0,0,0,0.06)',
        '3d-green': '1px 1px 0px #1A5255, 2px 2px 0px #1a5255d1, 3px 3px 0px #1a5255b3, 4px 4px 0px #1a52558f',
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.brand-text'),
            '--tw-prose-headings': theme('colors.brand-dark-teal'),
            '--tw-prose-lead': theme('colors.brand-secondary-grey'),
            '--tw-prose-links': theme('colors.brand-dark-teal'),
            '--tw-prose-bold': theme('colors.brand-text'),
            '--tw-prose-counters': theme('colors.brand-secondary-grey'),
            '--tw-prose-bullets': theme('colors.brand-dark-teal'),
            '--tw-prose-hr': theme('colors.brand-light-gray'),
            '--tw-prose-quotes': theme('colors.brand-dark-teal'),
            '--tw-prose-quote-borders': theme('colors.brand-bright-green'),
            '--tw-prose-captions': theme('colors.brand-secondary-grey'),
            '--tw-prose-code': theme('colors.brand-text'),
            '--tw-prose-pre-code': theme('colors.brand-bg'),
            '--tw-prose-pre-bg': theme('colors.brand-text'),
            '--tw-prose-invert-body': theme('colors.brand-bg'),
            '--tw-prose-invert-headings': theme('colors.brand-bright-green'),
            '--tw-prose-invert-lead': theme('colors.brand-light-gray'),
            '--tw-prose-invert-links': theme('colors.brand-bright-green'),
            '--tw-prose-invert-bold': theme('colors.brand-bg'),
          },
        },
      }),
      animation: {
        'fade-in': 'fade-in 0.75s ease-out forwards',
        'toast-in': 'toast-in 0.5s ease-out forwards',
        'toast-out': 'toast-out 0.5s ease-in forwards',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'toast-in': {
          'from': { transform: 'translateY(100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-out': {
            'from': { transform: 'translateY(0)', opacity: '1' },
            'to': { transform: 'translateY(100%)', opacity: '0' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("tailwindcss-animate"),
    plugin(function({ theme, addUtilities }: { theme: any, addUtilities: any }) {
      const newUtilities = {
        '.text-shadow-3d': {
          textShadow: theme('textShadow.3d'),
        },
        '.text-shadow-3d-green': {
          textShadow: theme('textShadow.3d-green'),
        },
      }
      addUtilities(newUtilities)
    })
  ],
};
export default config;
