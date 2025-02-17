/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
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
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			base: "hsl(var(--primary))",
			"on-base": "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			base: "hsl(var(--secondary))",
			"on-base": "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			base: "hsl(var(--destructive))",
			"on-base": "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			base: "hsl(var(--muted))",
			"on-base": "hsl(var(--muted-foreground))",
		  },
		  accent: {
			base: "hsl(var(--accent))",
			"on-base": "hsl(var(--accent-foreground))",
		  },
		  popover: {
			base: "hsl(var(--popover))",
			"on-base": "hsl(var(--popover-foreground))",
		  },
		  card: {
			base: "hsl(var(--card))",
			"on-base": "hsl(var(--card-foreground))",
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
	  },
	},
	plugins: [import("tailwindcss-animate")],
  };