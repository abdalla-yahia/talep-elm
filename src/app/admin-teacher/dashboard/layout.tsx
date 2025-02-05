import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row } from "react-bootstrap";
import Sidebar from "@/Components/DashvoardSideBar/Sidebar";


export const metadata: Metadata = {
  title: " الدورات العلمية  ",
  description: " الدورات العلمية لموقع طالب علم شرعي تهدف لإخراج جيل جديد على الكتاب والسنة بدون إفراط أو تفريط",
};

export default function UserDAshboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <Row>
    <section className="flex  justify-start items-start gap-1">
      <Sidebar />
      <div className="w-5/6 h-full gap-3 bg-gray-400 min-h-screen rounded p-3 flex justify-start items-start flex-col flex-wrap">
      {children}
      </div>
    </section>
      </Row>
    </Container>
  );
}
