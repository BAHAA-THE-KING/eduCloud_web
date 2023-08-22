import { Title, InputWithLabel, Multiple } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { useNavigate } from "react-router-dom";
import { AddInterface } from "../../Interfaces";

/*
first_name
last_name
father_name
mother_name
grade_id
birth_date
birth_place
place_of_living
public_record
6th_grade_avg
social_description
grand_father_name
mother_last_name
father_alive
father_profession
previous_school
transportation_subscriber
registration_place
registration_number
registration_date
notes
 */

function AddStudent() {
   const navigate = useNavigate();

   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [birthDate, setBirthDate] = useState("");
   const [birthPlace, setBirthPlace] = useState("");
   const [placeOfLiving, setPlaceOfLiving] = useState("");
   const [grade, setGrade] = useState("");
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
   const [type, setType] = useState(1);

   const [grades, setGrades] = useState([]);

   useEffect(
      function () {
         handler.getGrades(
            grades => setGrades(grades)
         );
      },
      []
   );


   return (
      <AddInterface
         image={
            <img
               src="../Images/addemployee.png"
               alt=""
               style={{
                  width: "40%",
                  position: "fixed",
                  bottom: "0",
                  left: "0"
               }}
            />
         }
         control={
            <>

               <Title text="تسجيل طالب" />
               <InputWithLabel
                  id="name"
                  text="اسم الطالب"
                  hint="الاسم"
                  value={firstName}
                  hook={setFirstName}
               />
               <InputWithLabel
                  id="lastName"
                  text="كنية الطالب"
                  hint="الكنية"
                  value={lastName}
                  hook={setLastName}
               />
               <InputWithLabel
                  id="birthDate"
                  type="date"
                  text="تاريخ الولادة"
                  hint="تاريخ الولادة"
                  value={birthDate}
                  hook={setBirthDate}
               />
               <InputWithLabel
                  id="birthPlace"
                  text="مكان الولادة"
                  hint="مكان الولادة"
                  value={birthPlace}
                  hook={setBirthPlace}
               />
               <InputWithLabel
                  id="address"
                  text="مكان السكن"
                  hint="مكان السكن"
                  value={placeOfLiving}
                  hook={setPlaceOfLiving}
               />
               <Multiple
                  id="grade"
                  text="الصف"
                  options={grades}
                  value={grade}
                  hook={setGrade}
               />
               <InputWithLabel
                  id="public"
                  text="السجل العام"
                  hint="السجل العام"
                  value={publicRecord}
                  hook={setPublicRecord}
               />
               <InputWithLabel
                  id="social"
                  text="الوضع الاجتماعي"
                  hint="الحالة الاجتماعية"
                  value={socialDescription}
                  hook={setSocialDescription}
               />
               <InputWithLabel
                  id="6GradeMark"
                  type="number"
                  text="علامة الصف السادس"
                  hint="علامة الصف السادس"
                  value={the6GradeAvg}
                  hook={setThe6GradeAvg}
               />
               <InputWithLabel
                  id="previouseSchool"
                  text="المدرسة السابقة"
                  hint="اسم المدرسة السابقة"
                  value={previousSchool}
                  hook={setPreviousSchool}
               />
               <InputWithLabel
                  id="fatherName"
                  text="اسم الأب"
                  hint="اسم الأب"
                  value={fatherName}
                  hook={setFatherName}
               />
               <InputWithLabel
                  id="isFatherAlive"
                  type="checkbox"
                  text="هل الأب على قيد الحياة"
                  hint="هل الأب على قيد الحياة"
                  value={fatherAlive}
                  hook={setFatherAlive}
               />
               <InputWithLabel
                  id="fatherJob"
                  text="مهنة الأب"
                  hint="مهنة الأب"
                  value={fatherProfession}
                  hook={setFatherProfession}
               />
               <InputWithLabel
                  id="grandFatherName"
                  text="اسم الجد (أب الأب)"
                  hint="اسم الجد (أب الأب)"
                  value={grandFatherName}
                  hook={setGrandFatherName}
               />
               <InputWithLabel
                  id="motherName"
                  text="اسم الأم"
                  hint="اسم الأم"
                  value={motherName}
                  hook={setMotherName}
               />
               <InputWithLabel
                  id="motherLastName"
                  text="كنية الأم"
                  hint="كنية الأم"
                  value={motherLastName}
                  hook={setMotherLastName}
               />
               <InputWithLabel
                  id="isMotherAlive"
                  type="checkbox"
                  text="هل الأم على قيد الحياة"
                  hint="هل الأم على قيد الحياة"
                  value={motherAlive}
                  hook={setMotherAlive}
               />
               <InputWithLabel
                  id="transportationSubscriber"
                  type="checkbox"
                  text="اشتراك بالمواصلات"
                  hint="اشتراك بالمواصلات"
                  value={transportationSubscriber}
                  hook={setTransportationSubscriber}
               />
               <InputWithLabel
                  id="address"
                  text="خط المواصلات"
                  hint="العنوان للمواصلات"
                  value={address}
                  hook={setAddress}
               />
               <InputWithLabel
                  id="registrationPlace"
                  text="مكان التسجيل"
                  hint="الفرع"
                  value={registrationPlace}
                  hook={setRegistrationPlace}
               />
               <InputWithLabel
                  id="registrationNumber"
                  text="رقم التسجيل"
                  hint="رقم التسجيل"
                  value={registrationNumber}
                  hook={setRegistrationNumber}
               />
               <InputWithLabel
                  id="registrationDate"
                  type="date"
                  text="تاريخ التسجيل"
                  hint="تاريخ التسجيل"
                  value={registrationDate}
                  hook={setRegistrationDate}
               />
               <InputWithLabel
                  id="notes"
                  as="textarea"
                  text="ملاحظات"
                  hint="ملاحظات"
                  value={notes}
                  hook={setNotes}
               />
               <InputWithLabel
                  id="notes"
                  type="switch"
                  text="هل سيخضع لسبر ترشيحي"
                  hint="هل سيخضع لسبر ترشيحي"
                  value={type}
                  hook={setType}
               />
            </>
         }
         addFunc={
            () => {
               handler.addStudent(
                  !type,
                  firstName,
                  lastName,
                  birthDate,
                  birthPlace,
                  placeOfLiving,
                  grade,
                  publicRecord,
                  socialDescription,
                  the6GradeAvg,
                  previousSchool,
                  fatherName,
                  fatherAlive,
                  fatherProfession,
                  grandFatherName,
                  motherName,
                  motherLastName,
                  motherAlive,
                  transportationSubscriber,
                  address,
                  registrationPlace,
                  registrationNumber,
                  registrationDate,
                  notes,
                  () => {
                     navigate(handler.ADDSTUDENT);
                  }
               );
            }
         }
      />
   );
}

export default AddStudent;