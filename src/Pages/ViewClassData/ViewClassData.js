import { InputWithLabel, ListOfButtons } from "../../components";
import { useEffect, useMemo, useState } from "react";
import * as handler from '../../handlers';
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import { ViewInterface } from '../../Interfaces';

function ViewClassData() {

   const navigate = useNavigate();

   const { id } = useParams();

   const [name, setName] = useState("");
   const [maxNum, setMaxNum] = useState("");
   const [gradeName, setGradeName] = useState("");

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState([]);

   useEffect(
      function () {
         handler.getClassData(
            id,
            data => {
               setName(data.name);
               setMaxNum(data.max_number);
               setGradeName(data.grade.name);
               const subs = [];
               let teachers = [];
               data.subjects.map(e => {
                  subs.push({ id: e.id, name: e.name, type: "subject" });
                  e.teachers.map(e => {
                     teachers = teachers.filter(ee => ee.id !== e.id);
                     teachers.push({ id: e.id, name: e.first_name + " " + e.last_name, type: "teacher" })
                  });
               });
               const supervisors = [];
               data.supervisors.map(e => supervisors.push({ id: e.id, name: e.name, type: "supervisor" }))
               const temp = [...subs, ...teachers, ...supervisors];
               setAllData(temp);
               setCurrent(1);
            }
         )
      },
      []
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
      [current]
   );

   const [isEdit, setIsEdit] = useState(false);

   const columns = useMemo(
      () => [
         {
            accessorKey: "id",
            header: "المعرف",
            Cell: ({ renderedCellValue }) => (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "1rem"
                  }}
               >
                  <span>{renderedCellValue}</span>
               </Box>
            )
         },
         {
            accessorKey: "type",
            header: "النوع",
            Cell: ({ renderedCellValue }) => (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "1rem"
                  }}
               >
                  <span>{renderedCellValue}</span>
               </Box>
            )
         },
         {
            accessorKey: "name",
            header: "اسم",
            Cell: ({ renderedCellValue }) => (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "1rem"
                  }}
               >
                  <span>{renderedCellValue}</span>
               </Box>
            )
         },
         {
            accessorFn: e => e.type,
            key: "goTo",
            header: "الانتقال لصفحة المدرس",
            Cell: ({ renderedCellValue, row }) => {
               const id = row.getAllCells().find(e => e.id.indexOf("id") != -1)?.renderValue();
               return (
                  id && <Box
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem"
                     }}
                  >
                     <span>
                        {
                           <ListOfButtons
                              data={
                                 [
                                    {
                                       name: "ذهاب",
                                       event: () =>
                                          renderedCellValue === "class" ?
                                             navigate(handler.VIEWCLASSDATA + id)
                                             : (
                                                renderedCellValue === "subject" ?
                                                   navigate(handler.VIEWSUBJECTDATA + id)
                                                   : (
                                                      (renderedCellValue === "teacher" || renderedCellValue === "supervisor") ?
                                                         navigate(handler.VIEWEMPLOYEEDATA + id)
                                                         : ""
                                                   )
                                             )
                                    }
                                 ]
                              }
                           />
                        }
                     </span>
                  </Box>
               );
            }
         }
      ],
      [data]
   );

   return (
      <ViewInterface
         control={
            <Form className="text-start">
               <Form.Label>عرض الشعبة</Form.Label>
               <ListOfButtons
                  data={
                     [
                        {
                           name: isEdit ? "تأكيد التعديلات" : "تعديل",
                           event: () => {
                              if (!isEdit) {
                                 setIsEdit(true);
                              } else {
                                 handler.editClass(
                                    id,
                                    name,
                                    maxNum,
                                    () => {
                                       setIsEdit(false);
                                    }
                                 );
                              }
                           }
                        }
                     ]
                  }
               />
               <InputWithLabel
                  id="name"
                  text="اسم الشعبة"
                  hint="مثال: الأولى"
                  disabled={!isEdit}
                  value={name}
                  hook={setName}
               />
               <InputWithLabel
                  id="maxNum"
                  type="number"
                  text="العدد الأقصى للطلاب"
                  hint="عدد الطلاب"
                  disabled={!isEdit}
                  value={maxNum}
                  hook={setMaxNum}
               />
               <InputWithLabel
                  id="grade"
                  text="الصف الذي تتبع له"
                  hint="اسم الصف"
                  disabled={true}
                  value={gradeName}
               />
            </Form>
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
   );
}

export default ViewClassData;