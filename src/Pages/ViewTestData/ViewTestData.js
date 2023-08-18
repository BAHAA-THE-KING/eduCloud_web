import { ListOfButtons, InputWithLabel, Multiple, Navigation } from "../../components";
import { useMemo, useEffect, useState } from "react";
import * as handlers from './../../handlers';
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";

function ViewTestData() {
   const navigate = useNavigate();
   const { id } = useParams();

   const [title, setTitle] = useState("");
   const [passMark, setPassMark] = useState("");
   const [maxMark, setMaxMark] = useState("");
   const [date, setDate] = useState("");
   const [type, setType] = useState("");
   const [theClassName, setTheClassName] = useState("");
   const [subjectName, setSubjectName] = useState("");
   const [gradeName, setGradeName] = useState("");

   const [types, setTypes] = useState([]);

   const [isEdit, setIsEdit] = useState(false);

   const [current, setCurrent] = useState(0);
   const [next, setNext] = useState(null);
   const [previous, setPrevious] = useState(null);
   const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
   const [allData, setAllData] = useState([]);

   useEffect(
      () => {
         handlers.getTestData(
            id,
            test => {
               setTitle(test.title);
               setPassMark(test.min_mark);
               setMaxMark(test.max_mark);
               setDate(test.date);
               setType(test.type.id);
               setTheClassName(test.g_class.name);
               setSubjectName(test.subject.name);
               setGradeName(test.grade.name);
               const temp = test.marks.map(
                  e => {
                     return {
                        mark: e.mark,
                        ...e.student
                     };
                  }
               );
               setAllData(temp);
               setCurrent(1);
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
            key: "id",
            header: "معرف الطالب",
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
            key: "first_name",
            header: "اسم الطالب",
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
            key: "last_name",
            header: "كنية الطالب",
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
            accessorKey: "father_name",
            key: "father_name",
            header: "اسم الأب",
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
            accessorKey: "mother_name",
            key: "mother_name",
            header: "اسم الأم",
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
            accessorKey: "mark",
            key: "mark",
            header: "العلامة",
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
            accessorFn: row => row.id,
            key: "goTo",
            header: "الانتقال لصفحة الطالب",
            Cell: ({ renderedCellValue, row }) => {
               return (
                  <Box
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem"
                     }}
                  >
                     <span>
                        {
                           renderedCellValue && <ListOfButtons
                              data={
                                 [
                                    {
                                       name: "ذهاب",
                                       event: () => navigate(handlers.VIEWSTUDENTDATA + renderedCellValue)
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
                  <Form.Label>عرض اختبار</Form.Label>
                  <ListOfButtons
                     data={
                        [
                           {
                              name: isEdit ? "تأكيد التعديلات" : "تعديل",
                              event: () => {
                                 if (!isEdit) {
                                    setIsEdit(true);
                                 } else {
                                    handlers.editTest(
                                       id,
                                       title,
                                       passMark,
                                       maxMark,
                                       type,
                                       date,
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
                     text="اسم الاختبار"
                     hint="اسم الاختبار"
                     disabled={!isEdit}
                     value={title}
                     hook={setTitle}
                  />
                  <InputWithLabel
                     id="grade"
                     text="الصف"
                     hint="تابع للصف"
                     disabled={true}
                     value={gradeName}
                  />
                  <InputWithLabel
                     id="class"
                     text="الشعبة"
                     hint="تابع للشعبة"
                     disabled={true}
                     value={theClassName}
                  />
                  <InputWithLabel
                     id="subject"
                     text="المادة"
                     hint="تابع للمادة"
                     disabled={true}
                     value={subjectName}
                  />
                  <InputWithLabel
                     id="maxMark"
                     type="number"
                     text="العلامة العليا"
                     hint="العلامة العليا"
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
                     id="passMark"
                     type="date"
                     text="موعد الاختبار"
                     hint="التاريخ"
                     disabled={!isEdit}
                     value={date}
                     hook={setDate}
                  />
                  <Multiple
                     id="type"
                     text="نوع الاختبار"
                     options={types}
                     value={type}
                     hook={setType}
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

export default ViewTestData;