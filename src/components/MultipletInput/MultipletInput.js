import "./MultipletInput.css";

import { useState } from "react";

function MultipletInput(props) {
   const [open, setOpen] = useState(props.open);
   return (
      <div className='multiple'>
         {
            (props.editable ?? true) ?
               <button onClick={e => { e.preventDefault(); setOpen(!open); }}>{props.text}</button>
               : ""
         }
         <div className='selectlist' style={(open) ? { height: Math.ceil(props.options.length / 2) * 30 + "px" } : null}>
            {
               props.options.map((e, i) =>
                  <div key={i}>
                     <input
                        type="checkbox"
                        checked={props.currentData ? props.currentData.map(e => "" + e).indexOf("" + e.id) > -1 : false}
                        onChange={() => { }}
                        data-id={e.id}
                        onClick={
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