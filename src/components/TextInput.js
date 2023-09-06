function TextInput({ type, editable, hint, defaultValue, inputHook, enterHook, style }) {
   return (
      <div className='text'>
         <input
            type={type ?? 'text'}
            step={0.1}
            dir='rtl'
            style={style ?? {}}
            disabled={!(editable ?? true)}
            placeholder={hint}
            value={defaultValue ?? ""}
            onChange={e => { inputHook(type === "checkbox" ? e.target.checked : e.target.value) }}
            checked={type === "checkbox" ? defaultValue : false}
            onInput={() => { }}
            onKeyDown={
               e =>
                  (e.key === 'Enter') ?
                     (
                        !!enterHook ?
                           enterHook(e.target.value)
                           : ""
                     ) : null
            }
         />
      </div>
   );
}

export default TextInput;