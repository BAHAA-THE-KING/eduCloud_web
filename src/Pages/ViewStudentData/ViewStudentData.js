import { useEffect, useState } from "react";
import * as handlers from "../../handlers";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { InputWithLabel, ListOfButtons, Multiple } from "../../components";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ViewInterface } from '../../Interfaces';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

function ViewStudentData() {
   const { id } = useParams();

   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [birthDate, setBirthDate] = useState("");
   const [birthPlace, setBirthPlace] = useState("");
   const [placeOfLiving, setPlaceOfLiving] = useState("");
   const [grade, setGrade] = useState("");
   const [theClass, setTheClass] = useState("");
   const [publicRecord, setPublicRecord] = useState("");
   const [socialDescription, setSocialDescription] = useState("");
   const [the6GradeAvg, setThe6GradeAvg] = useState("");
   const [previousSchool, setPreviousSchool] = useState("");
   const [fatherName, setFatherName] = useState("");
   const [fatherAlive, setFatherAlive] = useState("");
   const [fatherProfession, setFatherProfession] = useState("");
   const [grandFatherName, setGrandFatherName] = useState("");
   const [motherName, setMotherName] = useState("");
   const [motherLastName, setMotherLastName] = useState("");
   const [motherAlive, setMotherAlive] = useState("");
   const [transportationSubscriber, setTransportationSubscriber] = useState("");
   const [address, setAddress] = useState("");
   const [registrationPlace, setRegistrationPlace] = useState("");
   const [registrationNumber, setRegistrationNumber] = useState("");
   const [registrationDate, setRegistrationDate] = useState("");
   const [notes, setNotes] = useState("");
   const [marks, setMarks] = useState([]);
   const [subject, setSubject] = useState("");
   const [data, setData] = useState(
      {
         //labels: [0, 1],
         ylabels: [0, 100],
         datasets: [
            {
               label: "",
               data: [1, 1],
               borderColor: 'rgb(53, 162, 235)',
               backgroundColor: 'rgba(53, 162, 235, 0.5)'
            },
         ],
      }
   );

   const [grades, setGrades] = useState([]);
   const [classes, setClasses] = useState([]);
   const [subjects, setSubjects] = useState([]);

   const [isEdit, setIsEdit] = useState(false);

   useEffect(
      () => {
         handlers.getSubjects(
            e => {
               setGrades(e);
               setClasses(e.map(e => e.g_classes).flat());
            }
         );
      },
      []
   );

   useEffect(
      () => {
         handlers.getStudentData(
            id,
            e => {
               setFirstName(e.first_name ?? "");
               setLastName(e.last_name ?? "");
               setBirthDate(e.birth_date ?? "");
               setBirthPlace(e.birth_place ?? "");
               setPlaceOfLiving(e.place_of_living ?? "");
               setGrade(e.grade_id ?? "");
               setTheClass(e.g_class_id ?? "");
               setPublicRecord(e.public_record ?? "");
               setSocialDescription(e.social_description ?? "");
               setThe6GradeAvg(e["6th_grade_avg"] ?? "");
               setPreviousSchool(e.previous_school ?? "");
               setFatherName(e.father_name ?? "");
               setFatherAlive(e.father_alive ?? "");
               setFatherProfession(e.father_profession ?? "");
               setGrandFatherName(e.grand_father_name ?? "");
               setMotherName(e.mother_name ?? "");
               setMotherLastName(e.mother_last_name ?? "");
               setMotherAlive(e.mother_alive ?? "");
               setTransportationSubscriber(e.transportation_subscriber ?? "");
               setAddress(e.address_id ?? "");
               setRegistrationPlace(e.registration_place ?? "");
               setRegistrationNumber(e.registration_number ?? "");
               setRegistrationDate(e.registration_date ?? "");
               setNotes(e.notes ?? "");
               setMarks(e.marks);
            }
         );
      },
      []
   );

   useEffect(
      () => {
         setSubjects(grades.find(ee => ee.id === grade)?.subjects ?? []);
      },
      [grade]
   );

   useEffect(
      () => {
         const temp = marks.filter(e => e.subject_id === subject);
         const temp2 = temp.map(e => e.date);
         const temp3 = temp.map(e => e.percentage);
         setData(
            {
               labels: temp2,
               datasets: [
                  {
                     label: subjects.find(e => e.id === subject)?.name,
                     data: temp3,
                     borderColor: 'rgb(53, 162, 235)',
                     backgroundColor: 'rgba(53, 162, 235, 0.5)'
                  },
               ],
            }
         );
      },
      [subject]
   );

   return (
      <ViewInterface
         control={
            <Form className="text-start">
               <Form.Label>عرض الطالب</Form.Label>
               <ListOfButtons
                  data={
                     [
                        {
                           name: isEdit ? "تأكيد التعديلات" : "تعديل",
                           event: () => {
                              if (!isEdit) {
                                 setIsEdit(true);
                              } else {
                                 setIsEdit(false);
                              }
                           }
                        }
                     ]
                  }
               />
               <Multiple
                  id="subject"
                  text="المادة للعرض"
                  options={subjects}
                  value={subject}
                  hook={setSubject}
               />
               <InputWithLabel
                  id="name"
                  disabled={!isEdit}
                  text="اسم الطالب"
                  hint="الاسم"
                  value={firstName}
                  hook={setFirstName}
               />
               <InputWithLabel
                  id="lastName"
                  disabled={!isEdit}
                  text="كنية الطالب"
                  hint="الكنية"
                  value={lastName}
                  hook={setLastName}
               />
               <InputWithLabel
                  id="birthDate"
                  type="date"
                  disabled={!isEdit}
                  text="تاريخ الولادة"
                  hint="تاريخ الولادة"
                  value={birthDate}
                  hook={setBirthDate}
               />
               <InputWithLabel
                  id="birthPlace"
                  disabled={!isEdit}
                  text="مكان الولادة"
                  hint="مكان الولادة"
                  value={birthPlace}
                  hook={setBirthPlace}
               />
               <InputWithLabel
                  id="address"
                  disabled={!isEdit}
                  text="مكان السكن"
                  hint="مكان السكن"
                  value={placeOfLiving}
                  hook={setPlaceOfLiving}
               />
               <InputWithLabel
                  id="grade"
                  disabled={true}
                  text="الصف"
                  hint="الصف"
                  value={grades.find(e => e.id == grade)?.name ?? ""}
               />
               <InputWithLabel
                  id="class"
                  disabled={true}
                  text="الشعبة"
                  hint="الشعبة"
                  value={classes.find(e => e.id == theClass)?.name ?? ""}
               />
               <InputWithLabel
                  id="public"
                  disabled={!isEdit}
                  text="السجل العام"
                  hint="السجل العام"
                  value={publicRecord}
                  hook={setPublicRecord}
               />
               <InputWithLabel
                  id="social"
                  disabled={!isEdit}
                  text="الوضع الاجتماعي"
                  hint="الحالة الاجتماعية"
                  value={socialDescription}
                  hook={setSocialDescription}
               />
               <InputWithLabel
                  id="6GradeMark"
                  type="number"
                  disabled={!isEdit}
                  text="علامة الصف السادس"
                  hint="علامة الصف السادس"
                  value={the6GradeAvg}
                  hook={setThe6GradeAvg}
               />
               <InputWithLabel
                  id="previouseSchool"
                  disabled={!isEdit}
                  text="المدرسة السابقة"
                  hint="اسم المدرسة السابقة"
                  value={previousSchool}
                  hook={setPreviousSchool}
               />
               <InputWithLabel
                  id="fatherName"
                  disabled={!isEdit}
                  text="اسم الأب"
                  hint="اسم الأب"
                  value={fatherName}
                  hook={setFatherName}
               />
               <InputWithLabel
                  id="isFatherAlive"
                  type="checkbox"
                  disabled={!isEdit}
                  text="هل الأب على قيد الحياة"
                  hint="هل الأب على قيد الحياة"
                  value={fatherAlive}
                  hook={setFatherAlive}
               />
               <InputWithLabel
                  id="fatherJob"
                  disabled={!isEdit}
                  text="مهنة الأب"
                  hint="مهنة الأب"
                  value={fatherProfession}
                  hook={setFatherProfession}
               />
               <InputWithLabel
                  id="grandFatherName"
                  disabled={!isEdit}
                  text="اسم الجد (أب الأب)"
                  hint="اسم الجد (أب الأب)"
                  value={grandFatherName}
                  hook={setGrandFatherName}
               />
               <InputWithLabel
                  id="motherName"
                  disabled={!isEdit}
                  text="اسم الأم"
                  hint="اسم الأم"
                  value={motherName}
                  hook={setMotherName}
               />
               <InputWithLabel
                  id="motherLastName"
                  disabled={!isEdit}
                  text="كنية الأم"
                  hint="كنية الأم"
                  value={motherLastName}
                  hook={setMotherLastName}
               />
               <InputWithLabel
                  id="isFatherAlive"
                  type="checkbox"
                  disabled={!isEdit}
                  text="هل الأم على قيد الحياة"
                  hint="هل الأم على قيد الحياة"
                  value={motherAlive}
                  hook={setMotherAlive}
               />
               <InputWithLabel
                  id="transportationSubscriber"
                  type="checkbox"
                  disabled={!isEdit}
                  text="اشتراك بالمواصلات"
                  hint="اشتراك بالمواصلات"
                  value={transportationSubscriber}
                  hook={setTransportationSubscriber}
               />
               <InputWithLabel
                  id="address"
                  disabled={!isEdit}
                  text="خط المواصلات"
                  hint="العنوان للمواصلات"
                  value={address}
                  hook={setAddress}
               />
               <InputWithLabel
                  id="registrationPlace"
                  disabled={!isEdit}
                  text="مكان التسجيل"
                  hint="الفرع"
                  value={registrationPlace}
                  hook={setRegistrationPlace}
               />
               <InputWithLabel
                  id="registrationNumber"
                  disabled={!isEdit}
                  text="رقم التسجيل"
                  hint="رقم التسجيل"
                  value={registrationNumber}
                  hook={setRegistrationNumber}
               />
               <InputWithLabel
                  id="registrationDate"
                  type="date"
                  disabled={!isEdit}
                  text="تاريخ التسجيل"
                  hint="تاريخ التسجيل"
                  value={registrationDate}
                  hook={setRegistrationDate}
               />
               <InputWithLabel
                  id="notes"
                  as="textarea"
                  disabled={!isEdit}
                  text="ملاحظات"
                  hint="ملاحظات"
                  value={notes}
                  hook={setNotes}
               />
            </Form>
         }
         view={
            <Line options={{ responsive: true, scales: { y: { min: 0, max: 100 } } }} data={data} style={{ position: "fixed" }} />
         }
         navigation={false}
      />
   );
}

export default ViewStudentData;