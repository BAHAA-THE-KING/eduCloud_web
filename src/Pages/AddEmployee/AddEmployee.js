import "./AddEmployee.css";

import { TextInput, MultipletInput, Button } from "../../components";
import { useEffect, useState } from "react";
import { addemployee, roles } from "../../handlers";

function AddEmployee() {
   useEffect(
      function () {
         roles(
            roles => {
               console.log(roles);
               setRoles(roles);
            }
         );
      },
      false);

   let [allRoles, setRoles] = useState([]);
   let [name, setName] = useState("");
   let [surName, setSurName] = useState("");
   let [selectedRoles, setSelectedRoles] = useState([]);

   return (
      <div className="addemployee">
         <img src="../Images/addemployee.jpg" alt="" className="bg" />
         <div className="content">
            <span>
               <b>إنشاء حساب لموظف</b>
            </span>
            <form>
               <label>اسم الموظف :</label>
               <br />
               <TextInput hook={setName} />
               <br />
               <label>كنية الموظف :</label>
               <br />
               <TextInput hook={setSurName} />
               <br />
               <label>الأدوار :</label>
               <MultipletInput options={allRoles} hook={setSelectedRoles} />
               <br />
               <Button text="متابعة" hook={e => { e.preventDefault(); addemployee(name, surName, selectedRoles); }} />
            </form>
         </div>
      </div>
   );
}

export default AddEmployee;