import { InputWithLabel, ListOfButtons, Multiple, Navigation } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { ViewInterface } from '../../Interfaces';

function SelectStudents() {
   const navigate = useNavigate();

   const [search, setSearch] = useState("%");
   const [tempSearch, setTempSearch] = useState("");
   const [searchGrade, setSearchGrade] = useState("");

   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState([]);
   const [selectedClasses, setSelectedClasses] = useState([]);
   const [sortType, setSortType] = useState("");

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);

   useEffect(
      () => {
         setSelected([]);
      },
      [searchGrade]
   );

   useEffect(
      () =>
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
               setAllClasses(res);
            }
         ),
      []
   );

   useEffect(
      () => {
         if (searchGrade === "") {
            setData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
            setPrevious(0);
            setNext(0);
            setCurrent(1);
            return;
         }
         if (search === "") {
            setSearch("%");
            return;
         }
         handlers.getStudents(
            search,
            current,
            searchGrade,
            "",
            false,
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
      [current, search, searchGrade]
   );

   const columns = useMemo(
      () => [
         {
            accessorFn: e => e.id,
            key: "accepted",
            header: 'قبول',
            Cell: ({ renderedCellValue }) => {
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
                           disabled={!renderedCellValue}
                           checked={!!selected.find(e => e.id == renderedCellValue)}
                           onChange={
                              e => {
                                 if (e.target.checked) {
                                    const temp = data.filter(ee => ee.id == renderedCellValue)[0];
                                    setSelected([...selected, temp]);
                                 } else {
                                    setSelected(selected.filter(e => e.id != renderedCellValue));
                                 }
                              }
                           }
                        />
                     </span>
                  </Box>
               )
            },
         },
         {
            accessorKey: "id",
            header: 'المعرّف',
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
            ),
         },
         {
            accessorKey: "id",
            id: "grade",
            header: 'الصف',
            Cell: ({ renderedCellValue }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue && grades.find(e => e.id == searchGrade)?.name}</span>
               </Box>
            ),
         },
         {
            accessorKey: "first_name",
            header: 'الاسم',
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
            accessorKey: "last_name",
            header: 'الكنية',
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
            accessorKey: "father_name",
            header: 'اسم الأب',
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
            accessorKey: "mother_name",
            header: 'اسم الأم',
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
            accessorKey: "birth_date",
            header: 'تاريخ الولادة',
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
            accessorKey: "address_id",
            header: 'العنوان',
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
         }
      ],
      [data, selected]
   );

   return (
      <ViewInterface
         control={
            <>
               <ListOfButtons data={
                  [
                     {
                        name: "متابعة",
                        event: () => {
                           if (sortType === "") return alert("اختر طريقة الترتيب.");
                           if (!selected.length) return alert("اختر طلاباً لتوزيعهم.");
                           if (!selectedClasses.length) return alert("اختر شعباً ليتم التوزيع عليها.");
                           if (sortType === "manual") {
                              return navigate(
                                 handlers.DISTRIBUTESTUDENTS,
                                 {
                                    state: {
                                       grade: grades.filter(e => e.id == searchGrade)[0],
                                       students: selected,
                                       classes: selectedClasses.map(e => { return classes.find((ee) => ee.id == e); }),
                                       selection: {}
                                    }
                                 }
                              );
                           }
                           handlers.addStudentsToClassesAutomatically(
                              selected.map(e => e.id),
                              selectedClasses,
                              sortType,
                              res => {
                                 const temp = {};
                                 for (const n of res.classes) {
                                    const classId = n.id;
                                    for (const k of n.newStudents) {
                                       temp[k.id] = classId;
                                    }
                                 }
                                 navigate(
                                    handlers.DISTRIBUTESTUDENTS,
                                    {
                                       state: {
                                          grade: grades.filter(e => e.id == searchGrade)[0],
                                          students: selected,
                                          classes: selectedClasses.map(e => { return classes.find((ee) => ee.id == e); }),
                                          selection: temp
                                       }
                                    }
                                 );
                              }
                           );
                        }
                     },
                     {
                        name: "عرض صفحة طالب",
                        event: () => {
                           if (!selected.length) return alert("اخترا طالباً لعرض معلوماته");
                           if (selected.length > 1) return alert("اخترا طالباً واحداً لعرض معلوماته");
                           navigate(handlers.VIEWSTUDENTDATA + selected[0].id);
                        }
                     }
                  ]
               } />
               <Row className='text-start'>
                  <Multiple
                     id="method"
                     text="طريقة للتوزيع التلقائي"
                     options={[{ id: "alphabeticPriority", name: "تدريجي" }, { id: "even", name: "متقارب" }, { id: "manual", name: "يدوي" }]}
                     value={sortType}
                     hook={setSortType}
                  />
                  <InputWithLabel
                     id="search"
                     value={tempSearch}
                     text="عوامل التصفية"
                     hint="بحث"
                     hook={setTempSearch}
                     ehook={setSearch}
                  />
                  <Multiple
                     id="grade"
                     text="الصف"
                     options={grades}
                     value={searchGrade}
                     hook={
                        (gradeId) => {
                           setSearchGrade(gradeId);
                           gradeId &&
                              setClasses(allClasses.filter(e => e.id === gradeId)[0].g_classes);
                        }
                     }
                  />
                  <Multiple
                     id="class"
                     text="الشعبة"
                     multiple={true}
                     options={classes}
                     value={selectedClasses}
                     hook={setSelectedClasses}
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
            />
         }
         current={current}
         next={next}
         previous={previous}
         setCurrent={setCurrent}
      />
   )
};

export default SelectStudents;