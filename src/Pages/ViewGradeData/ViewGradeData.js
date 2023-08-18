import { TextInput, Title, ButtonWithIcon, InputWithLabel, ListOfButtons, Navigation } from "../../components";
import { useEffect, useMemo, useState } from "react";
import * as handler from '../../handlers';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Col, Container, Row } from "react-bootstrap";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";

function ViewGradeData() {
   const navigate = useNavigate();

   const { id } = useParams();

   let [name, setName] = useState("");

   useEffect(
      function () {
         handler.getGradeData(
            id,
            data => {
               setName(data.name);
               const temp = [];
               temp.push(...data.supervisors.map(e => { return { id: e.id, name: e.first_name + " " + e.last_name, type: "supervisor" }; }));
               temp.push(...data.teachers.map(e => { return { id: e.id, name: e.first_name + " " + e.last_name, type: "teacher" }; }));
               temp.push(...data.g_classes.map(e => { return { id: e.id, name: e.first_name + " " + e.last_name, type: "class" }; }));
               temp.push(...data.subjects.map(e => { return { id: e.id, name: e.first_name + " " + e.last_name, type: "subject" }; }));
               setAllData(temp);
               setCurrent(1);
            }
         )
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState([]);

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
      <Container fluid>
         <Row className="mt-2">
            <Col xs='2'>
               <Form className='text-start'>
                  <Form.Label>عرض الصف</Form.Label>
                  <ListOfButtons
                     data={
                        [
                           {
                              name: isEdit ? "تأكيد التعديلات" : "تعديل",
                              event: () => {
                                 if (!isEdit) {
                                    setIsEdit(true);
                                 } else {
                                    handler.editGrade(
                                       id,
                                       name,
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
                     text="اسم الصف"
                     hint="مثال: التاسع"
                     disabled={!isEdit}
                     value={name}
                     hook={setName}
                  />
               </Form>
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
            </Col>
         </Row>
         <Navigation current={current} next={next} previous={previous} setCurrent={setCurrent} />
      </Container>
   );
}

export default ViewGradeData;