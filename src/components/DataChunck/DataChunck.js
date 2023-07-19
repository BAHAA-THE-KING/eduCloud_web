import './DataChunck.css';
import { MultipletButton, MultipletInput } from '..';
import { useState } from 'react';

function DataChunck(props) {
   const [subject, setSubject] = useState("");
   const [classes, setClasses] = useState([]);
   return (
      <>
         <span className='datachunck'>
            الصف : {props.grade}
         </span>
         <span className='datachunck'>
            <label>المادة :{subject}</label>
            <MultipletButton
               options={props.subjects}
               text="اختر المادة"
               dataHook={subject_id => props.subjectHook(props.index, subject_id)}
               textHook={setSubject}
            />
         </span>
         <span className='datachunck'>
            <label>الشعب :{classes.length ? classes.join(", ") + "." : ""}</label>
            <MultipletInput
               options={props.classes}
               text="اختر الشعب"
               dataHook={classes_id => props.classHook(props.index, classes_id)}
               textHook={setClasses}
            />
         </span>
      </>
   );
}

export default DataChunck;