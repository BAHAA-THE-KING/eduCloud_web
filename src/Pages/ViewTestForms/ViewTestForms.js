import { ListOfButtons, Navigation } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

function ViewTestForms() {
   const navigate = useNavigate();

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [testForms, setTestForms] = useState([]);

   useEffect(
      () =>
         handlers.getTestForms(
            data => {
               setTestForms(data.map(e => { return { id: e.id, name: e.name }; }));
               data.length ? setCurrent(1) : setCurrent(0);
            }
         ),
      []
   );
   useEffect(
      () => {
         setPrevious(current - 1);
         const next = current * 10 >= testForms.length ? 0 : current + 1;
         setNext(next);
         const start = (current - 1) * Math.floor(testForms.length / 10) * 10;
         const end = (current - 1) * Math.floor(testForms.length / 10) * 10 + 10;
         const temp = testForms.slice(start, end);
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
                        name: "إضافة نموذج اختبار",
                        event: () => navigate(handlers.ADDTESTFORM)
                     },
                     {
                        name: "عرض صفحة نموذج",
                        event: () => (!!selected) ? navigate(handlers.VIEWTESTFORMDATA + selected) : alert("اختر نموذجاً لعرض معلوماته.")
                     }
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

export default ViewTestForms;