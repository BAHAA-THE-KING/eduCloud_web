import './ViewStudents.css';

import { Button, ButtonWithIcon, MultipletButton, TableTile, TextInput } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

function ViewStudents() {
   const [search, setSearch] = useState("%");
   const [searchKeyword, setSearchKeyword] = useState("");
   const [searchGrade, setSearchGrade] = useState("");
   const [searchClass, setSearchClass] = useState("");
   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);

   useEffect(
      () =>
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
               setAllClasses(res);
            }
         ),
      []
   );
   useEffect(
      () => {
         if (search === "") {
            setSearch("%");
            return;
         }
         handlers.getStudents(
            ("search=" + search) + ("&page=" + current) + ((!!searchGrade) ? ("&grade_id=" + searchGrade) : "") + ((!!searchClass) ? ("&class_id=" + searchClass) : ""),
            res => {
               const temp = res.current_page;
               setCurrent(temp);
               setNext(res.next_page_url ? temp + 1 : null);
               setPrevious(temp === 1 ? null : temp - 1);
               const data = res.data;
               while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
               setData(data);
            }
         );
      },
      [search, searchGrade, searchClass]
   );
   useEffect(
      () => { },
      [searchGrade]
   );

   return (
      <div className='viewstudents'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة طالب"
                  hook={() => handlers.goTo(handlers.ADDSTUDENT)}
                  src="Icons/personAdd.svg"
               />
               <ButtonWithIcon
                  text="عرض صفحة الطالب"
                  hook={() => (!!selected) ? handlers.goTo(handlers.VIEWSTUDENTDATA + selected) : alert("اختر طالباً لعرض معلوماته.")}
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
                  text="اختر الصف"
                  dontClose={true}
                  open={true}
                  options={grades}
                  dataHook={
                     (grade, select) => {
                        if (select) {
                           setSearchKeyword("");
                           setSearch("");
                           setSearchGrade(grade);
                           const temp = allClasses.filter(e => e.id === grade)[0].g_classes;
                           setClasses(temp);
                        } else {
                           setSearchGrade("");
                           setSearchClass("");
                           setClasses([]);
                        }
                     }
                  }
                  textHook={() => { }}
               />
               <MultipletButton
                  text="اختر الشعبة"
                  dontClose={true}
                  open={true}
                  options={classes}
                  dataHook={
                     (theclass, select) => {
                        if (select) {
                           setSearchKeyword("");
                           setSearch("");
                           setSearchClass(theclass);
                        } else {
                           setSearchClass("");
                        }
                     }
                  }
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
                     text="الشعبة"
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
                     text="اسم الأب"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="اسم الأم"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="تاريخ الولادة"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="السكن"
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
                                 text={e.g_class_id}
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
                                 text={e.father_name}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.mother_name}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.birth_date}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.place_of_living??"asd"}
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
                        handlers.getStudents(
                           ("search=" + search) + ("&page=" + previous) + ((!!searchGrade) ? ("&grade_id=" + searchGrade) : "") + ((!!searchClass) ? ("&class_id=" + searchClass) : ""),
                           res => {
                              const temp = res.current_page;
                              setCurrent(temp);
                              setNext(res.next_page_url ? temp + 1 : null);
                              setPrevious(temp === 1 ? null : temp - 1);
                              const data = res.data;
                              while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
                              setData(data);
                           }
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
                        handlers.getStudents(
                           ("search=" + search) + ("&page=" + next) + ((!!searchGrade) ? ("&grade_id=" + searchGrade) : "") + ((!!searchClass) ? ("&class_id=" + searchClass) : ""),
                           res => {
                              const temp = res.current_page;
                              setCurrent(temp);
                              setNext(res.next_page_url ? temp + 1 : null);
                              setPrevious(temp === 1 ? null : temp - 1);
                              const data = res.data;
                              while (data.length < res.per_page) data.push({ id: "", first_name: "", last_name: "", roles: [] });
                              setData(data);
                           }
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

export default ViewStudents;