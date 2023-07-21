import "./AddEmployee.css";

import { TextInput, MultipletInput, Button, Title } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';

function AddEmployee() {
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

   return (
      <div className="addemployee">
         <img src="../Images/addemployee.jpg" alt="" className="bg" />
         <div className="content">
            <Title text="إنشاء حساب لموظف" />
            <form>
               <label>اسم الموظف :</label>
               <br />
               <TextInput inputHook={setName} enterHook={() => { }} hint="الاسم" />
               <br />
               <label>كنية الموظف :</label>
               <br />
               <TextInput inputHook={setSurName} enterHook={() => { }} hint="الكنية" />
               <br />
               <label>الأدوار :</label>
               <MultipletInput text="اختر الأدوار" options={allRoles} dataHook={setSelectedRoles} textHook={() => { }} />
               <br />
               <Button text="متابعة" hook={e => { e.preventDefault(); handler.addEmployee(name, surName, selectedRoles); }} />
            </form>
         </div>
      </div>
   );
}

export default AddEmployee;