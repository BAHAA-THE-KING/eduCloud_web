import "./ViewTestFormData.css";

import { TextInput, Title, ButtonWithIcon, DataHandler, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useParams } from "react-router-dom";

function ViewTestFormData() {
   const { id } = useParams();

   let [name, setName] = useState("");

   useEffect(
      function () {
         handler.getTestForms(
            data => data.map(e => e.id === Number(id) ? setName(e.name) : "")
         )
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

   return (
      <div className="viewtestformdata">
         <Title text="عرض النموذج" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <div className="frm">
               <div>
                  <label><b>اسم النموذج :</b></label>
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
                           handler.editTestForm(
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

export default ViewTestFormData;