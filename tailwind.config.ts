
import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				gold: {
					50: '#FBF8F0',
					100: '#F6EFD9',
					200: '#EEE1B3',
					300: '#E6D28D',
					400: '#DEC467',
					500: '#D6B641',
					600: '#AB9234',
					700: '#806D27',
					800: '#55491A',
					900: '#2B240D',
				},
				sandalwood: {
					50: '#FAF6F0',
					100: '#F5EDE1',
					200: '#EBDBC3',
					300: '#E0C9A5',
					400: '#D6B787',
					500: '#CCA569',
					600: '#A38454',
					700: '#7A633F',
					800: '#52422A',
					900: '#292115',
				},
				jade: {
					50: '#F2F9F6',
					100: '#E6F2EC',
					200: '#CCE6DA',
					300: '#B3D9C7',
					400: '#99CCB5',
					500: '#80BFA2',
					600: '#669982',
					700: '#4D7361',
					800: '#334D41',
					900: '#1A2620',
				},
				maroon: {
					50: '#f9e6e6',
					100: '#f3cccc',
					200: '#e79999',
					300: '#db6666',
					400: '#d03333',
					500: '#b71c1c',
					600: '#800000', /* Updated to exact #800000 */
					700: '#600000',
					800: '#400000',
					900: '#200000',
				},
				amber: {
					50: '#fff8e1',
					100: '#ffecb3',
					200: '#ffe082',
					300: '#ffd54f',
					400: '#ffca28',
					500: '#FFC107',
					600: '#ffb300',
					700: '#ffa000',
					800: '#ff8f00',
					900: '#ff6f00',
				},
				ivory: {
					50: '#ffffff',
					100: '#fefefc',
					200: '#fcfcf9',
					300: '#FAF4E1',
					400: '#f7f7f3',
					500: '#f5f5f0',
					600: '#e0e0db',
					700: '#cbcbc6',
					800: '#b6b6b1',
					900: '#a1a19d',
				},
				royal: {
					50: '#e3e8ed',
					100: '#c7d1db',
					200: '#a2b5c7',
					300: '#7d98b2',
					400: '#587c9e',
					500: '#3d5d79',
					600: '#2C3E50',
					700: '#23303d',
					800: '#19222a',
					900: '#0f1318',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				display: ['Cormorant Garamond', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'fade-up': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					from: {
						transform: 'translateX(100%)'
					},
					to: {
						transform: 'translateX(0)'
					}
				},
				'slide-in-left': {
					from: {
						transform: 'translateX(-100%)'
					},
					to: {
						transform: 'translateX(0)'
					}
				},
				'zoom-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'fade-up': 'fade-up 0.7s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'zoom-in': 'zoom-in 0.7s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
