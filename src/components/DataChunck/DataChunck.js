import './DataChunck.css';

import { MultipletButton, MultipletInput } from '..';
import { useState } from 'react';

function DataChunck(props) {
   const [buttonSelectionText, setButtonSelectionText] = useState("");
   const [checkboxSelectionText, setCheckboxSelectionText] = useState([]);
   return (
      <>
         <span className='datachunck fdatachunck'>
            <img src="../Icons/deleteRed.svg" alt="" onClick={() => props.removeDataHook(props.index)} />
            <span>
               الصف : {props.mainText}
            </span>
         </span>
         {
            (props.hasButtonSelection) ?
               <span className='datachunck'>
                  <label>المادة :{buttonSelectionText}</label>
                  <MultipletButton
                     options={props.buttonSelectionOptions}
                     text="اختر المادة"
                     dataHook={data_id => props.buttonSelectionHook(props.index, data_id)}
                     textHook={setButtonSelectionText}
                  />
               </span>
               : null
         }
         <span className='datachunck'>
            <label>الشعب :{checkboxSelectionText.length ? checkboxSelectionText.join(", ") + "." : ""}</label>
            <MultipletInput
               options={props.checkboxSelectionOptions}
               text="اختر الشعب"
               dataHook={selectedData => props.checkboxSelectionHook(props.index, selectedData)}
               textHook={setCheckboxSelectionText}
            />
         </span>
      </>
   );
}

export default DataChunck;