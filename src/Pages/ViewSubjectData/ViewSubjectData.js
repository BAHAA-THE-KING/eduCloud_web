import "./ViewSubjectData.css";

import { TextInput, Title, ButtonWithIcon } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useParams } from "react-router-dom";

function ViewSubjectData() {
   const { id } = useParams();

   let [name, setName] = useState("");
   let [maxMark, setMaxMark] = useState("");
   let [passMark, setPassMark] = useState("");
   let [notes, setNotes] = useState("");
   let [gradeName, setGradeName] = useState("");

   useEffect(
      function () {
         handler.getSubjects(
            data => {
               for (const k of data) {
                  for (const n of k.subjects) {
                     if (n.id == id) {
                        setName(n.name);
                        setMaxMark(n.max_mark);
                        setPassMark(n.min_mark);
                        setNotes(n.notes);
                        setGradeName(k.name);
                        break;
                     }
                  }
               }
            }
         )
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

   return (
      <div className="viewsubjectdata">
         <Title text="عرض المادة الدراسية" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <div className="frm">
               <div>
                  <label>اسم المادة :</label>
                  <br />
                  <TextInput
                     defaultValue={name}
                     inputHook={setName}
                     editable={isEdit}
                     enterHook={() => { }}
                     hint="مثال: تاسع أولى"
                  />
                  <br />
                  <label>{"العلامة الكلية : " + maxMark}</label>
                  <br />
                  <TextInput type="number" editable={isEdit} defaultValue={maxMark} inputHook={setMaxMark} hint="العلامة العليا" />
                  <br />
                  <label>{"علامة النجاح : " + passMark}</label>
                  <br />
                  <TextInput type="number" editable={isEdit} defaultValue={passMark} inputHook={setPassMark} hint="العلامة الدنيا" />
                  <br />
                  <label>{"الملاحظات : "}</label>
                  <br />
                  <TextInput type="text" editable={isEdit} defaultValue={notes} inputHook={setNotes} hint="ملاحظات عن المادة" />
                  <br />
                  <label>{"الصف الذي تتبع له : " + gradeName}</label>
               </div>
            </div>
            <div className='btns'>
               <ButtonWithIcon
                  text={isEdit ? "تأكيد التعديلات" : "تعديل"}
                  className="modify"
                  src="Icons/subject.svg"
                  hook={
                     () => {
                        if (isEdit) {
                           handler.editSubject(
                              id,
                              name,
                              maxMark,
                              passMark,
                              notes,
                              () => {
                                 setIsEdit(false);
                              }
                           );
                        } else {
                           setIsEdit(true);
                        }
                     }
                  }
               />
               {/*<br />
               <ButtonWithIcon
                  text="حذف"
                  className="modify"
                  src="Icons/delete.svg"
                  hook={() => { }}
               />*/}
            </div>
         </div>
      </div>
   );
}

export default ViewSubjectData;