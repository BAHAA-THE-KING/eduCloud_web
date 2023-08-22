import { InputWithLabel, ListOfButtons, Title } from "../../components";
import { useState } from "react";
import * as handler from './../../handlers';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { AddInterface } from "../../Interfaces";

function AddGrade() {
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
                  clipPath: "ellipse(60% 50% at 30% 50%)",
               }}
            />
         }
         control={
            <>
               <Title text="إضافة صف" />
               <InputWithLabel
                  id="name"
                  text="اسم الصف"
                  hint="مثال: التاسع"
                  value={name}
                  hook={setName}
               />
            </>
         }
         addFunc={
            () => {
               handler.addGrade(
                  name,
                  () => { }
               );
            }
         }
      />
   );
}

export default AddGrade;