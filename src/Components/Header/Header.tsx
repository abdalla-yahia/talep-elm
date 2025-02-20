import Image from "next/image";
import Link from "next/link";
import { Amiri } from 'next/font/google'
import NavLinks from "./NavLinks";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import { UserPayload } from "@/Interfaces/InterFaces";
import style from './Header.module.css'

const amiri = Amiri({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-amiri",
  display: "swap",
  adjustFontFallback: false,
});
export default async function Header() {
  const token: string = (await cookies()).get('JwtToken')?.value || "";
  if (!token) {
    return (
      <>
        <nav className={`${amiri.className} ${style.header_nav} relative w-full z-50 flex bg-secondary_color mb-2`}>
          <div className="container  w-full p-2 flex justify-around items-center">
            <Link href="/" className={'flex justify-center  items-center font-bold text-fuchsia-700 hover:text-text_color'}>
              <Image className="rounded-lg ml-2" alt="logo" width={280} height={320} src={'/images/Title_Logo.png'} />
            </Link>
            <NavLinks user={null} />
            <Image className="rounded-lg ml-2" alt="logo" width={150} height={120} src={'/Salaf_Logo.png'} />
          </div>
        </nav>
      </>

    )
  }
  const Decoade = Jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;

  return (
    <>
      <nav className={`${amiri.className} ${style.header_nav} relative w-full z-50 flex bg-secondary_color mb-2`}>
        <div className="container  w-full p-2 flex justify-around items-center">
          <Link href="/" className={'flex justify-center  items-center font-bold text-fuchsia-700'}>
            <Image className="rounded-lg ml-2" alt="logo" width={280} height={320} src={'/images/Title_Logo.png'} />
          </Link>
          <NavLinks user={Decoade} />
          <Image className="rounded-lg ml-2" alt="logo" width={150} height={120} src={'/Salaf_Logo.png'} />
        </div>
      </nav>
    </>
  );
}
