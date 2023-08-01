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
            onChange={() => { }}
            onInput={e => { props.inputHook(e.target.value) }}
            onKeyDown={
               e =>
                  (e.key === 'Enter') ?
                     props.enterHook(e.target.value) : null
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