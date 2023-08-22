import { InputWithLabel, ListOfButtons, Multiple } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import {Form, Row } from 'react-bootstrap';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { ViewInterface } from '../../Interfaces';

function AcceptStudents() {
   const navigate = useNavigate();

   const [searchGrade, setSearchGrade] = useState("");
   const [minNum, setMinNum] = useState(100);
   const [tempMinNum, setTempMinNum] = useState(100);

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState([]);

   const [selected, setSelected] = useState([]);

   const [grades, setGrades] = useState([]);

   useEffect(
      () =>
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
            }
         ),
      []
   );

   useEffect(
      () => {
         if (!searchGrade) return;
         handlers.getCandidateToOfficial(
            searchGrade,
            100,
            res => {
               setAllData(res);
               const temp = res.filter(e => e.succeeded === true).map(e => e.id);
               setSelected([...temp]);
               setCurrent(1);
            }
         );
      },
      [searchGrade]
   );

   useEffect(
      () => {
         if (!searchGrade) return;
         handlers.getCandidateToOfficial(
            searchGrade,
            minNum,
            res => {
               setAllData(res);
               const temp = res.filter(e => e.succeeded === true).map(e => e.id);
               setSelected([...temp]);
               setCurrent(1);
            }
         );
      },
      [minNum]
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
            accessorKey: "accepted",
            header: 'قبول',
            Cell: ({ renderedCellValue, row }) => {
               const id = row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue();
               return (
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
                           checked={renderedCellValue || (selected.find(e => e == id) ?? false)}
                           onChange={e => {
                              if (e.target.checked)
                                 setSelected([...selected, id]);
                              else
                                 setSelected(selected.filter(e => e != id));
                           }}
                        />
                     </span>
                  </Box>
               );
            },
         },
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
            accessorKey: "id",
            id: "grade",
            header: 'الصف',
            Cell: ({ renderedCellValue }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{renderedCellValue && grades.find(e => e.id == searchGrade)?.name}</span>
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
            accessorKey: "acceptance_rate",
            header: 'العلامة',
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
            accessorKey: "succeeded_in",
            header: 'اجتاز',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{row.getAllCells().find(e => e.id.indexOf("id") != -1).renderValue() && (renderedCellValue.length ? renderedCellValue.join(", ") + "." : "")}</span>
               </Box>
            ),
         },
         {
            accessorKey: "failed_in",
            header: 'أخفق',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{row.getAllCells().find(e => e.id.indexOf("id") != -1).renderValue() && (renderedCellValue.length ? renderedCellValue.join(", ") + "." : "")}</span>
               </Box>
            ),
         },
         {
            accessorKey: "error_in",
            header: 'لم توضع علامة',
            Cell: ({ renderedCellValue, row }) => (
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1rem',
                  }}
               >
                  <span>{row.getAllCells().find(e => e.id.indexOf("id") != -1).renderValue() && (renderedCellValue.length ? renderedCellValue.join(", ") + "." : "")}</span>
               </Box>
            ),
         }
      ],
      [data, selected]
   );

   return (
      <ViewInterface
         control={
            <>
               <ListOfButtons data={
                  [
                     {
                        name: "متابعة",
                        event: () => {
                           if (!selected.length) {
                              navigate(handlers.SELECTSTUDENTS);
                              return;
                           }
                           handlers.addCandidateToOfficial(
                              searchGrade,
                              selected,
                              () => {
                                 navigate(handlers.SELECTSTUDENTS);
                              }
                           );
                        },
                     },
                     {
                        name: "عرض صفحة طالب",
                        event: () => {
                           if (!selected.length) return alert("اخترا طالباً لعرض معلوماته");
                           if (selected.length > 1) return alert("اخترا طالباً واحداً لعرض معلوماته");
                           navigate(handlers.VIEWSTUDENTDATA + selected[0]);
                        }
                     }
                  ]
               } />
               <Row className='text-start'>
                  <InputWithLabel
                     id="mark"
                     type="number"
                     text="تحديد علامة النجاح"
                     hint="علامة النجاح"
                     value={tempMinNum}
                     hook={setTempMinNum}
                     ehook={setMinNum}
                  />
                  <Form.Label>عوامل التصفية :</Form.Label>
                  <Multiple
                     id="grade"
                     text="الصف"
                     options={grades}
                     value={searchGrade}
                     hook={setSearchGrade}
                  />
               </Row>
            </>
         }
         view={
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
            />
         }
         current={current}
         next={next}
         previous={previous}
         setCurrent={setCurrent}
      />
   );
};

export default AcceptStudents;