import { Dropdown, Form } from "react-bootstrap";

function Multiple({ id, text, options, value, hook }) {

   return (
      <>
         <Form.Label htmlFor={id}>{text} :</Form.Label>
         <Dropdown id={id}>
            <Dropdown.Toggle>
               {options.find(e => e.id == value)?.name ?? "اختر " + text}
            </Dropdown.Toggle>
            <Dropdown.Menu>
               {
                  [...options, { id: "", name: <b>إلغاء</b> }]
                     .map(
                        option =>
                           <Dropdown.Item
                              onClick={
                                 () => hook(option.id)
                              }
                           >
                              {option.name}
                           </Dropdown.Item>
                     )
               }
            </Dropdown.Menu>
         </Dropdown>
      </>
   );
}

export default Multiple;