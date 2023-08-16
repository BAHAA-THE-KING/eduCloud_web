import { Button, Col, Row } from "react-bootstrap";

function ListOfButtons({ data }) {
   return (
      <Row className="justify-content-center">
         {
            data.map(
               elm =>
                  <Col xs='9' className='my-1'>
                     <Button style={{ minWidth: "100%" }} onClick={elm.event} disabled={elm.disabled}>
                        {elm.name}
                     </Button>
                  </Col>
            )
         }
      </Row>
   );
}

export default ListOfButtons;