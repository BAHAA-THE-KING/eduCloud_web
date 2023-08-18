import { Col, Dropdown, Form, Row } from "react-bootstrap";

function Multiple({ id, text, options, multiple, value, hook, noLabel, noNull }) {
   const myOptions = [...options];
   if (!noNull) myOptions.push({ id: "", name: <b>إلغاء</b> });

   return (
      <>
         {(noLabel ?? false) || <Form.Label htmlFor={id}>{text} :</Form.Label>}
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
                  myOptions.map(
                     option =>
                        <Dropdown.Item
                           key={option.id}
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
                                    <Form.Check type="checkbox" checked={!!value.find(e => e == option.id)} onChange={() => { }} />
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