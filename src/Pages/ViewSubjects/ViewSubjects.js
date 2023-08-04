import './ViewSubjects.css';

import { Button, ButtonWithIcon, TableTile } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

function ViewSubjects() {
   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [subjects, setSubjects] = useState([]);

   useEffect(
      () =>
         handlers.getSubjects(
            data => {
               const temp = [];
               for (const k of data) {
                  for (const n of k.subjects) {
                     temp.push(
                        {
                           id: n.id,
                           name: n.name,
                           maxMark: n.max_mark,
                           passMark: n.min_mark,
                           notes: n.notes,
                           grade: {
                              id: k.id,
                              name: k.name
                           }
                        }
                     );
                  }
               }
               setSubjects(temp);
               data.length ? setCurrent(1) : setCurrent(0);
            }
         ),
      []
   );
   useEffect(
      () => {
         setPrevious(current - 1);
         const next = current * 10 >= subjects.length ? 0 : current + 1;
         setNext(next);
         const start = (current - 1) * Math.floor(subjects.length / 10) * 10;
         const end = (current - 1) * Math.floor(subjects.length / 10) * 10 + 10;
         const temp = subjects.slice(start, end);
         while (temp.length < 10) temp.push({});
         setData(temp);
      },
      [current]
   );

   return (
      <div className='viewsubjects'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة مادة دراسية"
                  hook={() => handlers.goTo(handlers.ADDSUBJECT)}
                  src="Icons/add.svg"
               />
               <ButtonWithIcon
                  text="عرض المادة دراسية"
                  hook={() => (!!selected) ? handlers.goTo(handlers.VIEWSUBJECTDATA + selected) : alert("اختر مادة دراسية لعرض معلوماتها.")}
                  src="Icons/subject.svg"
               />
               {/*<ButtonWithIcon
                  text="حذف نموذج"
                  hook={() => { }}
                  src="Icons/delete.svg"
               />*/}
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
                     text="العلامة الكلية"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="علامة النجاح"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="ملاحظات"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="اسم الصف"
                     setSelected={() => { }}
                  />
                  <TableTile
                     selected={false}
                     id={-1}
                     className="headings"
                     text="معرّف الصف"
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
                                 text={e.name}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.maxMark}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.passMark}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.notes && e.notes.slice(0, 15) + " ....."}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.grade?.name}
                              />
                              <TableTile
                                 selected={selected === e.id}
                                 id={e.id}
                                 setSelected={setSelected}
                                 text={e.grade?.id}
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

export default ViewSubjects;