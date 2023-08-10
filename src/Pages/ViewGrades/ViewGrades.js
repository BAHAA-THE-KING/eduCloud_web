import './ViewGrades.css';

import { Button, ButtonWithIcon, TableTile } from '../../components';
import React, { useEffect, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';

function ViewGrades() {
   const navigate = useNavigate();

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [grades, setGrades] = useState([]);

   useEffect(
      () =>
         handlers.getGrades(
            data => {
               setGrades(data.map(e => { return { id: e.id, name: e.name }; }));
               data.length ? setCurrent(1) : setCurrent(0);
            }
         ),
      []
   );
   useEffect(
      () => {
         setPrevious(current - 1);
         const next = current * 10 >= grades.length ? 0 : current + 1;
         setNext(next);
         const start = (current - 1) * Math.floor(grades.length / 10) * 10;
         const end = (current - 1) * Math.floor(grades.length / 10) * 10 + 10;
         const temp = grades.slice(start, end);
         while (temp.length < 10) temp.push({});
         setData(temp);
      },
      [current]
   );

   return (
      <div className='viewgrades'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة صف"
                  hook={() => navigate(handlers.ADDGRADE)}
                  src="Icons/add.svg"
               />
               <ButtonWithIcon
                  text="عرض الصف"
                  hook={() => (!!selected) ? navigate(handlers.VIEWGRADEDATA + selected) : alert("اختر صفاً لعرض معلوماته.")}
                  src="Icons/subject.svg"
               />
               <ButtonWithIcon
                  text="عرض الشعب"
                  hook={() => navigate(handlers.VIEWCLASSES)}
                  src="Icons/subject.svg"
               />
               <ButtonWithIcon
                  text="عرض المواد"
                  hook={() => navigate(handlers.VIEWSUBJECTS)}
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
                     text="اسم الصف"
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

export default ViewGrades;