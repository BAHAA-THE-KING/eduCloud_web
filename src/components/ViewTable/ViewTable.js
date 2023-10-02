import { Col, Container, Row } from "react-bootstrap";

function ViewTable({ rows }) {
   return (
      <Container
         fluid
         style={{
            backgroundColor: "#80808060",
            borderRadius: "15px",
         }}
      >
         <Row className="text-white p-1">
            <Col xs='3'><b>Date</b></Col>
            <Col xs='3'><b>Name</b></Col>
            <Col xs='3'><b>Subject name</b></Col>
            <Col xs='3'><b>Grade name</b></Col>
         </Row>
         {
            rows.map(
               row =>
                  <Row
                     key={row.date}
                     className="text-purple p-1"
                  >
                     <Col xs='3'><b>{row.date.toLocaleDateString("en-Gb")}</b></Col>
                     <Col xs='3'><b>{row.title}</b></Col>
                     <Col xs='3'><b>{row.subject.name}</b></Col>
                     <Col xs='3'><b>{row.grade.name}</b></Col>
                  </Row>
            )
         }
      </Container>
   );
}

export default ViewTable;