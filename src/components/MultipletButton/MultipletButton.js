import "./MultipletButton.css";
import Button from "../Button/Button";

import { useState } from "react";

function MultipletButton(props) {
   const [open, setOpen] = useState(false);
   return (
      <div className='multiplebtn'>
         <button onClick={e => { e.preventDefault(); setOpen(!open); }}>{props.text}</button>
         <ul className={'selectlist'} style={(open) ? { height: props.options.length * 60 + "px" } : null}>
            {
               props.options.map((e, i) =>
                  <li key={i}>
                     <Button data-id={e.id} text={e.name} hook={
                        () => {
                           props.dataHook(e.id);
                           props.textHook(e.name);
                           setOpen(false);
                        }
                     } />
                  </li>
               )
            }
         </ul>
      </div>
   );
}

export default MultipletButton;