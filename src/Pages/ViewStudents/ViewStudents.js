import { InputWithLabel, ListOfButtons, Multiple } from '../../components';
import React, { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { ViewInterface } from '../../Interfaces';

function ViewStudents() {
   const navigate = useNavigate();

   const [search, setSearch] = useState("%");
   const [tempSearch, setTempSearch] = useState("");
   const [searchGrade, setSearchGrade] = useState("");
   const [searchClass, setSearchClass] = useState("");

   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState();

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);

   const [addAbsents, setAddAbsents] = useState(false);
   const [absents, setAbsents] = useState({});

   console.log(selected);

   useEffect(
      () =>
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
               setAllClasses(res.map(e => e.g_classes).flat());
            }
         ),
      []
   );

   useEffect(
      () => {
         if (search === "") {
            setSearch("%");
            return;
         }
         handlers.getStudents(
            search,
            current,
            searchGrade,
            searchClass,
            true,
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
      [search, searchGrade, searchClass, current]
   );

   useEffect(
      () => {
         setAbsents({});
         setAddAbsents(false);
      },
      [searchGrade, searchClass]
   );

   useEffect(
      () => {
         setSearchClass("");
         if (!searchGrade) return;
         const temp = allClasses.filter(e => e.grade_id === searchGrade);
         setClasses(temp);
      },
      [searchGrade]
   );

   const columns = useMemo(
      () => {
         const columns = [
            {
               accessorFn: e => e.id,
               key: "select",
               header: "اختيار",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>
                        <InputWithLabel
                           id={"select " + renderedCellValue}
                           type="radio"
                           name="select"
                           disabled={!renderedCellValue}
                           noLabel={true}
                           value={renderedCellValue === selected}
                           hook={() => setSelected(renderedCellValue)}
                        />
                     </span>
                  </Box>
               )
            },
            {
               accessorKey: "id",
               header: "المعرّف",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{renderedCellValue}</span>
                  </Box>
               )
            },
            {
               accessorKey: "grade_id",
               header: "الصف",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{grades.find(e => e.id == renderedCellValue)?.name}</span>
                  </Box>
               )
            },
            {
               accessorKey: "g_class_id",
               header: "الشعبة",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{allClasses.find(e => e.id == renderedCellValue)?.name}</span>
                  </Box>
               )
            },
            {
               accessorKey: "first_name",
               header: "الاسم",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{renderedCellValue}</span>
                  </Box>
               )
            },
            {
               accessorKey: "last_name",
               header: "الكنية",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{renderedCellValue}</span>
                  </Box>
               )
            },
            {
               accessorKey: "father_name",
               header: "اسم الأب",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{renderedCellValue}</span>
                  </Box>
               )
            },
            {
               accessorKey: "mother_name",
               header: "اسم الأم",
               Cell: ({ renderedCellValue }) => (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{renderedCellValue}</span>
                  </Box>
               )
            },
         ];
         if (addAbsents)
            columns.push(
               {
                  accessorFn: e => e.id,
                  key: "absent",
                  header: "الغياب",
                  Cell: ({ renderedCellValue, row }) => {
                     return <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '1rem',
                        }}
                     >
                        <span>
                           <InputWithLabel
                              id={"absent" + renderedCellValue}
                              type="checkbox"
                              disabled={!renderedCellValue}
                              noLabel={true}
                              value={!!absents[renderedCellValue]}
                              hook={
                                 value => {
                                    if (value) setAbsents({ ...absents, [renderedCellValue]: "" });
                                    else setAbsents({ ...absents, [renderedCellValue]: undefined });
                                 }
                              }
                           />
                        </span>
                     </Box>
                  }
               },
               {
                  accessorFn: e => e.id,
                  key: "reason",
                  header: "تبرير الغياب",
                  Cell: ({ renderedCellValue, row }) => {
                     return <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '1rem',
                        }}
                     >
                        <span>
                           <InputWithLabel
                              id={"reason" + renderedCellValue}
                              disabled={!renderedCellValue}
                              noLabel={true}
                              value={absents[renderedCellValue] ?? ""}
                              hook={note => setAbsents({ ...absents, [renderedCellValue]: note })}
                           />
                        </span>
                     </Box>
                  }
               },
            );
         return columns;
      },
      [data, addAbsents, absents, selected]
   );

   return (
      <ViewInterface
         control={
            <>
               <ListOfButtons
                  data={
                     [
                        {
                           name: "تسجيل طالب",
                           event: () => navigate(handlers.ADDSTUDENT)
                        },
                        {
                           name: "قبول الطلاب",
                           event: () => navigate(handlers.ACCEPTSTUDENTS)
                        },
                        {
                           name: "عرض صفحة الطالب",
                           event: () => {
                              selected ?
                                 navigate(handlers.VIEWSTUDENTDATA + selected)
                                 : alert("اختر طالباً لعرض معلوماته.")
                           },
                           disabled: !selected
                        },
                        {
                           name: addAbsents ? "تأكيد الغيابات" : "تسجيل الغياب",
                           event: () => {
                              if (addAbsents) {
                                 handlers.addAbsents(
                                    searchClass,
                                    absents,
                                    () => {
                                       setAddAbsents(false);
                                    }
                                 )
                              } else {
                                 if (!searchClass) return alert("اختر الشعبة التي تريد إدخال غياباتها.");
                                 setAddAbsents(true)
                              }
                           }
                        },
                     ]
                  }
               />
               <Row className='text-start'>
                  <InputWithLabel
                     id="search"
                     text="عوامل التصفية"
                     hint="البحث"
                     value={tempSearch}
                     hook={setTempSearch}
                     ehook={setSearch}
                  />
                  <Multiple
                     id="grade"
                     text="الصف"
                     options={grades}
                     value={searchGrade}
                     hook={setSearchGrade}
                  />
                  <Multiple
                     id="class"
                     text="الشعبة"
                     options={classes}
                     value={searchClass}
                     hook={setSearchClass}
                  />
               </Row>
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
               enableSorting={false}
               enablePinning={false}
               enableDensityToggle={false}
               enablePagination={false}
               enableFilters={false}
               enableTopToolbar={false}
               enableBottomToolbar={false}
               enableHiding={false}
               enableColumnActions={false}
               enableMultiRowSelection={false}
            />
         }
         current={current}
         next={next}
         previous={previous}
         setCurrent={setCurrent}
      />
   );
};

export default ViewStudents;