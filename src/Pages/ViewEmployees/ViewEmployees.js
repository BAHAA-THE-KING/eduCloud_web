import { InputWithLabel, ListOfButtons, Multiple, Navigation } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
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
   const [selected, setSelected] = useState({});
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
            accessorKey: "roles",
            header: 'الأدوار',
            Cell: ({ renderedCellValue, row }) => (
               <Box
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
                        event: () => navigate(handlers.VIEWEMPLOYEEDATA + data[Object.keys(selected)[0]].id),
                        disabled: !Object.keys(selected).length
                     }
                  ]
               } />
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

export default ViewEmployees;