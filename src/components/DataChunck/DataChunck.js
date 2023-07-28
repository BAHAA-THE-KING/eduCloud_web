import './DataChunck.css';

import { MultipletButton, MultipletInput } from '..';

/*
hasButtonSelection

mainText

buttonSelectionOptions
buttonSelectedText
buttonSelectedData
buttonSelectHook

checkboxSelectionOptions
checkboxSelectedText
checkboxSelectedData
checkboxSelectHook

removeDataHook
 */
function DataChunck(props) {
   return (
      <>
         <span className='datachunck fdatachunck'>
            {
               (props.editable ?? true) ?
                  <img src="../Icons/deleteRed.svg" alt="" onClick={props.removeDataHook} />
                  : ""
            }
            <span>
               الصف : {props.mainText}
            </span>
         </span>
         {
            (props.hasButtonSelection) ?
               <span className='datachunck'>
                  <label>المادة :{props.buttonSelectedText}</label>
                  <MultipletButton
                     editable={props.editable}
                     options={props.buttonSelectionOptions}
                     text="اختر المادة"
                     dataHook={props.buttonSelectHook}
                     textHook={() => { }}
                  />
               </span>
               : null
         }
         <span className='datachunck'>
            <label>الشعب :{props.checkboxSelectedText.length ? props.checkboxSelectedText.join(", ") + "." : ""}</label>
            <MultipletInput
               editable={props.editable}
               options={props.checkboxSelectionOptions}
               currentData={props.checkboxSelectedData}
               text="اختر الشعب"
               dataHook={props.checkboxSelectHook}
               textHook={() => { }}
            />
         </span>
      </>
   );
}

export default DataChunck;