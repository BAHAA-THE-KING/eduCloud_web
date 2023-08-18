import { InputWithLabel, ListOfButtons, Multiple, Navigation } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

function ViewTests() {
   const navigate = useNavigate();

   const [search, setSearch] = useState("%");
   const [tempSearch, setTempSearch] = useState("");
   const [searchClass, setSearchClass] = useState("");
   const [searchSubject, setSearchSubject] = useState("");
   const [searchStartDate, setSearchStartDate] = useState("");
   const [searchEndDate, setSearchEndDate] = useState("");
   const [searchType, setSearchType] = useState("");

   const [searchGrade, setSearchGrade] = useState("");

   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);

   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [types, setSearchTypes] = useState([]);

   const [selected, setSelected] = useState({});

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
               setSearchTypes(res);
            }
         );
      },
      []
   );
   useEffect(
      () => {
         if (search === "") {
            setSearch("%");
            return;
         }
         handlers.getTests(
            current,
            search,
            searchType,
            searchSubject,
            searchClass,
            searchStartDate,
            searchEndDate,
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
      [current, search, searchClass, searchType, searchSubject, searchStartDate, searchEndDate]
   );



   const columns = useMemo(
      () => [
         {
            accessorKey: "id",
            header: 'المعرّف',
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
            accessorKey: "title",
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
         },
         {
            accessorKey: "type_id",
            header: 'النوع',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{types.find(e => e.id == renderedCellValue)?.name}</span>
               </Box>
            ),
         },
         {
            accessorKey: "g_class_id",
            id: "grade",
            header: 'الصف',
            Cell: ({ renderedCellValue, row }) => {
               let grade;
               for (const k in allClasses) {
                  if (grade) break;
                  const e = allClasses[k];
                  for (const n of e.g_classes) {
                     if (n.id == renderedCellValue) {
                        grade = e.name
                        break;
                     }
                  }
               };
               return (
                  <Box
                     
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{grade}</span>
                  </Box>
               );
            },
         },
         {
            accessorKey: "g_class_id",
            header: 'الشعبة',
            Cell: ({ renderedCellValue, row }) => {
               let theClass;
               for (const k in allClasses) {
                  if (theClass) break;
                  const e = allClasses[k].g_classes;
                  for (const n of e) {
                     if (n.id == renderedCellValue) {
                        theClass = n.name
                        break;
                     }
                  }
               }
               return (
                  <Box
                     
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{theClass}</span>
                  </Box>
               );
            },
         },
         {
            accessorKey: "subject_id",
            header: 'المادة',
            Cell: ({ renderedCellValue, row }) => {
               let subject;
               for (const k in allClasses) {
                  if (subject) break;
                  const e = allClasses[k].subjects;
                  for (const n of e) {
                     if (n.id == renderedCellValue) {
                        subject = n.name;
                        break;
                     }
                  }
               };
               return (
                  <Box
                     
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{subject}</span>
                  </Box>
               );
            },
         },
         {
            accessorKey: "date",
            header: 'التاريخ',
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
            accessorKey: "max_mark",
            header: 'العلامة العظمى',
            Cell: ({ renderedCellValue, row }) =>
            (
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
            accessorKey: "min_mark",
            header: 'علامة النجاح',
            Cell: ({ renderedCellValue, row }) => {
               return (
                  <Box
                     
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{renderedCellValue}</span>
                  </Box>
               );
            },
         }
      ],
      [data]
   );

   return (
      <Container fluid>
         <Row className='mt-2'>
            <Col xs='2'>
               <ListOfButtons data={
                  [
                     {
                        name: "إضافة اختبار",
                        event: () => navigate(handlers.ADDTEST)
                     },
                     {
                        name: "عرض صفحة اختبار",
                        event: () => navigate(handlers.VIEWTESTDATA + data[Object.keys(selected)[0]].id),
                        disabled: !Object.keys(selected).length
                     },
                     {
                        name: "عرض أنواع الاختبارات",
                        event: () => navigate(handlers.VIEWTESTFORMS)
                     }
                  ]
               }
               />
               <Row className='text-start'>
                  <InputWithLabel
                     id="search"
                     value={tempSearch}
                     text="عوامل التصفية"
                     hint="بحث"
                     hook={setTempSearch}
                     ehook={setSearch}
                  />
                  <InputWithLabel
                     id="startDate"
                     type="date"
                     text="بعد التاريخ"
                     hint="بحث"
                     value={searchStartDate}
                     hook={setSearchStartDate}
                  />
                  <InputWithLabel
                     id="endDate"
                     type="date"
                     text="قبل التاريخ"
                     hint="بحث"
                     value={searchEndDate}
                     hook={setSearchEndDate}
                  />
                  <Multiple
                     id='type'
                     text='النوع'
                     options={types}
                     value={searchType}
                     hook={setSearchType}
                  />
                  <Multiple
                     id='grade'
                     text='الصف'
                     options={grades}
                     value={searchGrade}
                     hook={
                        gradeId => {
                           setSearchGrade(gradeId);
                           setSearchClass("");
                           setSearchSubject("");
                           if (!gradeId) return;
                           const temp = allClasses.filter(e => e.id === gradeId)[0].g_classes;
                           setClasses(temp);
                           const temp2 = allClasses.filter(e => e.id === gradeId)[0].subjects;
                           setSubjects(temp2);
                        }
                     }
                  />
                  <Multiple
                     id='theclass'
                     text='الشعبة'
                     options={classes}
                     value={searchClass}
                     hook={setSearchClass}
                  />
                  <Multiple
                     id='subject'
                     text='المادة'
                     options={subjects}
                     value={searchSubject}
                     hook={setSearchSubject}
                  />
               </Row>
            </Col>
            <Col xs='10'>
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
                  state={{ rowSelection: selected }}
                  enableRowSelection={(row) => row.original.id}
                  onRowSelectionChange={setSelected}
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
            </Col>
         </Row>
         <Navigation current={current} next={next} previous={previous} setCurrent={setCurrent} />
      </Container>
   )
};

export default ViewTests;