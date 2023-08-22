import { Title, InputWithLabel, Multiple, ListOfButtons } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { AddInterface } from "../../Interfaces";

function AddEmployee() {
   const navigate = useNavigate();

   let [allRoles, setRoles] = useState([]);
   let [name, setName] = useState("");
   let [surName, setSurName] = useState("");
   let [selectedRoles, setSelectedRoles] = useState([]);

   useEffect(
      function () {
         handler.getRoles(
            roles => {
               roles = roles.map(e => Object.create({ id: e, name: e }));
               setRoles(roles);
            }
         );
      },
      []
   );

   return (
      <AddInterface
         image={
            <img
               src="Images/addemployee.png"
               alt=""
               style={{
                  width: "40%",
                  position: "fixed",
                  bottom: "0",
                  left: "0"
               }}
            />
         }
         control={
            <>
               <Title text="إنشاء حساب لموظف" />
               <InputWithLabel
                  id="name"
                  text="اسم الموظف"
                  hint="الاسم"
                  value={name}
                  hook={setName}
               />
               <InputWithLabel
                  id="lastname"
                  text="كنية الموظف"
                  hint="الكنية"
                  value={surName}
                  hook={setSurName}
               />
               <Multiple
                  id="role"
                  multiple={true}
                  text="الأدوار"
                  options={allRoles}
                  value={selectedRoles}
                  hook={setSelectedRoles}
               />
            </>
         }
         addFunc={
            () => {
               handler.addEmployee(
                  name,
                  surName,
                  selectedRoles,
                  empData => {
                     const next = [];
                     if (selectedRoles.indexOf("supervisor") !== -1) next.push(handler.ADDSUPERVISOR);
                     if (selectedRoles.indexOf("teacher") !== -1) next.push(handler.ADDTEACHER);
                     if (next.length)
                        navigate(
                           next[0],
                           { state: { empData, next } }
                        );
                     else
                        navigate(handler.HOME);

                  }
               );
            }
         }
      />
   );
}

export default AddEmployee;