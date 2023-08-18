import { Form } from "react-bootstrap";

function InputWithLabel({ id, type, as, text, hint, disabled, value, hook, ehook, noLabel, name }) {
   return (
      <>
         {
            (!noLabel) &&
            <Form.Label htmlFor={id}>{text} : </Form.Label>
         }
         {
            (type !== "checkbox" && type !== "switch" && type !== "radio") ?
               <Form.Control
                  id={id}
                  type={type ?? 'text'}
                  as={as ?? "input"}
                  disabled={disabled ?? false}
                  value={value}
                  placeholder={hint}
                  onChange={e => hook(e.target.value)}
                  onKeyDown={
                     e => {
                        if (e.key === 'Enter') {
                           e.preventDefault();
                           if (ehook) ehook(e.target.value);
                        }
                     }
                  }
               />
               : <Form.Check
                  id={id}
                  type={type ?? 'checkbox'}
                  as={as ?? "input"}
                  name={name}
                  disabled={disabled ?? false}
                  value={value}
                  placeholder={hint}
                  onChange={e => hook(e.target.checked)}
                  onKeyDown={
                     e => {
                        if (e.key === 'Enter') {
                           e.preventDefault();
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