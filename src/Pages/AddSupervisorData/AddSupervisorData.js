import { ListOfButtons, Navigation } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';


function AddSupervisorData() {
   const navigate = useNavigate();
   const { state: { empData, next: nextNav } } = useLocation();
   if (nextNav[0] !== handlers.ADDSUPERVISOR) navigate(handlers.HOME);

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
                           }
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
            Cell: ({ renderedCellValue, row }) => (
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
                        disabled={!row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue()}
                        checked={
                           renderedCellValue ||
                           (!!selected.find(e => e == row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue()))
                        }
                        onChange={e => {
                           const id = row.getAllCells().find(e => e.id.indexOf("id") != -1).renderValue();
                           if (e.target.checked) {
                              setSelected([...selected, id]);
                           } else {
                              setSelected(selected.filter(e => e != id));
                           }
                        }}
                     />
                  </span>
               </Box>
            ),
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
      ],
      [data, selected]
   );

   return (
      <Container fluid>
         <Row className='mt-2'>
            <Col xs='2'>
               <Form.Label>إنشاء حساب للموجه {empData.first_name}</Form.Label>
               <ListOfButtons data={
                  [
                     {
                        name: "إتمام",
                        event: () => {
                           handlers.addSupervisor(
                              empData.id,
                              selected,
                              () => {
                                 nextNav.shift();
                                 if (nextNav.length) navigate(nextNav[0], { empData, nextNav });
                                 else navigate(handlers.HOME);
                              }
                           );
                        }
                     }
                  ]
               } />
            </Col>
            <Col xs='10'>
               <MaterialReactTable
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
               />
            </Col>
         </Row>
         <Navigation current={current} next={next} previous={previous} setCurrent={setCurrent} />
      </Container>
   )
};

export default AddSupervisorData;