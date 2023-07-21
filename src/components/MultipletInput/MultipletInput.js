import "./MultipletInput.css";

import { useState } from "react";

function MultipletInput(props) {
   const [open, setOpen] = useState(false);
   return (
      <div className='multiple'>
         <button onClick={e => { e.preventDefault(); setOpen(!open); }}>{props.text}</button>
         <div className='selectlist' style={(open) ? { height: Math.ceil(props.options.length / 2) * 30 + "px" } : null}>
            {
               props.options.map((e, i) =>
                  <div key={i}>
                     <input type="checkbox" data-id={e.id} onClick={
                        e => {
                           const selectedData = [];
                           const selectedText = [];
                           const elms = e.target.parentElement.parentElement.querySelectorAll(".selectlist>div>input[type=checkbox]");
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
                  </div>
               )
            }
         </div>
      </div>
   );
}

export default MultipletInput;