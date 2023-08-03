import "./ViewGradeData.css";

import { TextInput, Title, ButtonWithIcon } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useParams } from "react-router-dom";

function ViewGradeData() {
   const { id } = useParams();

   let [name, setName] = useState("");

   useEffect(
      function () {
         handler.getGradeData(
            id,
            data => setName(data.name)
         )
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

   return (
      <div className="viewgradedata">
         <Title text="عرض الصف" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <div className="frm">
               <div>
                  <label><b>اسم الصف :</b></label>
                  <TextInput editable={isEdit} defaultValue={name} inputHook={setName} enterHook={() => { }} hint="الاسم" />
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
                           handler.editGrade(
                              id,
                              name,
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

export default ViewGradeData;