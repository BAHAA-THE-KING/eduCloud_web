import './ViewClasses.css';

import { Button, ButtonWithIcon, TableTile } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

function ViewClasses() {
   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [classes, setClasses] = useState([]);

   useEffect(
      () =>
         handlers.getSubjects(
            data => {
               const temp = [];
               for (const k of data) {
                  for (const n of k.g_classes) {
                     temp.push(
                        {
                           id: n.id,
                           name: n.name,
                           maxNum: n.max_number,
                           grade: {
                              id: k.id,
                              name: k.name
                           }
                        }
                     );
                  }
               }
               setClasses(temp);
               data.length ? setCurrent(1) : setCurrent(0);
            }
         ),
      []
   );
   useEffect(
      () => {
         setPrevious(current - 1);
         const next = current * 10 >= classes.length ? 0 : current + 1;
         setNext(next);
         const start = (current - 1) * Math.floor(classes.length / 10) * 10;
         const end = (current - 1) * Math.floor(classes.length / 10) * 10 + 10;
         const temp = classes.slice(start, end);
         while (temp.length < 10) temp.push({});
         setData(temp);
      },
      [current]
   );

   return (
      <div className='viewclasses'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة شعبة"
                  hook={() => handlers.goTo(handlers.ADDTESTFORM)}
                  src="Icons/add.svg"
               />
               <ButtonWithIcon
                  text="عرض شعبة"
                  hook={() => (!!selected) ? handlers.goTo(handlers.VIEWCLASSDATA + selected) : alert("اختر شعبة لعرض معلوماتها.")}
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
                     text="العدد الأقصى للطلاب"
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
                                 text={e.maxNum}
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

export default ViewClasses;