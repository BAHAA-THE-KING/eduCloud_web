import './ViewEmployees.css';

import { Button, ButtonWithIcon, MultipletButton, TextInput } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

//{ id: { initialName, currentName, initialSurName, currentSurName} }
const editedData = {};

function addToEditedData(id, initialName, currentName, initialSurName, currentSurName) {
   editedData[id] = {};

   editedData[id].initialName = initialName;
   editedData[id].currentName = currentName;

   editedData[id].initialSurName = initialSurName;
   editedData[id].currentSurName = currentSurName;

   if (initialName === currentName && initialSurName === currentSurName)
      editedData[id] = undefined;
}

//{ id: { initialRoles, currebtRoles} }
const editedRoles = {};
function addToEditedRoles(id, initialRoles, currentRoles) {
   editedData[id] = {};

   editedData[id].initialRoles = initialRoles.sort();
   editedData[id].currentRoles = currentRoles.sort();

   let same = true;
   for (let i = 0; i < initialRoles.length; i++)
      if (editedData[id].initialRoles[i] !== editedData[id].currentRoles)
         same = false;

   if (same)
      editedData[id] = undefined;
   console.log(editedData);
}

function ViewEmployees() {
   const [search, setSearch] = useState("%");
   const [searchRole, setSearchRole] = useState("");
   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([]);
   const [selected, setSelected] = useState("");
   const [edit, setEdit] = useState(false);
   const [roles, setRoles] = useState([]);

   useEffect(
      () =>
         handlers.getRoles(
            res => setRoles(res.map(e => Object.create({ id: e, name: e })))
         ),
      []
   );
   useEffect(
      () => {
         if (search === "") {
            setSearch("%");
            return;
         }

         handlers.getEmployees(
            res => {
               setCurrent(res.current_page);
               setNext(res.next_page_url);
               setPrevious(res.prev_page_url);
               const data = res.data;
               while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
               setData(data);
            },
            search + ((!!searchRole) ? ("?role=" + searchRole) : "")
         );
      },
      [search, searchRole]
   );

   return (
      <div className='viewemployees'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة موظف"
                  hook={() => handlers.goTo(handlers.ADDEMPLOYEE)}
                  src="../Icons/personAdd.svg"
               />
               <ButtonWithIcon
                  text="تعديل معلومات الموظفين"
                  hook={() => (!!selected) ? setEdit(true) : ""}
                  src="../Icons/person.svg"
               />
               <ButtonWithIcon
                  text="حذف موظفين"
                  hook={() => { }}
                  src="../Icons/delete.svg"
               />
               <label>عوامل التصفية :</label>
               <TextInput hint="بحث" inputHook={() => { }} enterHook={setSearch} />
               <MultipletButton
                  text="اختر الدور"
                  dontClose={true}
                  options={roles}
                  dataHook={(role, select) => (select) ? setSearchRole(role) : setSearchRole("")}
                  textHook={() => { }}
               />
            </div>
            <div className='show'>
               <div className='view'>
                  <div className="headings">
                     <div className='inner'>
                        المعرّف
                     </div>
                  </div>
                  <div className="headings">
                     <div className='inner'>
                        الاسم
                     </div>
                  </div>
                  <div className="headings">
                     <div className='inner'>
                        الكنية
                     </div>
                  </div>
                  <div className="headings">
                     <div className='inner'>
                        الأدوار
                     </div>
                  </div>
                  {
                     data.map(
                        (e, i) => (
                           <React.Fragment key={i}>
                              <div
                                 className={(selected === e.id) ? "selected" : ""}
                                 onClick={() => (!edit) ? ((selected === e.id) ? setSelected(null) : setSelected(e.id)) : ""}
                              >
                                 <div className='inner'>
                                    {e.id}
                                 </div>
                              </div>
                              <div
                                 className={(selected === e.id) ? "selected" : ""}
                                 onClick={() => (!edit) ? ((selected === e.id) ? setSelected(null) : setSelected(e.id)) : ""}
                              >
                                 <div
                                    className='inner'
                                    contentEditable={edit && (selected === e.id)}
                                    onKeyDown={
                                       ev => {
                                          if (ev.key === 'Enter') {
                                             ev.preventDefault();
                                             addToEditedData(
                                                e.id,
                                                e.first_name,
                                                ev.target.innerHTML,
                                                e.last_name,
                                                ev.target.parentElement.nextSibling.children[0].innerHTML
                                             );
                                          }
                                       }
                                    }
                                 >
                                    {e.first_name}
                                 </div>
                              </div>
                              <div
                                 className={(selected === e.id) ? "selected" : ""}
                                 onClick={() => (!edit) ? ((selected === e.id) ? setSelected(null) : setSelected(e.id)) : ""}
                              >
                                 <div
                                    className='inner'
                                    contentEditable={edit && (selected === e.id)}
                                    onKeyDown={
                                       ev => {
                                          if (ev.key === 'Enter') {
                                             ev.preventDefault();
                                             addToEditedData(
                                                e.id,
                                                e.first_name,
                                                ev.target.parentElement.previousSibling.children[0].innerHTML,
                                                e.last_name,
                                                ev.target.innerHTML
                                             );
                                          }
                                       }
                                    }
                                 >
                                    {e.last_name}
                                 </div>
                              </div>
                              <div
                                 className={(selected === e.id) ? "selected" : ""}
                                 onClick={() => (!edit) ? ((selected === e.id) ? setSelected(null) : setSelected(e.id)) : ""}
                              >
                                 <div
                                    className='inner'
                                    data-id={e.id}
                                    data-initialvalue={JSON.stringify(e.roles.map(e => e.name))}
                                    contentEditable={false}
                                 >
                                    {
                                       (!!e.id) ?
                                          (
                                             (e.roles.length !== 0) ?
                                                e.roles.map(e => e.name).join(",")
                                                : <i style={{ color: "#888888" }}>لا يوجد أدوار لهذا الموظف.</i>
                                          )
                                          : ""
                                    }
                                 </div>
                              </div>
                           </React.Fragment>
                        )
                     ).flat(Infinity)
                  }
               </div>
            </div>
         </div>
         <div className='navigation'>
            {
               !edit ?
                  <Button
                     text="<   السابق"
                     className="previous"
                     hook={
                        () => {
                           if (search === "") {
                              setSearch("%");
                              return;
                           }
                           handlers.getEmployees(
                              (res) => {
                                 setCurrent(res.current_page);
                                 setNext(res.next_page_url);
                                 setPrevious(res.prev_page_url);
                                 const data = res.data;
                                 while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
                                 setData(data);
                              },
                              previous.slice(previous.lastIndexOf("/") + 1)
                           );
                        }
                     }
                     disabled={!previous}
                  />
                  : null
            }
            <Button
               text={!edit ? current : "إدخال التعديلات"}
               hook={!edit ? () => { } :
                  () => {
                     const id = selected;
                     const name = editedData[id].currentName;
                     const surName = editedData[id].currentSurName;
                     handlers.editEmployee(id, name, surName, () => setEdit(false));
                  }
               }
               className={!edit ? "current" : " current enterEdits"}
            />
            {
               !edit ?
                  <Button
                     text="التالي   >"
                     className="next"
                     hook={
                        () => {
                           if (search === "") {
                              setSearch("%");
                              return;
                           }
                           handlers.getEmployees(
                              (res) => {
                                 setCurrent(res.current_page);
                                 setNext(res.next_page_url);
                                 setPrevious(res.prev_page_url);
                                 const data = res.data;
                                 while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
                                 setData(data);
                              },
                              next.slice(next.lastIndexOf("/") + 1)
                           );
                        }
                     }
                     disabled={!next}
                  />
                  : null
            }
         </div>
      </div>
   )
};

export default ViewEmployees;