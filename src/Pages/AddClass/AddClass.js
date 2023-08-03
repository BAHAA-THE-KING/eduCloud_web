import "./AddClass.css";

import { Title, TextInput, Button, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';

function AddClass() {
   let [name, setName] = useState("");
   let [grade, setGrade] = useState("");
   let [maxNum, setMaxNum] = useState("");

   let [grades, setGrades] = useState([]);
   let [gradeName, setGradeName] = useState("");

   useEffect(
      () => {
         handler.getGrades(setGrades);
      }
      , []
   );

   return (
      <div className="addclass">
         <Title text="إنشاء شعبة" />
         <img src="Images/class.jpg" alt="" className="bg" />
         <div className="content">
            <form>
               <label>اسم الشعبة :</label>
               <br />
               <TextInput defaultValue={name} inputHook={setName} editable={true} enterHook={() => { }} hint="مثال: تاسع أولى" />
               <br />
               <label>{"العدد الأقصى للطلاب : " + maxNum}</label>
               <br />
               <TextInput
                  type="number"
                  defaultValue={maxNum}
                  inputHook={setMaxNum}
                  hint="أقصى عدد للطلاب"
               />
               <br />
               <label>{"الصف الذي تتبع له : " + gradeName}</label>
               <br />
               <br />
               <MultipletButton
                  open={true}
                  text="اختر صفاً"
                  options={grades}
                  dataHook={setGrade}
                  textHook={setGradeName}
               />
               <br />
               <Button
                  text="إدخال"
                  hook={
                     e => {
                        e.preventDefault();
                        handler.addClass(
                           name,
                           grade,
                           maxNum,
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

export default AddClass;