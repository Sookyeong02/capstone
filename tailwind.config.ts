import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '375px', // 모바일
        md: '744px', // 태블릿
        lg: '1440px', // 데스크탑
      },
      colors: {
        black: '#1B1B1B',
        gray: {
          300: '#A4A1AA',
          200: '#DDDDDD',
          100: '#F5F5F5',
        },
        customBlue: {
          200: '#0A1B2D',
          100: '#003092'
        },
        red: {
          1: '#FD5F5F'
        },
        primaryYellow: "#FFC23D",
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'], // CSS 변수 사용
      },
      fontSize: {
        '3xl': ['32px', { lineHeight: '42px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        xl: ['20px', { lineHeight: '32px' }],
        '2lg': ['18px', { lineHeight: '26px' }],
        lg: ['16px', { lineHeight: '26px' }],
        md: ['14px', { lineHeight: '24px' }],
        sm: ['13px', { lineHeight: '22px' }],
        xs: ['12px', { lineHeight: '18px' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },

  plugins: [],
} satisfies Config;
