import { ListOfButtons, Multiple } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { ViewInterface } from '../../Interfaces';

function AddTeacherData() {
   const navigate = useNavigate();
   const { state: { empData, next: nextNav } } = useLocation();
   if (nextNav[0] !== handlers.ADDTEACHER) navigate(handlers.HOME);

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState([]);
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
                           },
                           subjects: k.subjects,
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

   const columns = useMemo(
      () => [
         {
            accessorKey: "accepted",
            header: 'اختيار',
            Cell: ({ renderedCellValue, row }) => {
               const id = row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue()
               row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue();
               return (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>
                        <Form.Check
                           type="checkbox"
                           className='ms-3'
                           style={{ scale: "1.5" }}
                           disabled={!id}
                           checked={
                              renderedCellValue ||
                              (!!selected.find(e => e.id == id))
                           }
                           onChange={e => {
                              if (e.target.checked) {
                                 setSelected([...selected, { id }]);
                              } else {
                                 setSelected(selected.filter(e => e.id != id));
                              }
                           }}
                        />
                     </span>
                  </Box>
               );
            },
         },
         {
            accessorKey: "grade",
            id: "gradeId",
            header: 'معرف الصف',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue?.id}</span>
               </Box>
            ),
         },
         {
            accessorKey: "grade",
            id: "gradeName",
            header: 'الصف',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue?.name}</span>
               </Box>
            ),
         },
         {
            accessorKey: "id",
            header: 'معرّف الشعبة',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue}</span>
               </Box>
            ),
         },
         {
            accessorKey: "name",
            header: 'اسم الشعبة',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue}</span>
               </Box>
            ),
         },
         {
            accessorKey: "subjects",
            header: 'المواد',
            Cell: ({ renderedCellValue, row }) => {
               const id = row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue();
               const checked = id ? !!selected.find(e => e.id == id) : false;
               return (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>
                        {
                           id &&
                           checked &&
                           <Multiple
                              id={"subjects" + id}
                              multiple={true}
                              noLabel={true}
                              text="المواد"
                              options={renderedCellValue ?? []}
                              value={selected.filter(e => e.id == id)[0]?.subjects ?? []}
                              hook={
                                 newValues => {
                                    setSelected(
                                       selected.map(e => {
                                          if (e.id == id) e.subjects = newValues;
                                          return e;
                                       }
                                       )
                                    );
                                 }
                              }
                           />
                        }
                     </span>
                  </Box>
               );
            },
         }
      ],
      [data, selected]
   );

   return (
      <ViewInterface
         control={
            <>
               <Form.Label>إنشاء حساب للاستاذ {empData.first_name}</Form.Label>
               <ListOfButtons
                  data={
                     [
                        {
                           name: "إتمام",
                           event: () => {
                              const temp = [];
                              for (const n of selected) {
                                 for (const k of n.subjects) {
                                    temp.find(e => e.subject_id == k) ?
                                       temp.find(e => e.subject_id == k).classes.push(n.id)
                                       : temp.push({ subject_id: k, classes: [n.id] });
                                 }
                              }
                              handlers.addTeacher(
                                 empData.id,
                                 temp,
                                 () => {
                                    nextNav.shift();
                                    if (nextNav.length) navigate(nextNav[0], { empData, nextNav });
                                    else navigate(handlers.HOME);
                                 }
                              );
                           }
                        }
                     ]
                  }
               />
            </>
         }
         view={
            <MaterialReactTable
               muiSelectCheckboxProps={{
                  sx: {
                     float: "inline-start"
                  }
               }}
               muiTableBodyProps={{
                  sx: {
                     '& tr.Mui-selected': {
                        backgroundColor: '#AFAFAF',
                     },
                     '& tr:nth-of-type(odd)': {
                        backgroundColor: '#f5f5f5',
                     },
                  },
               }}
               columns={columns}
               data={data}
               initialState={{ density: 'compact' }}
               enableRowSelection={false}
               enableMultiRowSelection={false}
               enableSorting={false}
               enablePinning={false}
               enableDensityToggle={false}
               enablePagination={false}
               enableFilters={false}
               enableTopToolbar={false}
               enableBottomToolbar={false}
               enableHiding={false}
               enableColumnActions={false}
            />
         }
         current={current}
         next={next}
         previous={previous}
         setCurrent={setCurrent}
      />
   )
};

export default AddTeacherData;