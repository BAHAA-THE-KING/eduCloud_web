import './ViewMarks.css';

import { Button, ButtonWithIcon, MultipletButton, TableTile } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';

function ViewMarks() {
   const navigate = useNavigate();

   const [searchGrade, setSearchGrade] = useState("");
   const [searchClass, setSearchClass] = useState("");
   const [searchSubject, setSearchSubject] = useState("");
   const [searchType, setSearchType] = useState("");
   const [test, setTest] = useState();

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState([]);
   const [selected, setSelected] = useState(-1);
   const [selectedValue, setSelectedValue] = useState("");

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [types, setTypes] = useState([]);
   const [tests, setTests] = useState([]);

   const [all, setAll] = useState(true);
   const [marks, setMarks] = useState({});

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
               setTypes(res);
            }
         );
      },
      []
   );

   useEffect(
      () => {
         handlers.getTests(
            "",
            "",
            searchType,
            searchSubject,
            searchClass,
            "",
            "",
            res => {
               setTests(res.map(e => { e.name = e.title; return e; }));
            }
         );
      },
      [searchClass, searchSubject, searchType]
   );

   useEffect(
      () => {
         setPrevious(current - 1);
         const next = current * 10 >= allData.length ? 0 : current + 1;
         setNext(next);
         const start = (current - 1) * Math.floor(allData.length / 10) * 10;
         const end = (current - 1) * Math.floor(allData.length / 10) * 10 + 10;
         const temp = allData.slice(start, end);
         while (temp.length < 10) temp.push({});
         setData(temp);
      },
      [current, allData]
   );

   useEffect(
      () => {
         if (!test) return;
         setData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
         if (all)
            handlers.getMarks(
               test,
               res => {
                  const temp = res.map(e => { return { ...e.student, mark: e.mark, editId: e.id }; });
                  setAllData(temp);
                  setCurrent(1);
               }
            );
         else
            handlers.getRemainingStudents(
               test,
               res => {
                  setAllData(res);
                  setCurrent(1);
               }
            );
      },
      [all, test]
   );

   useEffect(
      () => {
         setMarks({});
      },
      [searchGrade, searchClass, searchSubject, searchType]
   );

   useEffect(
      () => {
         setTest();
      },
      [searchGrade, searchClass, searchSubject, searchType]
   );

   useEffect(
      () => {
         setSearchClass("");
         setSearchSubject("");
         if (!!searchGrade) {
            setClasses(allClasses.filter(e => e.id === searchGrade)[0].g_classes);
            setSubjects(allClasses.filter(e => e.id === searchGrade)[0].subjects);
         } else {
            setClasses([]);
            setSubjects([]);
         }
      },
      [searchGrade]
   );

   return (
      <div className='viewmarks'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إدخال"
                  hook={
                     () => {
                        let temp = [...allData];
                        const temp1 = Object.entries(marks)
                           .map(
                              e => {
                                 if ((e[1] ?? -1) === -1)
                                    return undefined;
                                 temp = temp.filter(ee => ee.id != e[0]);
                                 setCurrent(1);
                                 return {
                                    "student_id": e[0],
                                    "mark": e[1]
                                 };
                              }
                           )
                           .filter(e => e);
                        handlers.addMarks(
                           test,
                           temp1,
                           () => {
                              setAllData(temp);
                           }
                        );
                     }
                  }
                  src="Icons/subject.svg"
               />
               <ButtonWithIcon
                  text="إضافة سبر"
                  hook={() => navigate(handlers.ADDTEST)}
                  src="Icons/add.svg"
               />
               <ButtonWithIcon
                  text={all ? "عرض العلامات الناقصة" : "عرض كل الطلاب"}
                  hook={() => setAll(!all)}
                  src="Icons/add.svg"
               />
               <ButtonWithIcon
                  text="عرض صفحة السبر"
                  hook={() => (!!selected) ? navigate(handlers.VIEWTESTDATA + test) : alert("اختر سبراً لعرض معلوماته.")}
                  src="Icons/subject.svg"
               />
               <label>عوامل التصفية :</label>
               <MultipletButton
                  text="اختر الصف"
                  open={true}
                  options={grades}
                  dataHook={
                     (grade, select) => {
                        if (select) {
                           setSearchGrade(grade);
                        } else {
                           setSearchGrade("");
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
                        if (select) {
                           setSearchClass(theclass);
                        } else {
                           setSearchClass("");
                        }
                     }
                  }
                  textHook={() => { }}
               />
               <MultipletButton
                  text="اختر المادة"
                  open={true}
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
                  textHook={() => { }}
               />
               <MultipletButton
                  text="اختر النوع"
                  open={true}
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
                  textHook={() => { }}
               />
               <MultipletButton
                  text="اختر الاختبار"
                  open={true}
                  options={tests}
                  dataHook={
                     (test, select) => {
                        if (select) {
                           setTest(test);
                        } else {
                           setTest("");
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
                     text="العلامة"
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
                                 editable={(!all || selected == e.id) && !!test && !!e.id}
                                 text={all ? (selected == e.id ? selectedValue : e.mark) : (marks[e.id] ?? "")}
                                 inputHook={
                                    text => {
                                       all ?
                                          setSelectedValue(text)
                                          : (!!text) ?
                                             setMarks({ ...marks, [e.id]: text })
                                             : setMarks({ ...marks, [e.id]: undefined })
                                    }
                                 }
                                 enterHook={
                                    value => {
                                       all &&
                                          handlers.editMark(
                                             e.editId,
                                             value,
                                             () => {
                                                setAllData(
                                                   allData.map(
                                                      ee => {
                                                         if (ee.id === e.id) ee.mark = selectedValue;
                                                         return ee;
                                                      }
                                                   )
                                                );
                                                setSelected(-1);
                                                setSelectedValue("");
                                             });
                                    }
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
                     () => setCurrent(current - 1)
                  }
                  disabled={previous < 1}
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
         </div>
      </div>
   )
};

export default ViewMarks;