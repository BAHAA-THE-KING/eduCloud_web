import './ViewEmployees.css';

import { Button, ButtonWithIcon, MultipletButton, TableTile, TextInput } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

function ViewEmployees() {
   const [search, setSearch] = useState("%");
   const [searchKeyword, setSearchKeyword] = useState("");
   const [searchRole, setSearchRole] = useState("");
   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
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
               const temp = res.current_page;
               setCurrent(temp);
               setNext(res.next_page_url ? temp + 1 : null);
               setPrevious(temp === 1 ? null : temp - 1);
               const data = res.data;
               while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
               setData(data);
            },
            search + ("?page=" + current) + (searchRole ? "&role=" + searchRole : "")
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
                  src="Icons/personAdd.svg"
               />
               <ButtonWithIcon
                  text="عرض صفحة الموظف"
                  hook={() => (!!selected) ? handlers.goTo(handlers.VIEWEMPLOYEEDATA + selected) : alert("اختر موظفاً لعرض معلوماته.")}
                  src="Icons/person.svg"
               />
               {/*<ButtonWithIcon
                  text="حذف موظفين"
                  hook={() => { }}
                  src="Icons/delete.svg"
               />*/}
               <label>عوامل التصفية :</label>
               <TextInput defaultValue={searchKeyword} hint="بحث" inputHook={setSearchKeyword} enterHook={setSearch} />
               <MultipletButton
                  text="اختر الدور"
                  dontClose={true}
                  open={true}
                  options={roles}
                  dataHook={(role, select) => (select) ? setSearchRole(role) : setSearchRole("")}
                  textHook={() => { }}
               />
            </div>
            <div className='show'>
               <div className='view'>
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="المعرّف"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="الاسم"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="الكنية"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="الأدوار"
                     setSelected={() => { }}
                  />
                  {
                     data.map(
                        (e) => (
                           <React.Fragment>
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.id}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.first_name}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.last_name}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={
                                    (!!e.id) ?
                                       (
                                          (e.roles.length !== 0) ?
                                             e.roles.map(e => e.name).join(",")
                                             : <i style={{ color: "#888888" }}>لا يوجد أدوار لهذا الموظف.</i>
                                       )
                                       : ""
                                 }
                              />
                           </React.Fragment>
                        )
                     )
                  }
               </div>
            </div>
         </div>
         <div className='navigation'>
            {
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
                              const temp = res.current_page;
                              setCurrent(temp);
                              setNext(res.next_page_url ? temp + 1 : null);
                              setPrevious(temp === 1 ? null : temp - 1);
                              const data = res.data;
                              while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
                              setData(data);
                           },
                           search + ("?page=" + previous) + (searchRole ? "&role=" + searchRole : "")
                        );
                     }
                  }
                  disabled={!previous}
               />
            }
            <Button
               text={current}
               hook={() => { }}
               className={"current"}
            />
            {
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
                              const temp = res.current_page;
                              setCurrent(temp);
                              setNext(res.next_page_url ? temp + 1 : null);
                              setPrevious(temp === 1 ? null : temp - 1);
                              const data = res.data;
                              while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
                              setData(data);
                           },
                           search + ("?page=" + next) + (searchRole ? "&role=" + searchRole : "")
                        );
                     }
                  }
                  disabled={!next}
               />
            }
         </div>
      </div>
   )
};

export default ViewEmployees;