import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import tailwindcssAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		animation: {
			scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
		},
		keyframes: {
			scroll: {
			  to: {
				transform: "translate(calc(-50% - 0.5rem))",
			  },
			},
		},
		fontFamily: {
			sans: ["Poppins", "sans-serif"], // For body text
			serif: ["Playfair Display", "serif"], // For headings
			futur: ['Futur', 'sans-serif'],
		  },
		backgroundImage: {
			'thrift-gradient': 'linear-gradient(to right top, #ede6da, #cabeb0, #a99887, #8a7362, #6b4f40)',
			'custom-gradient': 'linear-gradient(to right top, #f5f5f5, #f4f2f4, #f4eef0, #f5ebea, #f4e8e3, #e7dad2, #d9ccc1, #cabeb0, #b1a192, #998575, #826959, #6b4f40)',
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			warmBrown: "#6B4F40",
			mutedBeige: "#EDE6DA",
			creamyWhite: "#F5F5F5",
			mutedCopper: "#A67B5B",
        	softBeige: "#D7C4B7",
			warmGrey: "#A8A29E", // Soft grey
    		taupeGrey: "#B3A79F", // Muted beige-grey
    		charcoalGrey: "#5A5A5A", 
			offBlack: "#1C1C1C",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  		}
  	}
  },
  plugins: [addVariablesForColors,tailwindcssAnimate],
}
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

