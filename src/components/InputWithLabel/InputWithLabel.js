import { Form } from "react-bootstrap";

function InputWithLabel({ id, type, as, text, hint, value, hook, ehook }) {
   return (
      <>
         <Form.Label htmlFor={id}>{text} : </Form.Label>
         {
            (type !== "checkbox" && type !== "switch") ?
               <Form.Control
                  id={id}
                  type={type ?? 'text'}
                  as={as ?? "input"}
                  value={value}
                  placeholder={hint}
                  onChange={e => hook(e.target.value)}
                  onKeyDown={
                     e => {
                        if (e.key === 'Enter') {
                           if (ehook) ehook(e.target.value);
                        }
                     }
                  }
               />
               : <Form.Check
                  id={id}
                  type={type ?? 'checkbox'}
                  as={as ?? "input"}
                  value={value}
                  placeholder={hint}
                  onChange={e => hook(e.target.checked)}
                  onKeyDown={
                     e => {
                        if (e.key === 'Enter') {
                           if (ehook) ehook(e.target.checked);
                        }
                     }
                  }
               />
         }
      </>
   );
}

export default InputWithLabel;