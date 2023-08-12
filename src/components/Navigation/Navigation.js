import { Button, Col, Row } from "react-bootstrap";

function Navigation({ previous, current, next, setCurrent }) {
   return (
      <Row>
         <Col xs='12'>
            <Button className='m-2' style={{ width: "6rem", height: "2.5rem" }} onClick={() => setCurrent(current - 1)} disabled={!previous}>
               {"<   السابق"}
            </Button>
            <Button className='m-2' style={{ width: "6rem", height: "2.5rem" }}>
               {current}
            </Button>
            <Button className='m-2' style={{ width: "6rem", height: "2.5rem" }} onClick={() => setCurrent(current + 1)} disabled={!next}>
               {"التالي   >"}
            </Button>
         </Col>
      </Row>
   );
}

export default Navigation;