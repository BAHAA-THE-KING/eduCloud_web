import { InputWithLabel, ListOfButtons, Multiple, Navigation } from '../../components';
import React, { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

function ViewMarks() {
   const navigate = useNavigate();

   const [searchGrade, setSearchGrade] = useState("");
   const [searchClass, setSearchClass] = useState("");
   const [searchSubject, setSearchSubject] = useState("");
   const [searchType, setSearchType] = useState("");
   const [test, setTest] = useState();

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState([]);

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [classes, setClasses] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [types, setTypes] = useState([]);
   const [tests, setTests] = useState([]);

   const [all, setAll] = useState(true);
   const [isEdit, setIsEdit] = useState(false);
   const [marks, setMarks] = useState({});

   useEffect(
      () => {
         handlers.getSubjects(
            res => {
               setGrades(res);
               setAllClasses(res.map(e => e.g_classes).flat());
               setAllSubjects(res.map(e => e.subjects).flat());
            }
         );
         handlers.getTestForms(
            res => {
               setTypes(res);
            }
         );
      },
      []
   );

   useEffect(
      () => {
         if (!searchClass || !searchSubject || !searchType) {
            setTests([]);
            setTest("");
            return;
         }
         handlers.getTests(
            "",
            "",
            searchType,
            searchSubject,
            searchClass,
            "",
            "",
            res => {
               setTests(res.map(e => { e.name = e.title; return e; }));
            }
         );
      },
      [searchClass, searchSubject, searchType]
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

   useEffect(
      () => {
         if (!test) return;
         if (all)
            handlers.getMarks(
               test,
               res => {
                  const temp = {};
                  for (const k of res) {
                     temp[k.student.id] = k.mark;
                  }
                  setMarks(temp);
                  setAllData(res.map(e => e.student));
                  setCurrent(1);
               }
            );
         else
            handlers.getRemainingStudents(
               test,
               res => {
                  setMarks({});
                  setAllData(res);
                  setCurrent(1);
               }
            );
      },
      [all, isEdit, test]
   );

   useEffect(
      () => {
         setMarks({});
         setTest("");
      },
      [searchGrade, searchClass, searchSubject, searchType]
   );

   useEffect(
      () => {
         if (!searchGrade) return;
         const temp = allClasses.filter(e => e.grade_id === searchGrade);
         const temp2 = allSubjects.filter(e => e.grade_id === searchGrade);
         setClasses(temp);
         setSubjects(temp2);
      },
      [searchGrade]
   );

   const columns = useMemo(
      () => {
         const columns = [
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
            {
               accessorFn: asdasdasdasd => asdasdasdasd?.id,
               key: "mark",
               header: "العلامة",
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
                           <InputWithLabel
                              id={"mark" + renderedCellValue}
                              type="number"
                              noLabel={true}
                              disabled={!isEdit || !renderedCellValue}
                              value={marks[renderedCellValue] ?? ""}
                              hook={mark => setMarks({ ...marks, [renderedCellValue]: mark })}
                           />
                        </span>
                     </Box>
                  );
               }
            },
         ];
         return columns;
      },
      [data, all, marks, isEdit]
   );

   return (
      <Container fluid>
         <Row className='mt-2'>
            <Col xs='2'>
               <ListOfButtons
                  data={
                     [
                        {
                           name: "إدخال",
                           event: () => {
                              if (!Object.keys(marks).length) return alert("أدخل العلامات المراد حفظها.");
                              handlers.addMarks(
                                 test,
                                 marks,
                                 () => {
                                    setIsEdit(false);
                                 }
                              );
                           }
                        },
                        {
                           name: !all ? "عرض العلامات المدخلة" : "عرض العلامات الناقصة",
                           event: () => setAll(!all)
                        },
                        {
                           name: isEdit ? "إلغاء التعديل" : "تعديل",
                           event: () => setIsEdit(!isEdit)
                        },
                        {
                           name: "عرض صفحة السبر",
                           event: () => (!!test) ? navigate(handlers.VIEWTESTDATA + test) : alert("اختر سبراً لعرض معلوماته.")
                        },
                     ]
                  }
               />
               <Row className='text-start'>
                  <Form.Label>عوامل التصفية :</Form.Label>
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
                  <Multiple
                     id="subject"
                     text="المادة"
                     options={subjects}
                     value={searchSubject}
                     hook={setSearchSubject}
                  />
                  <Multiple
                     id="type"
                     text="النوع"
                     options={types}
                     value={searchType}
                     hook={setSearchType}
                  />
                  <Multiple
                     id="test"
                     text="الاختبار"
                     options={tests}
                     value={test}
                     hook={setTest}
                  /></Row>
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
            </Col>
         </Row>
         <Navigation current={current} next={next} previous={previous} setCurrent={setCurrent} />
      </Container>
   );
};

export default ViewMarks;