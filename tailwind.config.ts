import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        dirty: "url('/image.png')",
      },
      screens: {
        lg: "1130px",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        PT: ["PT Serif", "serif"],
      },
      fontSize: {
        xs: "0.8rem",
        sm: "0.9rem",
        base: "1rem",
        lg: "1.25rem",
        xl: "1.563rem",
        "2xl": "1.953rem",
        "3xl": "2.441rem",
        "4xl": "3.052rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "hsl(var(--foreground))",
            maxWidth: "85ch",
            fontFamily: 'theme("fontFamily.sans")',
            h1: {
              fontWeight: "700",
              fontFamily: 'theme("fontFamily.serif")',
              lineHeight: 'theme("lineHeight.tight")',
              marginTop: "2.5rem",
              marginBottom: "1.5rem",
            },
            h2: {
              fontWeight: "600",
              fontFamily: 'theme("fontFamily.serif")',
              lineHeight: 'theme("lineHeight.tight")',
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h3: {
              fontWeight: "500",
              fontFamily: 'theme("fontFamily.sans")',
              lineHeight: 'theme("lineHeight.snug")',
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
              color: "hsl(var(--foreground))",
            },
            p: {
              marginBottom: "1.25rem",
              marginTop: "0",
              fontSize: 'theme("fontSize.base")',
              lineHeight: 'theme("lineHeight.relaxed")',
            },
            "ul li::marker": {
              color: "#007aff",
            },
            "ol li::marker": {
              color: "#007aff",
            },
            blockquote: {
              borderLeftColor: "#007aff",
              borderLeftWidth: "4px",
              paddingLeft: "1rem",
              fontStyle: "italic",
              fontSize: "1.25rem",
              margin: "1.5rem 0",
              color: "hsl(var(--muted-foreground))",
            },
            hr: {
              borderColor: "hsl(var(--border))",
              margin: "2rem 0",
            },
            img: {
              borderRadius: "0.5rem",
              margin: "1.5rem 0",
            },
            ul: {
              marginTop: "0",
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
            },
            ol: {
              marginTop: "0",
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
            },
            "ul li p": {
              marginBottom: "0",
              padding: "0",
            },
            "ol li p": {
              marginBottom: "0",
              padding: "0",
            },
            strong: {
              fontWeight: "600",
              color: "hsl(var(--foreground))",
            },
            pre: {
              backgroundColor: "rgb(14,17,22)",
              borderRadius: "0.5rem",
              padding: "1rem",
              overflowX: "auto",
            },
            code: {
              backgroundColor: "rgb(240, 240, 240)",
              color: "#000000",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.3rem",
              fontWeight: "normal",
            },
            "code::before, code::after": { content: "none" },
            a: {
              color: "#007aff",
              textDecoration: "none",
              fontWeight: "normal",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            mark: {
              backgroundColor: "rgba(10, 132, 255, 0.3)",
              color: "hsl(var(--foreground))",
              padding: "0.1rem 0.3rem",
              borderRadius: "0.3rem",
            },
          },
        },
        dark: {
          css: {
            color: "hsl(var(--foreground))",
            strong: {
              color: "hsl(var(--foreground))",
            },
            blockquote: {
              color: "hsl(var(--muted-foreground))",
            },
            a: {
              color: "#0a84ff",
              "&:hover": {
                color: "#007aff",
                textDecoration: "underline",
              },
            },
            pre: {
              backgroundColor: "rgb(20,23,28)",
            },
            h3: {
              color: "hsl(var(--foreground))",
            },
            code: {
              backgroundColor: "rgb(28, 36, 51)",
              color: "#ffffff",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")({
      className: "prose",
    }),
  ],
};

export default config;
