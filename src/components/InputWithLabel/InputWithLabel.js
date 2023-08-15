import { Form } from "react-bootstrap";

function InputWithLabel({ id, type, as, text, hint, value, hook, ehook }) {
   return (
      <>
         <Form.Label htmlFor={id}>{text} : </Form.Label>
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
      </>
   );
}

export default InputWithLabel;