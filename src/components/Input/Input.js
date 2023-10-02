import styles from "./Input.module.css";

function Input({ type, editable, hint, className, defaultValue, inputHook, enterHook }) {
   return (
      <input
         type={type ?? 'text'}
         step={0.1}
         className={`${styles.text} ${className ?? ""}`}
         disabled={!(editable ?? true)}
         placeholder={hint ?? ""}
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
   );
}

export default Input;