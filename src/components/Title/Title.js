import { Col, Row } from "react-bootstrap";

function Title(props) {
   return (
      <Row className="fs-1">
         <Col xs='12'>
            <b color="#061E45">{props.text}</b>
         </Col>
      </Row>
   );
}

export default Title;