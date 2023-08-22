import { Col, Container, Row } from "react-bootstrap";
import { Navigation } from "../components";

function ViewInterface({ control, view, navigation, current, next, previous, setCurrent }) {
   return (
      <Container fluid>
         <Row className='mt-2'>
            <Col xs='2'>
               {control}
            </Col>
            <Col xs='10'>
               {view}
            </Col>
         </Row>
         {(navigation ?? true) ? <Navigation current={current} next={next} previous={previous} setCurrent={setCurrent} /> : ""}
      </Container>
   );
}

export default ViewInterface;