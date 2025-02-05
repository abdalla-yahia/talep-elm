import HomePage from "@/Components/Home/HomePage";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
    <Container  className="p-0 mt-2">
      <Row>
        <Col>
        <HomePage />
        </Col>
      </Row>
    </Container>
    </>
  );
}
