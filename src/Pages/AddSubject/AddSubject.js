import "./AddSubject.css";

import { Title, TextInput, Button, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';

function AddSubject() {
   let [name, setName] = useState("");
   let [grade, setGrade] = useState("");
   let [maxMark, setMaxMark] = useState("");
   let [passMark, setPassMark] = useState("");
   let [notes, setNotes] = useState("");

   let [grades, setGrades] = useState([]);
   let [gradeName, setGradeName] = useState("");

   useEffect(
      () => {
         handler.getGrades(setGrades);
      }
      , []
   );

   return (
      <div className="addsubject">
         <Title text="إنشاء مادة" />
         <img src="Images/class.jpg" alt="" className="bg" />
         <div className="content">
            <form>
               <label>اسم المادة :</label>
               <br />
               <TextInput defaultValue={name} inputHook={setName} editable={true} enterHook={() => { }} hint="مثال: رياضيات - جبر" />
               <br />
               <label>{"العلامة الكلية : " + maxMark}</label>
               <br />
               <TextInput type="number" defaultValue={maxMark} inputHook={setMaxMark} hint="العلامة الكلية" />
               <br />
               <label>{"علامة النجاح : " + passMark}</label>
               <br />
               <TextInput type="number" defaultValue={passMark} inputHook={setPassMark} hint="علامة النجاح" />
               <br />
               <label>{"الملاحظات : "}</label>
               <br />
               <TextInput type="number" defaultValue={notes} inputHook={setNotes} hint="ملاحظات" />
               <br />
               <label>{"الصف الذي تتبع له : " + gradeName}</label>
               <br />
               <br />
               <MultipletButton open={true} text="اختر صفاً" options={grades} dataHook={setGrade} textHook={setGradeName} />
               <br />
               <Button
                  text="إدخال"
                  hook={
                     e => {
                        e.preventDefault();
                        handler.addSubject(
                           name,
                           grade,
                           maxMark,
                           passMark,
                           notes,
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

export default AddSubject;