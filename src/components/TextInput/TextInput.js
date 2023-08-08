import "./TextInput.css";

function TextInput(props) {
   return (
      <div className='text'>
         <input
            className='inptext'
            type={props.type ?? 'text'}
            step={0.1}
            dir='rtl'
            disabled={!(props.editable ?? true)}
            placeholder={props.hint}
            value={props.defaultValue ?? ""}
            onChange={e => { props.inputHook(props.type === "checkbox" ? e.target.checked : e.target.value) }}
            checked={props.type === "checkbox" ? props.defaultValue : false}
            onInput={() => { }}
            onKeyDown={
               e =>
                  (e.key === 'Enter') ?
                     (
                        !!props.enterHook ?
                           props.enterHook(e.target.value)
                           : ""
                     ) : null
            }
         />
         <img
            className="imgtext"
            src={(props.type === "user name") ? "icons/person.svg" : "#"}
            alt=""
         />
      </div>
   );
}

export default TextInput;