import { InputWithLabel, ListOfButtons, Multiple } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { ViewInterface } from "../../Interfaces";

function ViewTests() {
   const navigate = useNavigate();

   const [controller, setController] = useState(new AbortController());
   const [search, setSearch] = useState("");
   const [searchGrade, setSearchGrade] = useState("");
   const [searchClasses, setSearchClasses] = useState([]);
   const [searchSubjects, setSearchSubjects] = useState([]);
   const [searchStartDate, setSearchStartDate] = useState("");
   const [searchEndDate, setSearchEndDate] = useState("");
   const [searchTypes, setSearchTypes] = useState([]);

   const [current, setCurrent] = useState(1);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [classes, setClasses] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [types, setTypes] = useState([]);

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
         setSearchClasses([]);
         setSearchSubjects([]);
         const temp = allClasses.filter(e => e.grade_id === searchGrade);
         setClasses(temp);
         const temp2 = allSubjects.filter(e => e.grade_id === searchGrade);
         setSubjects(temp2);
      },
      [searchGrade]
   );

   useEffect(
      () => {
         controller.abort();
         const newController = new AbortController();
         setController(newController);
         handlers.getTests(
            newController,
            current,
            search,
            searchTypes,
            searchSubjects,
            searchClasses,
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
      [current, search, searchClasses, searchTypes, searchSubjects, searchStartDate, searchEndDate]
   );

   function clickHook(id) {
      navigate(handlers.VIEWTESTDATA + id);
   }

   const columns = useMemo(
      () => [
         {
            accessorKey: "id",
            header: 'المعرّف',
            Cell: ({ renderedCellValue, row }) => {
               row.myId = renderedCellValue;
               return (
                  <Box
                     onDoubleClick={() => clickHook(row.myId)}
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
            accessorKey: "title",
            header: 'العنوان',
            Cell: ({ renderedCellValue, row }) => {
               return (
                  <Box
                     onDoubleClick={() => clickHook(row.myId)}
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
            accessorKey: "type_id",
            header: 'النوع',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  onDoubleClick={() => clickHook(row.myId)}
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
               const grade_id = allClasses.find(e => e.id === renderedCellValue)?.grade_id;
               const grade = grades.find(e => e.id === grade_id)?.name;
               return (
                  <Box
                     onDoubleClick={() => clickHook(row.myId)}
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
               const theClass = allClasses.find(e => e.id === renderedCellValue)?.name;
               return (
                  <Box
                     onDoubleClick={() => clickHook(row.myId)}
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
               const grade_id = allSubjects.find(e => e.id === renderedCellValue)?.grade_id;
               const subject = grades.find(e => e.id === grade_id)?.name;
               return (
                  <Box
                     onDoubleClick={() => clickHook(row.myId)}
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
                  onDoubleClick={() => clickHook(row.myId)}
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
                  onDoubleClick={() => clickHook(row.myId)}
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
                     onDoubleClick={() => clickHook(row.myId)}
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
      <ViewInterface
         control={
            <>
               <ListOfButtons data={
                  [
                     {
                        name: "إضافة اختبار",
                        event: () => navigate(handlers.ADDTEST)
                     },
                     {
                        name: "عرض أنواع الاختبارات",
                        event: () => navigate(handlers.VIEWTESTFORMS)
                     },
                     {
                        name: "تحليل الاختبارات",
                        event: () => navigate(handlers.ANALYZETESTS)
                     },
                     {
                        name: "عرض اختبارات القدرات",
                        event: () => navigate(handlers.VIEWABILITYTESTFORMS)
                     },
                  ]
               }
               />
               <Row className='text-start'>
                  <InputWithLabel
                     id="search"
                     value={search}
                     text="عوامل التصفية"
                     hint="بحث"
                     hook={setSearch}
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
                     id='types'
                     multiple={true}
                     text='النوع'
                     options={types}
                     value={searchTypes}
                     hook={setSearchTypes}
                  />
                  <Multiple
                     id='grade'
                     text='الصف'
                     options={grades}
                     value={searchGrade}
                     hook={setSearchGrade}
                  />
                  <Multiple
                     id='classes'
                     multiple={true}
                     text='الشعبة'
                     options={classes}
                     value={searchClasses}
                     hook={setSearchClasses}
                  />
                  <Multiple
                     id='subjects'
                     multiple={true}
                     text='المادة'
                     options={subjects}
                     value={searchSubjects}
                     hook={setSearchSubjects}
                  />
               </Row>
            </>
         }
         view={
            <MaterialReactTable
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
               enableMultiRowSelection={false}
               enableSorting={false}
               enablePinning={false}
               enableDensityToggle={false}
               enablePagination={false}
               enableFilters={false}
               enableTopToolbar={false}
               enableBottomToolbar={false}
               enableHiding={false}
               enableColumnActions={false}
            />
         }
         current={current}
         next={next}
         previous={previous}
         setCurrent={setCurrent}
      />
   )
};

export default ViewTests;