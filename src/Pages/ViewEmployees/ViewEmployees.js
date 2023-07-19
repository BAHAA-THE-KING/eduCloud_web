import './ViewEmployees.css';

import { Button, ButtonWithIcon } from '../../components';
import { useEffect, useState } from 'react';
import * as handlers from "../../handlers";

function ViewEmployees() {
   useEffect(
      () => {
         handlers.getEmployees(
            (res) => {
               setCurrent(res.current_page);
               setNext(res.next_page_url);
               setPrevious(res.prev_page_url);
               setData(res.data);
            },
            "%"
         );
      },
      []
   );

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([]);

   return (
      <div className='viewemployees'>
         <div className='content'>
            <div className='control'>
               <ButtonWithIcon
                  text="إضافة موظف"
                  hook={() => handlers.goTo(handlers.ADDEMPLOYEE)}
                  src="../Icons/personAdd.svg"
               />
               <ButtonWithIcon
                  text="تعديل معلومات الموظفين"
                  hook={() => { }}
                  src="../Icons/person.svg"
               />
               <ButtonWithIcon
                  text="حذف موظفين"
                  hook={() => { }}
                  src="../Icons/delete.svg"
               />
            </div>
            <div className='show'>
               <div className='view'>
                  <div className="headings">
                     <span>
                        المعرف
                     </span>
                  </div>
                  <div className="headings">
                     <span>
                        الاسم
                     </span>
                  </div>
                  <div className="headings">
                     <span>
                        الكنية
                     </span>
                  </div>
                  <div className="headings">
                     <span>
                        الأدوار
                     </span>
                  </div>
                  {
                     data.map(
                        (e, i) => (
                           <>
                              <div key={4 * i + 0}>
                                 <span>
                                    {e.id}
                                 </span>
                              </div>
                              <div key={4 * i + 1}>
                                 <span>
                                    {e.first_name}
                                 </span>
                              </div>
                              <div key={4 * i + 2}>
                                 <span>
                                    {e.last_name}
                                 </span>
                              </div>
                              <div key={4 * i + 3}>
                                 <span>
                                    {e.id}
                                 </span>
                              </div>
                           </>
                        )
                     ).flat(Infinity)
                  }
               </div>
            </div>
         </div>
         <div className='navigation'>
            <Button
               text="<   السابق"
               hook={
                  () =>
                     handlers.getEmployees(
                        (res) => {
                           setCurrent(res.current_page);
                           setNext(res.next_page_url);
                           setPrevious(res.prev_page_url);
                           setData(res.data);
                        },
                        previous.slice(52)
                     )
               }
               disabled={!previous}
            />
            <Button
               text={current}
               hook={() => { }}
            />
            <Button
               text="التالي   >"
               hook={
                  () =>
                     handlers.getEmployees(
                        (res) => {
                           setCurrent(res.current_page);
                           setNext(res.next_page_url);
                           setPrevious(res.prev_page_url);
                           setData(res.data);
                        },
                        next.slice(52)
                     )
               }
               disabled={!next}
            />
         </div>
      </div>
   )
};

export default ViewEmployees;