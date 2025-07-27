import BooksContainer from "./bookContainer";


export const generateMetadata = async ({,searchParams}:
  Promise<{searchParams: string[]}>) =>{
  // Extracting search parameters
    const {كتاب,المؤلف, بشرح} = await searchParams
  const title =  `كتاب ${كتاب} للشيخ ${المؤلف} بشرح ${بشرح}` || " المكتبة العلمية لكوكبة من العلماء والمشايخ ";
  return{
  title:title,
  description: " المكتبة العلمية لكوكبة من العلماء والمشايخ  , تحتوي على المنهج العلمي لكل طالب علم يسعى إلى الإرتقاء في  سلم طلب العلم الشرعي وفق منهج علمي على الكتاب والسنة",
  openGraph: {
    title: " المكتبة العلمية لكوكبة من العلماء والمشايخ ",
    description: " المكتبة العلمية لكوكبة من العلماء والمشايخ  , تحتوي على المنهج العلمي لكل طالب علم يسعى إلى الإرتقاء في  سلم طلب العلم الشرعي وفق منهج علمي على الكتاب والسنة",
    images: [
      {
        url: "/Salaf_Logo.png",
        width: 1200,
        height: 630,
        alt: "Salaf Logo",
      },
    ],
    url: "https://talep-elm.vercel.app/booksound?",
    siteName: " المكتبة العلمية لكوكبة من العلماء والمشايخ ",
    type: "website",
    locale: "ar_AR",

  },
  twitter: {
    card: "summary_large_image",
    title: " المكتبة العلمية لكوكبة من العلماء والمشايخ ",
    description: " المكتبة العلمية لكوكبة من العلماء والمشايخ  , تحتوي على المنهج العلمي لكل طالب علم يسعى إلى الإرتقاء في  سلم طلب العلم الشرعي وفق منهج علمي على الكتاب والسنة",
    images: ["/images/Title_Logo.webp"],
  },
  keywords: [
    "الشيخ خالد منصور",
    "المنهج العلمي",
    "طلب العلم الشرعي",
    "الكتاب والسنة",
    "الدكتور خالد منصور",
    "علوم شرعية",
    "تعليم إسلامي",
    "الدورات العلمية",
    "منهج طالب العلم الشرعي",
    "منهج السالكين",
    "منهج السلف الصالح",
    "منهج أهل السنة والجماعة",
    "منهج أهل الحديث",
    "منهج أهل العلم",
    "منهج أهل الدعوة",
    "منهج أهل التفسير",
    "منهج أهل الفقه",
    "منهج أهل العقيدة",
    "شرح كتاب ",
    "بشرح الشيخ ",
    "بشرح الدكتور ",
    "فقه",
    "عقيدة",
    "تفسير",
    "سيرة",
    "حديث",
    "مصطلح",
    "اصول فقه",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/icon/apple-touch-icon.png",
    shortcut: "/icon/favicon-16x16.png",
    other: [
      {
        rel: "icon",
        url: "/icon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  applicationName: "طالب علم شرعي",
  authors: [
    {
      name: "م/ عبدالله يحيى",
      url: "https://www.linkedin.com/in/abdalla-yahia",
    },
  ],
  creator: "م/ عبدالله يحيى",
  publisher: "م/ عبدالله يحيى",
  colorScheme: "light dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
   robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    noarchive: false,
    nosnippet: false,
  },

}
};
export default function BooksHomePage() {
 
  return (
    <BooksContainer />
  );
}
