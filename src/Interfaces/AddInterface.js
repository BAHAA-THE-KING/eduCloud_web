import { Col, Container, Form, Row } from "react-bootstrap";
import { ListOfButtons } from "../components";

function AddInterface({ image, control, addFunc }) {
   return (
      <Container fluid>
         {image}
         <Row className="mt-3">
            <Col>
               <Form className="w-25 text-start border p-5 ps-4 pt-0">
                  {control}
                  <Row className="mt-3">
                     <ListOfButtons data={
                        [
                           {
                              name: "إدخال",
                              event: e => {
                                 e.preventDefault();
                                 addFunc();
                              }
                           }
                        ]
                     } />
                  </Row>
               </Form>
            </Col>
         </Row>
      </Container>
   );
}

export default AddInterface;