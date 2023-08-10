import * as handlers from '../../handlers';
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { Box } from '@mui/material';

function DistributeStudents() {
   const extData = useLocation().state;
   const navigate = useNavigate();

   const [search, setSearch] = useState("");
   const [tempSearch, setTempSearch] = useState("");
   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState(extData.students);
   const [classes, setClasses] = useState(extData.classes);
   const [grade, setGrade] = useState(extData.grade);
   const [selection, setSelection] = useState(extData.selection);

   useEffect(
      () => {
         const temp = (!search) ?
            allData
            : allData.filter(
               e =>
                  (e.first_name.indexOf(search) !== -1) || (e.last_name.indexOf(search) !== -1)
            );
         console.log(temp);
         setPrevious(current - 1);
         const next = current * 10 >= temp.length ? 0 : current + 1;
         setNext(next)
         const start = (current - 1) * Math.floor(temp.length / 10) * 10;
         const end = (current - 1) * Math.floor(temp.length / 10) * 10 + 10;
         const temp1 = temp.slice(start, end);
         while (temp1.length < 10) temp1.push({});
         setData(temp1);
      },
      [search, current]
   );

   const columns = useMemo(
      () => [
         {
            accessorKey: "first_name",
            header: 'الاسم',
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
            accessorKey: "last_name",
            header: 'الكنية',
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
            accessorKey: "father_name",
            header: 'اسم الأب',
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
            accessorKey: "mother_name",
            header: 'اسم الأم',
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
            accessorKey: "birth_date",
            header: 'تاريخ الولادة',
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
            accessorKey: "grade_id",
            header: 'الصف',
            Cell: ({ renderedCellValue }) =>
            (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue && grade.name}</span>
               </Box>
            ),
         },
         {
            accessorKey: "id",
            header: 'الشعبة',
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
                        {
                           renderedCellValue &&
                           <Dropdown>
                              <Dropdown.Toggle>
                                 {classes.find(e => e.id == selection[renderedCellValue])?.name ?? "اختر الشعبة "}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                 {
                                    classes.map(
                                       e =>
                                          <Dropdown.Item
                                             onClick={
                                                () => {
                                                   setSelection({ ...selection, [renderedCellValue]: e.id });
                                                }
                                             }
                                          >
                                             {e.name}
                                          </Dropdown.Item>
                                    )
                                 }
                              </Dropdown.Menu>
                           </Dropdown>
                        }
                     </span>
                  </Box>
               );
            },
         }
      ],
      [selection]
   );

   return (
      <Container fluid>
         <Row className='mt-2'>
            <Col xs='2'>
               <Row>
                  <Col>
                     <Button
                        className='w-50'
                        onClick={
                           () => {
                              const temp = {};
                              Object.entries(selection)
                                 .map(
                                    e => {
                                       if (!temp[e[1]]) temp[e[1]] = [];
                                       temp[e[1]].push(e[0]);
                                    }
                                 );
                              const temp1 = [];
                              for (const k in temp) {
                                 temp1.push(
                                    {
                                       "class_id": k,
                                       "students_ids": temp[k]
                                    }
                                 );
                              }
                              handlers.addStudentsToClasses(
                                 grade.id,
                                 true,
                                 temp1,
                                 () => {
                                    navigate(handlers.HOME)
                                 }
                              );

                           }
                        }
                     >
                        متابعة
                     </Button>
                  </Col>
               </Row>
               <Row className='text-start'>
                  <Form.Label htmlFor='searchInput'>عوامل التصفية :</Form.Label>
                  <Form.Control
                     id="searchInput"
                     value={tempSearch}
                     placeholder="البحث"
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

export default DistributeStudents;