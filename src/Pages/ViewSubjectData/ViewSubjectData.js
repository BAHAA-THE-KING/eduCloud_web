import "./ViewSubjectData.css";

import { TextInput, Title, ButtonWithIcon, Button } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useNavigate, useParams } from "react-router-dom";

function ViewSubjectData() {
   const navigate = useNavigate();
   
   const { id } = useParams();

   let [name, setName] = useState("");
   let [maxMark, setMaxMark] = useState("");
   let [passMark, setPassMark] = useState("");
   let [notes, setNotes] = useState("");
   let [gradeName, setGradeName] = useState("");
   let [teachers, setTeachers] = useState([]);

   useEffect(
      function () {
         handler.getSubjectData(
            id,
            subject => {
               setName(subject.name);
               setMaxMark(subject.max_mark);
               setPassMark(subject.min_mark);
               handler.getGradeData(
                  subject.grade_id,
                  grade => {
                     setGradeName(grade.name);
                  }
               );
               setNotes(subject.notes);
               setTeachers(subject.teachers);
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
                  <br />
                  <br />
                  <label>{"المدرسين : "}</label>
                  <br />
                  {
                     teachers.map(
                        e =>
                           <>
                              <label>{"الاستاذ : " + e.first_name + " " + e.last_name}</label>
                              <br />
                              <Button
                                 text="عرض الملف الشخصي"
                                 className="show"
                                 hook={() => navigate(handler.VIEWEMPLOYEEDATA + e.id)}
                              />
                              <br />
                           </>
                     )
                  }
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