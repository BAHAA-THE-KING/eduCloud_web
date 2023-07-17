import "./MultipletInput.css";

import { useState } from "react";

function MultipletInput(props) {
   const [open, setOpen] = useState(false);

   return (
      <div className='multiple'>
         <button onClick={e => { e.preventDefault(); setOpen(!open); }}>اختر الأدوار</button>
         <ul className={(open) ? 'selectlist open' : 'selectlist'}>
            {
               props.options.map(e =>
                  <li>
                     <input type="checkbox" data-name={e} onClick={
                        () => {
                           const selected = [];
                           const elms = document.querySelectorAll("ul.selectlist.open>li>input[type=checkbox]");
                           for (const k of elms)
                              if (k.checked)
                                 selected.push(k.dataset.name);
                           props.hook(selected);
                        }
                     } />
                     <span onClick={e => e.target.previousSibling.click()}>
                        {e}
                     </span>
                  </li>
               )
            }
         </ul>
      </div>
   );
}

export default MultipletInput;