import React, { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, Form, Dropdown } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

function ViewTests() {
   const navigate = useNavigate();

   const [search, setSearch] = useState("%");
   const [searchKeyword, setTempSearch] = useState("");
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

   const [selected, setSelected] = useState();

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
               while (data.length < res.per_page) data.push({ id: "" });
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
                  onClick={() => row.toggleSelected()}
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
                  onClick={() => row.toggleSelected()}
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
                  onClick={() => row.toggleSelected()}
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
            header: 'الصف',
            Cell: ({ renderedCellValue, row }) => {
               let grade;
               for (const k in allClasses) {
                  const e = allClasses[k];
                  for (const n of e.subjects) {
                     if (n.id == renderedCellValue) grade = e.name
                  }
               };
               return (
                  <Box
                     onClick={() => row.toggleSelected()}
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
                  const e = allClasses[k].g_classes;
                  for (const n of e) {
                     if (n.id == renderedCellValue) theClass = n.name
                  }
               }
               return (
                  <Box
                     onClick={() => row.toggleSelected()}
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
                  const e = allClasses[k].subjects;
                  for (const n of e) {
                     if (n.id == renderedCellValue) subject = n.name
                  }
               };
               return (
                  <Box
                     onClick={() => row.toggleSelected()}
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
                  onClick={() => row.toggleSelected()}
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
                  onClick={() => row.toggleSelected()}
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
                     onClick={() => row.toggleSelected()}
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
               <Row>
                  <Col xs='9' className='my-1'>
                     <Button className='w-100' onClick={() => navigate(handlers.ADDTEST)}>
                        إضافة اختبار
                     </Button>
                  </Col>
                  <Col xs='9' className='my-1'>
                     <Button className='w-100' onClick={() => (!!selected && selected !== -1) ? navigate(handlers.VIEWTESTDATA + selected) : alert("اختر اختباراً لعرض معلوماته.")}                     >
                        عرض صفحة اختبار
                     </Button>
                  </Col>
                  <Col xs='9' className='my-1'>
                     <Button
                        className='w-100'
                        onClick={() => navigate(handlers.VIEWTESTFORMS)}
                     >
                        عرض أنواع الاختبارات
                     </Button>
                  </Col>
               </Row>
               <Row className='text-start'>
                  <Form.Label htmlFor='searchInput'>عوامل التصفية :</Form.Label>
                  <Form.Control
                     id="searchInput"
                     value={searchKeyword}
                     placeholder="بحث"
                     onChange={e => setTempSearch(e.target.value)}
                     onKeyDown={
                        e => {
                           if (e.key === 'Enter') {
                              setSearch(e.target.value);
                           }
                        }
                     }
                  >
                  </Form.Control>
                  <Form.Label htmlFor='type'>النوع :</Form.Label>
                  <Dropdown id='type'>
                     <Dropdown.Toggle>
                        {types.find(e => e.id == searchType)?.name ?? "اختر النوع"}
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        {
                           [...types, { id: "", name: <b>إلغاء</b> }]
                              .map(
                                 type =>
                                    <Dropdown.Item
                                       onClick={
                                          () => setSearchType(type.id)
                                       }
                                    >
                                       {type.name}
                                    </Dropdown.Item>
                              )
                        }
                     </Dropdown.Menu>
                  </Dropdown>
                  <Form.Label htmlFor='grade'>الصف :</Form.Label>
                  <Dropdown id='grade'>
                     <Dropdown.Toggle>
                        {grades.find(e => e.id == searchGrade)?.name ?? "اختر الصف"}
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        {
                           [...grades, { id: "", name: <b>إلغاء</b> }]
                              .map(
                                 grade =>
                                    <Dropdown.Item
                                       onClick={
                                          () => {
                                             setSearchGrade(grade.id);
                                             setSearchClass("");
                                             setSearchSubject("");
                                             if (!grade.id) return;
                                             const temp = allClasses.filter(e => e.id === grade.id)[0].g_classes;
                                             setClasses(temp);
                                             const temp2 = allClasses.filter(e => e.id === grade.id)[0].subjects;
                                             setSubjects(temp2);
                                          }
                                       }
                                    >
                                       {grade.name}
                                    </Dropdown.Item>
                              )
                        }
                     </Dropdown.Menu>
                  </Dropdown>
                  <Form.Label htmlFor='theclass'>الشعبة :</Form.Label>
                  <Dropdown id='theclass'>
                     <Dropdown.Toggle>
                        {classes.find(e => e.id == searchClass)?.name ?? "اختر الشعبة"}
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        {
                           [...classes, { id: "", name: <b>إلغاء</b> }]
                              .map(
                                 theClass =>
                                    <Dropdown.Item
                                       onClick={
                                          () => {
                                             setSearchClass(theClass.id);
                                          }
                                       }
                                    >
                                       {theClass.name}
                                    </Dropdown.Item>
                              )
                        }
                     </Dropdown.Menu>
                  </Dropdown>
                  <Form.Label htmlFor='subject'>المادة :</Form.Label>
                  <Dropdown id='subject'>
                     <Dropdown.Toggle>
                        {subjects.find(e => e.id == searchSubject)?.name ?? "اختر المادة"}
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        {
                           [...subjects, { id: "", name: <b>إلغاء</b> }]
                              .map(
                                 subject =>
                                    <Dropdown.Item
                                       onClick={
                                          () => setSearchSubject(subject.id)
                                       }
                                    >
                                       {subject.name}
                                    </Dropdown.Item>
                              )
                        }
                     </Dropdown.Menu>
                  </Dropdown>
               </Row>
            </Col>
            <Col xs='10'>
               <MaterialReactTable
                  columns={columns}
                  data={data}
                  initialState={{ density: 'compact' }}
                  enableSorting={false}
                  enablePinning={false}
                  enableDensityToggle={false}
                  enablePagination={false}
                  enableFilters={false}
                  enableTopToolbar={false}
                  enableBottomToolbar={false}
                  enableRowSelection={true}
                  enableMultiRowSelection={false}
               //onRowSelectionChange={
               //   e => setSelected(data[Object.keys(e())[0]].id)
               //}
               />
            </Col>
         </Row>
         <Row>
            <Col xs='12'>
               <Button className='m-2' style={{ width: "6rem", height: "2.5rem" }} onClick={() => setCurrent(current - 1)} disabled={!previous}>
                  {"<   السابق"}
               </Button>
               <Button className='m-2' style={{ width: "6rem", height: "2.5rem" }}>
                  {current}
               </Button>
               <Button className='m-2' style={{ width: "6rem", height: "2.5rem" }} onClick={() => setCurrent(current + 1)} disabled={!next}>
                  {"التالي   >"}
               </Button>
            </Col>
         </Row>
      </Container>
   )
};

export default ViewTests;