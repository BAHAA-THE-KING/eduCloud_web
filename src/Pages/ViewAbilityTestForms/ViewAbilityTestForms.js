import { useEffect, useMemo, useState } from "react";
import * as handlers from "../../handlers";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InputWithLabel, ListOfButtons, Multiple, Navigation } from "../../components";
import { MaterialReactTable } from "material-react-table";
import { Box } from '@mui/material';

function ViewAbilityTestForms() {
   const navigate = useNavigate();

   const [searchGrade, setSearchGrade] = useState("");
   const [searchSubject, setSearchSubject] = useState("");

   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

   const [allData, setAllData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [grades, setGrades] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [subjects, setSubjects] = useState([]);

   const [selected, setSelected] = useState({});

   useEffect(
      () => {
         handlers.getSubjects(
            res => {
               setGrades(res);
               setAllSubjects(res.map(e => e.subjects).flat());
            }
         );
      },
      []
   );

   useEffect(
      () => {
         setSearchSubject("");
         if (!searchGrade) return;
         setSubjects(allSubjects.filter(e => e.grade_id === searchGrade));
      },
      [searchGrade]
   );

   useEffect(
      () => {
         if (searchSubject === "") return setAllData([]);
         handlers.getAbilityTests(
            searchSubject,
            res => {
               setCurrent(1);
               setAllData(res);
            }
         );
      },
      [searchSubject]
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

   const columns = useMemo(
      () => [
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
            accessorKey: "title",
            header: 'العنوان',
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
            accessorKey: "subject_id",
            header: 'المادة',
            Cell: ({ renderedCellValue }) => {
               return (
                  <Box

                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                     }}
                  >
                     <span>{subjects.map(e => e.id === renderedCellValue)?.name}</span>
                  </Box>
               );
            },
         },
         {
            accessorKey: "minimum_success_percentage",
            header: 'النسبة المطلوبة النجاح',
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
         },
         {
            accessorKey: "sections",
            header: "الأقسام",
            Cell: ({ renderedCellValue, row }) => {
               const id = row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue();
               return <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>
                     {
                        id ?
                           <Multiple
                              id={"sections " + renderedCellValue?.length}
                              text="عرض الأقسام"
                              noLabel={true}
                              noNull={true}
                              noChoose={true}
                              options={renderedCellValue?.map(e => { return { id: e.id, name: e.name + " / " + e.min_mark + " / " + e.max_mark }; }) ?? []}
                              hook={() => { }}
                           />
                           : ""
                     }
                  </span>
               </Box>
            }
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
                        name: "إضافة اختبار قدرات",
                        event: () => navigate(handlers.ADDABILITYTESTFORM)
                     },
                     {
                        name: "عرض صفحة الاختبار",
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
                  <Multiple
                     id='grade'
                     text='الصف'
                     options={grades}
                     value={searchGrade}
                     hook={setSearchGrade}
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
   );
}
export default ViewAbilityTestForms;