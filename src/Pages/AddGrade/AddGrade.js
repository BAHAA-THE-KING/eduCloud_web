import "./AddGrade.css";

import { Title, TextInput, Button } from "../../components";
import { useState } from "react";
import * as handler from './../../handlers';

function AddGrade() {
   let [name, setName] = useState("");

   return (
      <div className="addgrade">
         <Title text="إنشاء صف" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <form>
               <label>اسم الصف :</label>
               <br />
               <TextInput defaultValue={name} inputHook={setName} editable={true} enterHook={() => { }} hint="مثال: التاسع" />
               <br />
               <Button
                  text="إدخال"
                  hook={
                     e => {
                        e.preventDefault();
                        handler.addGrade(
                           name,
                           () => { }
                        );
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default AddGrade;