import { Title, InputWithLabel } from "../../components";
import { useState } from "react";
import * as handler from './../../handlers';
import { AddInterface } from "../../Interfaces";

function AddTestForm() {
   let [name, setName] = useState("");

   return (
      <AddInterface
         image={
            <img
               src="Images/addtest.jpg"
               alt=""
               style={{
                  width: "60%",
                  height: "CALC(100% - 73px)",
                  position: "fixed",
                  bottom: "0",
                  left: "0",
                  transform: "translateX(-30%)",
                  clipPath: "ellipse(60% 50% at 30% 50%)"
               }}
            />
         }
         control={
            <>
               <Title text="إنشاء نموذج لاختبار القدرات" />
               <InputWithLabel
                  id="name"
                  text="اسم النموذج"
                  hint="اسم النموذج"
                  value={name}
                  hook={setName}
               />
            </>
         }
         addFunc={
            () => {
               handler.addTestForm(
                  name,
                  () => { }
               );
            }
         }
      />
   );
}

export default AddTestForm;