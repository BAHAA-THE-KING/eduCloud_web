import './SelectStudents.css';

import { Button, ButtonWithIcon, MultipletButton, MultipletInput, TableTile, TextInput } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';

function SelectStudents() {
   const navigate = useNavigate();

   const [search, setSearch] = useState("%");
   const [tempSearch, setTempSearch] = useState("");
   const [searchGrade, setSearchGrade] = useState("");

   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [selectedStudents, setSelectedStudents] = useState([]);
   const [selectedClasses, setSelectedClasses] = useState([]);
   const [sortType, setSortType] = useState("");

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);

   useEffect(
      () => {
         setSelectedStudents([]);
      },
      [searchGrade]
   );

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
         if (searchGrade === "") {
            setData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
            setPrevious(0);
            setNext(0);
            setCurrent(1);
            return;
         }
         if (search === "") {
            setSearch("%");
            return;
         }
         handlers.getStudents(
            search,
            current,
            searchGrade,
            "",
            false,
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
      [current, search, searchGrade]
   );

   return (
      <div className={'selectstudents'}>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="متابعة"
                  hook={
                     () => {
                        if (sortType === "") return alert("اختر طريقة الترتيب.");
                        if (!selectedStudents.length) return alert("اختر طلاباً لتوزيعهم.");
                        if (!selectedClasses.length) return alert("اختر شعباً ليتم التوزيع عليها.");
                        if (sortType === "manual") {
                           return navigate(
                              handlers.DISTRIBUTESTUDENTS,
                              {
                                 state: {
                                    grade: grades.filter(e => e.id == searchGrade)[0],
                                    students: selectedStudents,
                                    classes: selectedClasses.map(e => { return classes.find((ee) => ee.id == e); }),
                                    selection: {}
                                 }
                              }
                           );
                        }
                        handlers.addStudentsToClassesAutomatically(
                           selectedStudents.map(e => e.id),
                           selectedClasses,
                           sortType,
                           res => {
                              const temp = {};
                              for (const n of res.classes) {
                                 const classId = n.id;
                                 for (const k of n.newStudents) {
                                    temp[k.id] = classId;
                                 }
                              }
                              navigate(
                                 handlers.DISTRIBUTESTUDENTS,
                                 {
                                    state: {
                                       grade: grades.filter(e => e.id == searchGrade)[0],
                                       students: selectedStudents,
                                       classes: selectedClasses.map(e => { return classes.find((ee) => ee.id == e); }),
                                       selection: temp
                                    }
                                 }
                              );
                           }
                        );
                     }
                  }
                  src="Icons/person.svg"
               />
               <MultipletButton
                  text="اختر التوزيع على الشعب"
                  open={true}
                  options={[{ id: "alphabeticPriority", name: "تدريجي" }, { id: "even", name: "متقارب" }, { id: "manual", name: "يدوي" }]}
                  dataHook={
                     (type, select) => {
                        if (select) {
                           setSortType(type);
                        } else {
                           setSortType("");
                        }
                     }
                  }
                  textHook={() => { }}
               />
               <label>عوامل التصفية :</label>
               <TextInput defaultValue={tempSearch} hint="البحث" inputHook={setTempSearch} enterHook={setSearch} />
               <MultipletButton
                  text="اختر الصف"
                  open={true}
                  options={grades}
                  dataHook={
                     (grade, select) => {
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
               <MultipletInput
                  text="اختر الشعبة"
                  open={true}
                  currentData={selectedClasses}
                  options={classes}
                  dataHook={setSelectedClasses}
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
                     text="الصف"
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
                     text="العنوان"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="قبول"
                     setSelected={() => { }}
                  />
                  {
                     data.map(
                        (e) => (
                           <React.Fragment>
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.id}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.grade_id}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.first_name}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.last_name}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.father_name}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.mother_name}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.birth_date}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.address_id}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 className="check"
                                 setSelected={setSelected}
                                 text={
                                    e.id &&
                                    <input
                                       type='checkbox'
                                       onChange={
                                          eee => {
                                             if (eee.target.checked) {
                                                setSelectedStudents([...selectedStudents, e]);
                                             } else {
                                                console.log(selectedStudents.filter(ee => ee.id != e.id))
                                                setSelectedStudents(selectedStudents.filter(ee => ee.id != e.id));
                                             }
                                          }
                                       }
                                       checked={selectedStudents.find((ee) => ee.id == e.id)}
                                    />
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
            <Button
               text="<   السابق"
               className="previous"
               hook={
                  () => setCurrent(current - 1)
               }
               disabled={!previous}
            />
            <Button
               text={current}
               hook={() => { }}
               className={"current"}
            />
            <Button
               text="التالي   >"
               className="next"
               hook={
                  () => setCurrent(current + 1)
               }
               disabled={!next}
            />
         </div>
      </div>
   )
};

export default SelectStudents;