import "./AddTestForm.css";

import { Title, TextInput, Button } from "../../components";
import { useState } from "react";
import * as handler from './../../handlers';

function AddTestForm() {
   let [name, setName] = useState("");

   return (
      <div className="addtestform">
         <Title text="إنشاء نموذج لاختبار القدرات" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <form>
               <label>اسم النموذج :</label>
               <br />
               <TextInput defaultValue={name} inputHook={setName} editable={true} enterHook={() => { }} hint="الاسم" />
               <br />
               <Button
                  text="إدخال"
                  hook={
                     e => {
                        e.preventDefault();
                        handler.addTestForm(
                           name,
                           data => { }
                        );
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default AddTestForm;