import { Col, Dropdown, Form, Row } from "react-bootstrap";

function Multiple({ id, text, options, multiple, value, hook }) {

   return (
      <>
         <Form.Label htmlFor={id}>{text} :</Form.Label>
         <Dropdown id={id}>
            <Dropdown.Toggle>
               {
                  multiple ?
                     (
                        options.filter(e => value.indexOf(e.id) !== -1).length ?
                           options.filter(e => value.indexOf(e.id) !== -1).map(e => e.name).join(", ")
                           : "اختر " + text
                     )
                     : (
                        options.find(e => e.id == value)?.name ?? "اختر " + text
                     )
               }
            </Dropdown.Toggle>
            <Dropdown.Menu>
               {
                  [...options, { id: "", name: <b>إلغاء</b> }]
                     .map(
                        option =>
                           <Dropdown.Item
                              onClick={
                                 e => {
                                    if (multiple) {
                                       if (option.id === "") {
                                          hook([]);
                                          return;
                                       }
                                       e.stopPropagation();
                                       if (value.find(e => e == option.id)) {
                                          hook(value.filter(e => e != option.id));
                                       } else {
                                          hook([...value, option.id]);
                                       }
                                    }
                                    else {
                                       hook(option.id);
                                    }
                                 }
                              }
                           >
                              <Row>
                                 {
                                    multiple &&
                                    <Col className="text-start">
                                       <Form.Check type="checkbox" checked={!!value.find(e => e == option.id)} />
                                    </Col>
                                 }
                                 <Col className="text-start">
                                    {option.name}
                                 </Col>
                              </Row>
                           </Dropdown.Item>
                     )
               }
            </Dropdown.Menu>
         </Dropdown>
      </>
   );
}

export default Multiple;