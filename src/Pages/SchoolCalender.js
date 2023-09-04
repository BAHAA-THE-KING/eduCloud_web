import { Container, Row } from "react-bootstrap";
import * as handlers from '../handlers';
import { Cell } from "../components";
import { useState } from "react";

function SchoolCalender() {
   const [plans, setPlans] = useState([
      {
         text: "Parnets meeting.",
         status: "completed"
      },
      {
         text: "bye",
         status: "pending"
      },
      {
         text: "noooo",
         status: "skipped"
      }
   ]);

   return (
      <>
         <Container className="h-100" fluid>
            <Row>
               <Cell plans={plans} />
            </Row>
         </Container>
      </>
   );
}

export default SchoolCalender;