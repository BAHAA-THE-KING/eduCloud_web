import "./TextInput.css";

function TextInput(props) {
   return (
      <div className='text'>
         <input
            className='inptext'
            type='text'
            dir='rtl'
            placeholder={props.hint}
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