import { Button, Col, Row } from "react-bootstrap";

function ListOfButtons({ data, normal }) {
   return (
      <Row className={"justify-content-" + ((!!normal) ? "start" : "center")}>
         {
            data.map(
               elm =>
                  <Col xs='9' className='my-1' key={elm.name}>
                     <Button style={{ minWidth: ((!!normal) ? "50%" : "100%") }} onClick={elm.event} disabled={elm.disabled}>
                        {elm.name}
                     </Button>
                  </Col>
            )
         }
      </Row>
   );
}

export default ListOfButtons;