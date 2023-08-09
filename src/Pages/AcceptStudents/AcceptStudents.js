import './AcceptStudents.css';

import { Button, ButtonWithIcon, MultipletButton, TableTile, TextInput } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

function AcceptStudents() {
   const [searchGrade, setSearchGrade] = useState();
   const [minNum, setMinNum] = useState(100);
   const [tempMinNum, setTempMinNum] = useState();

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState([]);

   const [selected, setSelected] = useState(-1);
   const [selectedStudents, setSelectedStudents] = useState([]);

   const [grades, setGrades] = useState([]);

   useEffect(
      () =>
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
            }
         ),
      []
   );

   useEffect(
      () => {
         if (!searchGrade) return;
         handlers.getCandidateToOfficial(
            searchGrade,
            100,
            res => {
               setAllData(res);
               const temp = res.filter(e => e.succeeded === true).map(e => e.id);
               setSelectedStudents([...temp]);
               setCurrent(1);
               setMinNum(100);
            }
         );
      },
      [searchGrade]
   );

   useEffect(
      () => {
         if (!searchGrade) return;
         handlers.getCandidateToOfficial(
            searchGrade,
            minNum,
            res => {
               setAllData(res);
               const temp = res.filter(e => e.succeeded === true).map(e => e.id);
               setSelectedStudents([...temp]);
               setCurrent(1);
            }
         );
      },
      [minNum]
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

   return (
      <div className={'viewacceptedstudents'}>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="متابعة"
                  hook={
                     () => {
                        handlers.addCandidateToOfficial(
                           searchGrade,
                           selectedStudents,
                           () => {
                              handlers.goTo(handlers.DISTRIBUTESTUDENTS);
                           }
                        );
                     }
                  }
                  src="Icons/person.svg"
               />
               <label>عوامل التصفية :</label>
               <TextInput defaultValue={tempMinNum} hint="أقل عدد للطلاب الناجحين" inputHook={setTempMinNum} enterHook={setMinNum} />
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
                     text="نسبة النجاح"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="اجتاز"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="أخفق"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="لم توضع علامة"
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
                                 text={e.acceptance_rate}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.succeeded_in ? (e.succeeded_in.length > 0 ? e.succeeded_in.join(",") + "." : "") : ""}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.full_name}
                              />
                              <TableTile
                                 selected={selected == e.id && selected != null}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.full_name}
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
                                          () => {
                                             if (selectedStudents.indexOf(e.id) === -1) {
                                                setSelectedStudents([...selectedStudents, e.id]);
                                             } else {
                                                setSelectedStudents(selectedStudents.filter(ee => ee != e.id));
                                             }
                                          }
                                       }
                                       checked={selectedStudents.indexOf(e.id) !== -1}
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
               disabled={previous < 1}
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

export default AcceptStudents;