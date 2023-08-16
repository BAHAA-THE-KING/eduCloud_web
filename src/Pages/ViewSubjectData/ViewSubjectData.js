import { ListOfButtons, InputWithLabel } from "../../components";
import { useEffect, useMemo, useState } from "react";
import * as handler from '../../handlers';
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";

function ViewSubjectData() {
   const navigate = useNavigate();

   const { id } = useParams();

   let [name, setName] = useState("");
   let [maxMark, setMaxMark] = useState("");
   let [passMark, setPassMark] = useState("");
   let [notes, setNotes] = useState("");
   let [gradeName, setGradeName] = useState("");
   let [teachers, setTeachers] = useState([]);

   useEffect(
      function () {
         handler.getSubjectData(
            id,
            subject => {
               setName(subject.name);
               setMaxMark(subject.max_mark);
               setPassMark(subject.min_mark);
               setGradeName(subject.grade.name);
               setNotes(subject.notes);
               const temp = [];
               for (const k of subject.g_classes) {
                  for (const n of k.teachers) {
                     temp.push({ ...n, classId: k.id, className: k.name });
                  }
               }
               setTeachers(temp);
            }
         )
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

   const columns = useMemo(
      () => [
         {
            accessorKey: "classId",
            header: "معرف الشعبة",
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
            accessorKey: "className",
            header: "اسم الشعبة",
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
            accessorKey: "id",
            header: "معرف المدرس",
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
            accessorKey: "first_name",
            header: "اسم المدرس",
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
            accessorKey: "last_name",
            header: "الكنية المدرس",
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
            accessorKey: "id",
            key: "goTo",
            header: "الكنية المدرس",
            Cell: ({ renderedCellValue }) => (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "1rem"
                  }}
               >
                  <span>
                     <ListOfButtons
                        data={
                           [
                              {
                                 name: "الانتقال لصفحة المدرس",
                                 event: () => navigate(handler.VIEWEMPLOYEEDATA + renderedCellValue)
                              }
                           ]
                        }
                     />
                  </span>
               </Box>
            )
         }
      ],
      [teachers]
   );

   return (
      <Container fluid>
         <Row className="mt-2">
            <Col xs='2'>
               <Form className='text-start'>
                  <Form.Label>عرض المادة الدراسية</Form.Label>
                  <ListOfButtons
                     data={
                        [
                           {
                              name: isEdit ? "تأكيد التعديلات" : "تعديل",
                              event: () => {
                                 if (!isEdit) {
                                    setIsEdit(true);
                                 } else {
                                    handler.editSubject(
                                       id,
                                       name,
                                       maxMark,
                                       passMark,
                                       notes,
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
                     text="اسم المادة"
                     hint="مثال: أولى"
                     disabled={!isEdit}
                     value={name}
                     hook={setName}
                  />
                  <Form.Label>{"الصف الذي تتبع له : " + gradeName}</Form.Label>
                  <InputWithLabel
                     id="maxMark"
                     type="number"
                     text="العلامة الكلية"
                     hint="العلامة الكلية"
                     disabled={!isEdit}
                     value={maxMark}
                     hook={setMaxMark}
                  />
                  <InputWithLabel
                     id="passMark"
                     type="number"
                     text="علامة النجاح"
                     hint="علامة النجاح"
                     disabled={!isEdit}
                     value={passMark}
                     hook={setPassMark}
                  />
                  <InputWithLabel
                     id="notes"
                     as="textarea"
                     text="الملاحظات"
                     hint="ملاحظات عن المادة"
                     disabled={!isEdit}
                     value={notes}
                     hook={setNotes}
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
                  data={teachers}
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
               />
            </Col>
         </Row>
      </Container>
   );
}

export default ViewSubjectData;