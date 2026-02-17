import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Susinsight | Advancing Sustainability in Africa",
  description: "Susinsight homepage design imported from AI Studio."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Sans:opsz,wght@9..40,200..800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />

        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: {
              heading: ['"Bricolage Grotesque"', 'sans-serif'],
              serif: ['"Lora"', 'serif'],
              display: ['"Bricolage Grotesque"', 'sans-serif'],
              body: ['"DM Sans"', 'sans-serif'],
            },
            colors: {
              brand: {
                light: '#F9FFE3',
                primary: '#3A8B72',
                dark: '#2E6F5B',
                soft: '#91C3B3',
                muted: '#78716c',
              }
            },
            animation: {
              marquee: 'marquee 60s linear infinite',
            },
            keyframes: {
              marquee: {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              }
            }
          }
        },
        plugins: [
          function({ addUtilities }) {
            addUtilities({
              '.paused': { 'animation-play-state': 'paused' }
            })
          }
        ]
      }
            `
          }}
        />
      </head>
      <body>
        <div id="google_translate_element" />
        {children}

        <Script id="google-translate-init" strategy="afterInteractive">
          {`function googleTranslateElementInit() {
            if (window.google && window.google.translate) {
              new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false,
                includedLanguages: 'en,fr,pt,sw,ar,zh-CN,es,de,it,ru,ja,hi,yo,ha,zu,am',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          }
          window.googleTranslateElementInit = googleTranslateElementInit;`}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
