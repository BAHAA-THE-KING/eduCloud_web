import "./AddEmployee.css";

import { TextInput, MultipletInput, Button, Title } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { useNavigate } from "react-router-dom";

function AddEmployee() {
   const navigate = useNavigate();

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

   let [allRoles, setRoles] = useState([]);
   let [name, setName] = useState("");
   let [surName, setSurName] = useState("");
   let [selectedRoles, setSelectedRoles] = useState([]);
   let [selectedRolesNames, setSelectedRolesNames] = useState([]);

   return (
      <div className="addemployee">
         <img src="../Images/addemployee.png" alt="" className="bg" />
         <Title text="إنشاء حساب لموظف" />
         <div className="content">
            <form>
               <label>اسم الموظف :</label>
               <TextInput defaultValue={name} inputHook={setName} editable={true} enterHook={() => { }} hint="الاسم" />
               <br />
               <label>كنية الموظف :</label>
               <TextInput defaultValue={surName} inputHook={setSurName} editable={true} enterHook={() => { }} hint="الكنية" />
               <br />
               <label>الأدوار :</label>
               <MultipletInput
                  text="اختر الأدوار"
                  currentData={selectedRoles}
                  options={allRoles}
                  dataHook={setSelectedRoles}
                  textHook={setSelectedRolesNames}
               />
               <br />
               <Button
                  text="متابعة"
                  hook={
                     e => {
                        e.preventDefault();
                        handler.addEmployee(
                           name,
                           surName,
                           selectedRoles,
                           empData => {
                              const next = [];
                              if (selectedRolesNames.indexOf("teacher") !== -1) next.push(handler.ADDTEACHER);
                              if (selectedRolesNames.indexOf("supervisor") !== -1) next.push(handler.ADDSUPERVISOR);
                              if (next.length !== 0) {
                                 localStorage.setItem("next", JSON.stringify({ empData: { ...empData, roles: selectedRolesNames }, next }))
                                 navigate(next[0]);
                              } else {
                                 localStorage.removeItem("next");
                                 navigate(handler.HOME);
                              }
                           }
                        );
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default AddEmployee;