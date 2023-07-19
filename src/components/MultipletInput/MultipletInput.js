import "./MultipletInput.css";

import { useState } from "react";

function MultipletInput(props) {
   const [open, setOpen] = useState(false);
   return (
      <div className='multiple'>
         <button onClick={e => { e.preventDefault(); setOpen(!open); }}>{props.text}</button>
         <ul className={'selectlist'} style={(open) ? { height: props.options.length * 30 + "px" } : null}>
            {
               props.options.map((e, i) =>
                  <li key={i}>
                     <input type="checkbox" data-id={e.id} onClick={
                        e => {
                           const selectedData = [];
                           const selectedText = [];
                           const elms = e.target.parentElement.parentElement.querySelectorAll("ul.selectlist>li>input[type=checkbox]");
                           for (const k of elms)
                              if (k.checked) {
                                 selectedData.push(k.dataset.id);
                                 selectedText.push(k.nextSibling.innerHTML);
                              }
                           props.dataHook(selectedData);
                           props.textHook(selectedText);
                        }
                     } />
                     <span onClick={e => e.target.previousSibling.click()}>
                        {e.name}
                     </span>
                  </li>
               )
            }
         </ul>
      </div>
   );
}

export default MultipletInput;