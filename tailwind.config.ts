import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        PT: ["PT Serif", "serif"],
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
            "code::before": { content: "none !important" },
            "code::after": { content: "none !important" },
            color: "hsl(var(--foreground))",
            h1: {
              fontWeight: "700",
              marginBottom: "0.5rem",
              fontFamily: "PT Serif",
            },
            h2: {
              fontWeight: "600",
              marginBottom: "0.5rem",
              fontFamily: "PT Serif",
            },
            h3: {
              fontWeight: "500",
              marginBottom: "0.5rem",
              fontFamily: "PT Serif",
            },
            p: {
              marginBottom: "1.5rem",
              marginTop: "0",
              fontSize: "1.2rem",
              fontWeight: "300",
            },
            code: {
              background: "#F2F2F2",
              fontSize: "15px",
              padding: "3px 6px !important",
              fontWeight: "400",
              borderRadius: "5px",
            },
            "ul li::marker": {
              color: "#0071E3",
            },
            "ol li::marker": {
              color: "#0071E3",
            },
            blockquote: {
              borderLeftColor: "#0071E3",
              borderLeftWidth: "4px",
              paddingLeft: "1rem",
              fontStyle: "italic",
              fontSize: "2rem",
            },
            hr: {
              borderColor: "hsl(var(--border))",
            },
            img: {
              borderRadius: "0.5rem",
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
              fontSize: "17px",
              fontFamily: "PT Serif",
            },
            pre: {
              backgroundColor: "rgb(14,17,22)",
            },
            a: {
              color: "#0071E3",
              textDecoration: "none",

              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        },
        dark: {
          css: {
            color: "hsl(var(--foreground))",
            h1: {
              color: "hsl(var(--foreground))",
              marginBottom: "0.5rem",
              fontFamily: "PT Serif",
            },
            code: {
              background: "#3A3A3C",
              color: "white",
              fontSize: "15px",
              padding: "2px 4px",
              fontWeight: "400",
              borderRadius: "5px",
            },
            h2: {
              color: "hsl(var(--foreground))",
              marginBottom: "0.5rem",
              fontFamily: "PT Serif",
            },
            h3: {
              color: "hsl(var(--foreground))",
              marginBottom: "0.5rem",
              fontFamily: "PT Serif",
            },
            p: {
              marginBottom: "1.5rem",
              marginTop: "0",
            },
            a: {
              color: "#0071E3",
              textDecoration: "none",

              "&:hover": {
                textDecoration: "underline",
              },
            },
            pre: {
              backgroundColor: "rgb(20,23,28)",
            },
            blockquote: {
              borderLeftColor: "#0071E3",
              color: "hsl(var(--foreground-dark))",
              fontStyle: "italic",
              fontFamily: "PT Serif",
              fontSize: "2rem",
            },
            "ul li::marker": {
              color: "#0071E3",
            },
            "ol li::marker": {
              color: "#0071E3",
            },
            hr: {
              borderColor: "hsl(var(--border-dark))",
            },
            img: {
              borderRadius: "0.5rem",
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
            "ul li": {
              marginBottom: "0rem",
            },
            "ol li": {
              marginBottom: "0rem",
            },
            strong: {
              fontFamily: "PT Serif",
              fontSize: "17px",
              color: "white",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
