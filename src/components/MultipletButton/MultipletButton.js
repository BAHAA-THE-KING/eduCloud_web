import "./MultipletButton.css";
import Button from "../Button/Button";

import { useState } from "react";

/*
open
editable
text
options
dataHook
textHook
dontClose
*/

function MultipletButton(props) {
   const [open, setOpen] = useState(props.editable && (props.open ?? false));
   const [selected, setSelected] = useState("");

   return (
      <div className='multiplebtn'>
         {
            (props.editable ?? true) ?
               <button onClick={e => { e.preventDefault(); setOpen(!open); }}>{props.text}</button>
               : ""
         }
         {
            props.editable &&
            <div className='selectlist' style={(open) ? { height: Math.ceil(props.options.length / 2) * 60 + "px" } : null}>
               {
                  props.options.map((e, i) =>
                     <div key={i}>
                        {
                           <Button
                              data-id={e.id}
                              text={e.name}
                              className={(selected === e.id) ? "selected" : ""}
                              hook={
                                 () => {
                                    if (selected === e.id) {
                                       props.dataHook(e.id, false);
                                       props.textHook(e.name, false);
                                       setSelected(null)
                                    } else {
                                       props.dataHook(e.id, true);
                                       props.textHook(e.name, true);
                                       setSelected(e.id)
                                    }
                                    if (!props.dontClose) setOpen(false);
                                 }
                              }
                           />
                        }
                     </div>
                  )
               }
            </div>
         }
      </div>
   );
}

export default MultipletButton;