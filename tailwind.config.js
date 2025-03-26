// tailwind.config.js
import plugin from 'tailwindcss/plugin'

/* @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            keyframes: {
                heartbeat: {
                    '0%': { transform: 'scale(1)' },
                    '25%': { transform: 'scale(1.1)' },
                    '50%': { transform: 'scale(1)' },
                    '75%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                }
            },
            animation: {
                heartbeat: 'heartbeat 0.5s ease-in-out',
            },
            text_shadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
        }
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme('textShadow') }
            )
        }),
    ]
}