import HomePage from "@/Components/Home/HomePage";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <section  className="p-1 my-2  min-h-screen">
      <Head>
        {/* Schema: WebSite + Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "طالب علم",
              "url": "https://talep-elm.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://talep-elm.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "طالب علم",
              "url": "https://talep-elm.vercel.app",
              "logo": "https://talep-elm.vercel.app/images/Title_Logo.webp", // غير المسار لو اللوجو مختلف
              "sameAs": [
              
              ]
            }),
          }}
        />
      </Head>

        <HomePage />
    </section>
    </>
  );
}
