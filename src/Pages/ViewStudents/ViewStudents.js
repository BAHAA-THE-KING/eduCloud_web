import './ViewStudents.css';

import { Button, ButtonWithIcon, MultipletButton, TableTile, TextInput } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';

function ViewStudents() {
   const navigate = useNavigate();

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

   const [addAbsents, setAddAbsents] = useState(false);
   const [absents, setAbsents] = useState({});

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
            search,
            current,
            searchGrade,
            searchClass,
            true,
            res => {
               const temp = res.current_page;
               setCurrent(temp);
               setNext(res.next_page_url ? temp + 1 : null);
               setPrevious(temp === 1 ? null : temp - 1);
               const data = res.data;
               while (data.length < res.per_page) data.push({});
               setData(data);
            }
         );
      },
      [search, searchGrade, searchClass]
   );

   return (
      <div className={'viewstudents' + (addAbsents ? " editing" : "")}>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="تسجيل طالب"
                  hook={() => navigate(handlers.ADDSTUDENT)}
                  src="Icons/personAdd.svg"
               />
               <ButtonWithIcon
                  text="عرض صفحة الطالب"
                  hook={() => (!!selected) ? navigate(handlers.VIEWSTUDENTDATA + selected) : alert("اختر طالباً لعرض معلوماته.")}
                  src="Icons/person.svg"
               />
               <ButtonWithIcon
                  text="قبول الطلاب"
                  hook={() => navigate(handlers.ACCEPTSTUDENTS)}
                  src="Icons/person.svg"
               />
               <label>عوامل التصفية :</label>
               <TextInput defaultValue={searchKeyword} hint="بحث" inputHook={setSearchKeyword} enterHook={setSearch} />
               <MultipletButton
                  text="اختر الصف"
                  open={true}
                  options={grades}
                  dataHook={
                     (grade, select) => {
                        setAbsents({});
                        setAddAbsents(false);
                        setSearchClass("");
                        setSearchKeyword("");
                        setSearch("");
                        if (select) {
                           setSearchGrade(grade);
                           const temp = allClasses.filter(e => e.id === grade)[0].g_classes;
                           setClasses(temp);
                        } else {
                           setSearchGrade("");
                           setClasses([]);
                        }
                     }
                  }
                  textHook={() => { }}
               />
               <MultipletButton
                  text="اختر الشعبة"
                  open={true}
                  options={classes}
                  dataHook={
                     (theclass, select) => {
                        setAbsents({});
                        setAddAbsents(false);
                        setSearchKeyword("");
                        setSearch("");
                        if (select) {
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
                     addAbsents &&
                     <TableTile
                        selected={false}
                        id={-1}
                        className="headings"
                        text="الغياب"
                        setSelected={() => { }}
                     />
                  }
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
                                 text={e.address_id}
                              />
                              {
                                 addAbsents &&
                                 <TableTile
                                    selected={selected === e.id}
                                    id={e.id}
                                    className="check"
                                    setSelected={setSelected}
                                    text={
                                       e.id &&
                                       <input
                                          type='checkbox'
                                          onChange={
                                             () => {
                                                if (absents[e.id] === undefined) {
                                                   setAbsents(
                                                      {
                                                         ...absents,
                                                         [e.id]: "none"
                                                      }
                                                   );
                                                } else {
                                                   setAbsents(
                                                      {
                                                         ...absents,
                                                         [e.id]: undefined
                                                      }
                                                   );
                                                }
                                             }
                                          }
                                          checked={!!absents[e.id]}
                                       />
                                    }
                                 />
                              }
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
                     () => setCurrent(current - 1)
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
                     () => setCurrent(current + 1)
                  }
                  disabled={!next}
               />
            }
            <Button
               disabled={searchClass === ""}
               text={addAbsents ? "تسجيل" : "إدخال الغيابات"}
               className="addabsents"
               hook={
                  () => {
                     if (searchClass === "") {
                        alert("اختر شعبة لإدخال غياباتها.");
                        return;
                     }
                     if (addAbsents) {
                        const temp = [];
                        for (const k in absents) {
                           absents[k] && temp.push({ student_id: k, justification: absents[k] });
                        }
                        handlers.addAbsents(
                           searchClass,
                           temp,
                           () => {
                              setAddAbsents(false);
                              setAbsents({});
                           }
                        );
                     } else {
                        setAddAbsents(true);
                        setAbsents({});
                     }
                  }
               }
            />
         </div>
      </div>
   )
};

export default ViewStudents;