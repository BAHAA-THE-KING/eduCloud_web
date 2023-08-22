import { ListOfButtons } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import * as handlers from "../../handlers";
import { useNavigate } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { ViewInterface } from '../../Interfaces';

function ViewGrades() {
   const navigate = useNavigate();

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [selected, setSelected] = useState({});
   const [grades, setGrades] = useState([]);

   useEffect(
      () =>
         handlers.getGrades(
            data => {
               setGrades(data.map(e => { return { id: e.id, name: e.name }; }));
               data.length ? setCurrent(1) : setCurrent(0);
            }
         ),
      []
   );
   useEffect(
      () => {
         setPrevious(current - 1);
         const next = current * 10 >= grades.length ? 0 : current + 1;
         setNext(next);
         const start = (current - 1) * Math.floor(grades.length / 10) * 10;
         const end = (current - 1) * Math.floor(grades.length / 10) * 10 + 10;
         const temp = grades.slice(start, end);
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
      <ViewInterface
         control={
            <ListOfButtons
               data={
                  [
                     {
                        name: "إضافة صف",
                        event: () => navigate(handlers.ADDGRADE)
                     },
                     {
                        name: "عرض الصف",
                        event: () => navigate(handlers.VIEWGRADEDATA + data[Object.keys(selected)[0]].id),
                        disabled: !Object.keys(selected).length
                     },
                     {
                        name: "عرض الشعب",
                        event: () => navigate(handlers.VIEWCLASSES)
                     },
                     {
                        name: "عرض المواد",
                        event: () => navigate(handlers.VIEWSUBJECTS)
                     }
                  ]
               }
            />
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
         }
         current={current}
         next={next}
         previous={previous}
         setCurrent={setCurrent}
      />
   )
};

export default ViewGrades;