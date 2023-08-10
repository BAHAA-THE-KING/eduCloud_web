import './ViewTests.css';

import { Button, ButtonWithIcon, MultipletButton, TableTile, TextInput } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';

function ViewTests() {
   const navigate = useNavigate();

   const [search, setSearch] = useState("%");
   const [searchKeyword, setSearchKeyword] = useState("");
   const [searchClass, setSearchClass] = useState("");
   const [searchSubject, setSearchSubject] = useState("");
   const [searchStartDate, setSearchStartDate] = useState("");
   const [searchEndDate, setSearchEndDate] = useState("");
   const [searchType, setSearchType] = useState("");

   const [searchGradeName, setSearchGradeName] = useState("");
   const [subjectName, setSubjectName] = useState("");
   const [theClassName, setTheClassName] = useState("");
   const [typeName, setTypeName] = useState("");


   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);

   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

   const [selected, setSelected] = useState(-1);

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [types, setSearchTypes] = useState([]);

   useEffect(
      () => {
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
               setAllClasses(res);
            }
         );
         handlers.getTestForms(
            res => {
               setSearchTypes(res);
            }
         );
      },
      []
   );
   useEffect(
      () => {
         if (search === "") {
            setSearch("%");
            return;
         }
         handlers.getTests(
            current,
            search,
            searchType,
            searchSubject,
            searchClass,
            searchStartDate,
            searchEndDate,
            res => {
               const temp = res.current_page;
               setCurrent(temp);
               setNext(res.next_page_url ? temp + 1 : null);
               setPrevious(temp === 1 ? null : temp - 1);
               const data = res.data;
               while (data.length < res.per_page) data.push({ id: "" });
               setData(data);
            }
         );
      },
      [search, searchClass, searchType, searchSubject, searchStartDate, searchEndDate]
   );

   return (
      <div className={'viewtests'}>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة اختبار"
                  hook={() => navigate(handlers.ADDTEST)}
                  src="Icons/add.svg"
               />
               <ButtonWithIcon
                  text="عرض صفحة اختبار"
                  hook={() => (!!selected && selected !== -1) ? navigate(handlers.VIEWTESTDATA + selected) : alert("اختر اختباراً لعرض معلوماته.")}
                  src="Icons/subject.svg"
               />
               <ButtonWithIcon
                  text="عرض أنواع الاختبارات"
                  hook={() => navigate(handlers.VIEWTESTFORMS)}
                  src="Icons/subject.svg"
               />
               <label>عوامل التصفية :</label>
               <TextInput defaultValue={searchKeyword} hint="بحث" inputHook={setSearchKeyword} enterHook={setSearch} />
               <br />
               <label>{"النوع :" + typeName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر النوع"
                  options={types}
                  dataHook={
                     (type, select) => {
                        if (select) {
                           setSearchType(type);
                        } else {
                           setSearchType("");
                        }
                     }
                  }
                  textHook={type => setTypeName(type)}
               />
               <br />

               <label>{"الصف :" + searchGradeName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر الصف"
                  options={grades}
                  dataHook={
                     (grade, select) => {
                        setSearchClass("");
                        setTheClassName("");
                        setSearchSubject("");
                        setSubjectName("");
                        if (select) {
                           const temp = allClasses.filter(e => e.id === grade)[0].g_classes;
                           setClasses(temp);
                           const temp2 = allClasses.filter(e => e.id === grade)[0].subjects;
                           setSubjects(temp2);
                        } else {
                           setClasses([]);
                           setSubjects([]);
                        }
                     }
                  }
                  textHook={
                     (grade, select) => {
                        if (select) {
                           setSearchGradeName(grade);
                        } else {
                           setSearchGradeName("");
                        }
                     }
                  }
               />
               <br />
               <label>{"الشعبة :" + theClassName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر الشعبة"
                  options={classes}
                  dataHook={
                     (theclass, select) => {
                        if (select) {
                           setSearchClass(theclass);
                        } else {
                           setSearchClass("");
                        }
                     }
                  }
                  textHook={theClass => setTheClassName(theClass)}
               />
               <br />
               <label>{"المادة :" + subjectName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر المادة"
                  options={subjects}
                  dataHook={
                     (subject, select) => {
                        if (select) {
                           setSearchSubject(subject);
                        } else {
                           setSearchSubject("");
                        }
                     }
                  }
                  textHook={subject => setSubjectName(subject)}
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
                     text="العنوان"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="النوع"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="المادة"
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
                     text="التاريخ"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="العلامة العظمى"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="علامة النجاح"
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
                                 text={e.title}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.type_id}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.subject_id}
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
                                 text={e.date}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.max_mark}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.min_mark}
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
                        handlers.getTests(
                           previous,
                           search,
                           searchType,
                           searchSubject,
                           searchClass,
                           searchStartDate,
                           searchEndDate,
                           res => {
                              const temp = res.current_page;
                              setCurrent(temp);
                              setNext(res.next_page_url ? temp + 1 : null);
                              setPrevious(temp === 1 ? null : temp - 1);
                              const data = res.data;
                              while (data.length < res.per_page) data.push({ id: "" });
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
                        handlers.getTests(
                           next,
                           search,
                           searchType,
                           searchSubject,
                           searchClass,
                           searchStartDate,
                           searchEndDate,
                           res => {
                              const temp = res.current_page;
                              setCurrent(temp);
                              setNext(res.next_page_url ? temp + 1 : null);
                              setPrevious(temp === 1 ? null : temp - 1);
                              const data = res.data;
                              while (data.length < res.per_page) data.push({ id: "" });
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

export default ViewTests;