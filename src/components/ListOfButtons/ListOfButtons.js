import { Button, Col, Row } from "react-bootstrap";

function ListOfButtons({ data }) {
   return (
      <Row>
         {
            data.map(
               elm =>
                  <Col xs='9' className='my-1'>
                     <Button className='w-100' onClick={elm.event}>
                        {elm.name}
                     </Button>
                  </Col>
            )
         }
      </Row>
   );
}

export default ListOfButtons;