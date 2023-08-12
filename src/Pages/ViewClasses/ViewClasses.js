import { ListOfButtons, Navigation } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';


function ViewClasses() {
   const navigate = useNavigate();

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [grades, setGrades] = useState([]);
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
               setGrades(data);
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
            accessorKey: "name",
            header: 'الاسم',
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
            accessorKey: "maxNum",
            header: 'العدد الأقصى للطلاب',
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
            accessorKey: "grade",
            id: "gradeName",
            header: 'الصف',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  onClick={() => row.toggleSelected()}
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
            accessorKey: "grade",
            id: "gradeId",
            header: 'معرف الصف',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  onClick={() => row.toggleSelected()}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue?.id}</span>
               </Box>
            ),
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
                        name: "إضافة شعبة",
                        event: () => navigate(handlers.ADDTESTFORM)
                     },
                     {
                        name: "عرض شعبة",
                        event: () => (!!selected) ? navigate(handlers.VIEWCLASSDATA + selected) : alert("اختر شعبة لعرض معلوماتها.")
                     },
                  ]
               } />
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
         <Navigation current={current} next={next} previous={previous} setCurrent={setCurrent} />
      </Container>
   )
};

export default ViewClasses;