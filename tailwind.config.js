/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'blue-700': '#1d4ed8',
                'lime-400': '#a3e635',
                'red-400': '#f87171',
                'red-500': '#ef4444',
            },
        },
    },
    plugins: [],
}