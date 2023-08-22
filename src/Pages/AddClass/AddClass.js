import { Title, Multiple, InputWithLabel } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { AddInterface } from "../../Interfaces";

function AddClass() {
   let [name, setName] = useState("");
   let [grade, setGrade] = useState("");
   let [maxNum, setMaxNum] = useState("");

   let [grades, setGrades] = useState([]);

   useEffect(
      () => {
         handler.getGrades(setGrades);
      }
      , []
   );

   return (
      <AddInterface
         image={
            <img
               src="Images/class.jpg"
               alt=""
               style={{
                  width: "60%",
                  height: "CALC(100% - 73px)",
                  position: "fixed",
                  bottom: "0",
                  left: "0",
                  transform: "translateX(-25%)",
                  clipPath: "ellipse(55% 50% at 30% 50%)"
               }
               }
            />
         }
         control={
            <>
               <Title text="إضافة شعبة" />
               <InputWithLabel
                  id="name"
                  text="اسم الشعبة"
                  hint="اسم الشعبة"
                  value={name}
                  hook={setName}
               />
               <InputWithLabel
                  id="maxNumber"
                  text="العدد الأقصى للطلاب"
                  hint="العدد الأقصى للطلاب"
                  value={maxNum}
                  hook={setMaxNum}
               />
               <Multiple
                  id="grade"
                  text="الصف الذي تتبع له"
                  options={grades}
                  value={grade}
                  hook={setGrade}
               />
            </>
         }
         addFunc={
            () => {
               handler.addClass(
                  name,
                  grade,
                  maxNum,
                  () => { }
               );
            }
         } />
   );
}

export default AddClass;