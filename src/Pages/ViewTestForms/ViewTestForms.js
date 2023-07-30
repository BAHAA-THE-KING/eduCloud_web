import './ViewTestForms.css';

import { Button, ButtonWithIcon, TableTile } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

function ViewTestForms() {
   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [testForms, setTestForms] = useState([]);

   useEffect(
      () =>
         handlers.getTestForms(
            data => {
               setTestForms(data.map(e => { return { id: e.id, name: e.name }; }));
               data.length ? setCurrent(1) : setCurrent(0);
            }
         ),
      []
   );
   useEffect(
      () => {
         setPrevious(current - 1);
         const next = current * 10 >= testForms.length ? 0 : current + 1;
         setNext(next);
         const start = (current - 1) * Math.floor(testForms.length / 10) * 10;
         const end = (current - 1) * Math.floor(testForms.length / 10) * 10 + 10;
         const temp = testForms.slice(start, end);
         while (temp.length < 10) temp.push({});
         setData(temp);
      },
      [current]
   );

   return (
      <div className='viewtestforms'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة نموذج اختبار"
                  hook={() => handlers.goTo(handlers.ADDTESTFORM)}
                  src="Icons/add.svg"
               />
               <ButtonWithIcon
                  text="عرض صفحة نموذج"
                  hook={() => (!!selected) ? handlers.goTo(handlers.VIEWTESTFORMDATA + selected) : alert("اختر نموذجاً لعرض معلوماته.")}
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

export default ViewTestForms;