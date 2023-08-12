import { ListOfButtons, Multiple, Navigation } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

function ViewEmployees() {
   const navigate = useNavigate();

   const [search, setSearch] = useState("%");
   const [tempSearch, setTempSearch] = useState("");
   const [searchRole, setSearchRole] = useState("");
   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState(-1);
   const [roles, setRoles] = useState([]);

   useEffect(
      () =>
         handlers.getRoles(
            res => setRoles(res.map(e => Object.create({ id: e, name: e })))
         ),
      []
   );
   useEffect(
      () => {
         if (search === "") {
            setSearch("%");
            return;
         }
         handlers.getEmployees(
            res => {
               const temp = res.current_page;
               setCurrent(temp);
               setNext(res.next_page_url ? temp + 1 : null);
               setPrevious(temp === 1 ? null : temp - 1);
               const data = res.data;
               while (data.length < res.per_page) data.push({});
               setData(data);
            },
            search + ("?page=" + current) + (searchRole ? "&role=" + searchRole : "")
         );
      },
      [search, searchRole]
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
            accessorKey: "first_name",
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
            accessorKey: "last_name",
            header: 'الكنية',
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
            accessorKey: "roles",
            header: 'الأدوار',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  onClick={() => row.toggleSelected()}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>
                     {
                        renderedCellValue ?
                           (
                              (renderedCellValue.length !== 0) ?
                                 (renderedCellValue.map(e => e.name).join(", ") + ".")
                                 : (<i style={{ color: "#888888" }}>لا يوجد أدوار لهذا الموظف.</i>)
                           )
                           : " "
                     }
                  </span>
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
                        name: "إضافة موظف",
                        event: () => navigate(handlers.ADDEMPLOYEE)
                     },
                     {
                        name: "عرض صفحة الموظف",
                        event: () => (!!selected) ? navigate(handlers.VIEWEMPLOYEEDATA + selected) : alert("اختر موظفاً لعرض معلوماته.")
                     }
                  ]
               } />
               <Row className='text-start'>
                  <Form.Label htmlFor='searchInput'>عوامل التصفية :</Form.Label>
                  <Form.Control
                     id="searchInput"
                     value={tempSearch}
                     placeholder="بحث"
                     onChange={e => setTempSearch(e.target.value)}
                     onKeyDown={
                        e => {
                           if (e.key === 'Enter') {
                              setSearch(e.target.value);
                           }
                        }
                     }
                  />
                  <Multiple
                     id="role"
                     text="الدور"
                     options={roles}
                     value={searchRole}
                     hook={setSearchRole}
                  />
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
                  enableRowSelection={false}
                  enableMultiRowSelection={false}
               //onRowSelectionChange={
               //   e => setSelected(data[Object.keys(e())[0]].id)
               //}
               />
            </Col>
         </Row>
         <Navigation current={current} next={next} previous={previous} setCurrent={setCurrent} />
      </Container>
   )
};

export default ViewEmployees;