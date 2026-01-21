/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'gorbe-black': '#0a0a0a',
                'gorbe-dark': '#1a1a1a',
                'gorbe-gray': '#2a2a2a',
                'gorbe-lime': '#84cc16',
                'gorbe-lime-light': '#a3e635',
                'gorbe-lime-glow': 'rgba(132, 204, 22, 0.3)',
                'gorbe-white': '#f5f5f5',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(132, 204, 22, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(132, 204, 22, 0.6)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
};
