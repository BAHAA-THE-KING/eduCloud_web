import "./ViewClassData.css";

import { TextInput, Title, ButtonWithIcon } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useParams } from "react-router-dom";

function ViewClassData() {
   const { id } = useParams();

   let [name, setName] = useState("");
   let [maxNum, setMaxNum] = useState("");
   let [gradeName, setGradeName] = useState("");

   useEffect(
      function () {
         handler.getSubjects(
            data => {
               for (const k of data) {
                  for (const n of k.g_classes) {
                     if (n.id == id) {
                        setName(n.name);
                        setMaxNum(n.max_number);
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
      <div className="viewclassdata">
         <Title text="عرض الشعبة" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <div className="frm">
               <div>
                  <label>اسم الشعبة :</label>
                  <br />
                  <TextInput
                     defaultValue={name}
                     inputHook={setName}
                     editable={isEdit}
                     enterHook={() => { }}
                     hint="مثال: تاسع أولى"
                  />
                  <br />
                  <label>{"العدد الأقصى للطلاب : " + maxNum}</label>
                  <br />
                  <TextInput
                     type="number"
                     editable={isEdit}
                     defaultValue={maxNum}
                     inputHook={setMaxNum}
                     hint="أقصى عدد للطلاب"
                  />
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
                           handler.editClass(
                              id,
                              name,
                              maxNum,
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

export default ViewClassData;