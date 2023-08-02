import "./AddStudent.css";

import { TextInput, Button, Title, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
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
   const [transportationSubscriber, setTransportationSubscriber] = useState("");
   const [address, setAddress] = useState("");
   const [registrationPlace, setRegistrationPlace] = useState("");
   const [registrationNumber, setRegistrationNumber] = useState("");
   const [registrationDate, setRegistrationDate] = useState("");
   const [notes, setNotes] = useState("");
   const [type, setType] = useState(1);

   let [grades, setGrades] = useState([]);
   let [gradeName, setGradeName] = useState("");

   useEffect(
      function () {
         handler.getGrades(
            grades => setGrades(grades)
         );
      },
      []
   );


   return (
      <div className="addstudent">
         <img src="../Images/addemployee.png" alt="" className="bg" />
         <Title text="تسجيل طالب" />
         <div className="content">
            <form>
               <label>اسم الطالب :</label>
               <TextInput defaultValue={firstName} inputHook={setFirstName} editable={true} enterHook={() => { }} hint="الاسم" />
               <br />
               <label>كنية الطالب :</label>
               <TextInput defaultValue={lastName} inputHook={setLastName} editable={true} enterHook={() => { }} hint="الكنية" />
               <br />
               <label>تاريخ الولادة :</label>
               <TextInput type="date" defaultValue={birthDate} inputHook={setBirthDate} editable={true} enterHook={() => { }} hint="تاريخ الولادة" />
               <br />
               <label>مكان الولادة :</label>
               <TextInput defaultValue={birthPlace} inputHook={setBirthPlace} editable={true} enterHook={() => { }} hint="مكان الولادة" />
               <br />
               <label>السكن :</label>
               <TextInput defaultValue={placeOfLiving} inputHook={setPlaceOfLiving} editable={true} enterHook={() => { }} hint="مكان السكن" />
               <br />
               <label>{"الصف : " + gradeName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر الصف"
                  currentData={grade}
                  options={grades}
                  dataHook={setGrade}
                  textHook={setGradeName}
               />
               <br />
               <label>السجل العام :</label>
               <TextInput defaultValue={publicRecord} inputHook={setPublicRecord} editable={true} enterHook={() => { }} hint="السجل العام" />
               <br />
               <label>الوضع الاجتماعي :</label>
               <TextInput defaultValue={socialDescription} inputHook={setSocialDescription} editable={true} enterHook={() => { }} hint="الحالة الاجتماعية" />
               <br />
               <label>علامة الصف السادس :</label>
               <TextInput defaultValue={the6GradeAvg} inputHook={setThe6GradeAvg} editable={true} enterHook={() => { }} hint="علامة الصف السادس" />
               <br />
               <label>المدرسة السابقة :</label>
               <TextInput defaultValue={previousSchool} inputHook={setPreviousSchool} editable={true} enterHook={() => { }} hint="اسم المدرسة السابقة" />
               <br />
               <label>اسم الأب :</label>
               <TextInput defaultValue={fatherName} inputHook={setFatherName} editable={true} enterHook={() => { }} hint="اسم الأب" />
               <br />
               <label>هل الأب على قيد الحياة :</label>
               <TextInput type="checkbox" defaultValue={fatherAlive} inputHook={setFatherAlive} editable={true} enterHook={() => { }} hint="الأب على قيد الحياة" />
               <br />
               <label>مهنة الأب :</label>
               <TextInput defaultValue={fatherProfession} inputHook={setFatherProfession} editable={true} enterHook={() => { }} hint="اسم المهنة" />
               <br />
               <label>اسم الجد (أب الأب) :</label>
               <TextInput defaultValue={grandFatherName} inputHook={setGrandFatherName} editable={true} enterHook={() => { }} hint="اسم الجد" />
               <br />
               <label>اسم الأم :</label>
               <TextInput defaultValue={motherName} inputHook={setMotherName} editable={true} enterHook={() => { }} hint="اسم الأم" />
               <br />
               <label>كنية الأم :</label>
               <TextInput defaultValue={motherLastName} inputHook={setMotherLastName} editable={true} enterHook={() => { }} hint="كنية الأم" />
               <br />
               <label>المواصلات :</label>
               <TextInput type="checkbox" defaultValue={transportationSubscriber} inputHook={setTransportationSubscriber} editable={true} enterHook={() => { }} hint="اشتراك بالمواصلات" />
               <br />
               <label>خط المواصلات :</label>
               <TextInput defaultValue={address} inputHook={setAddress} editable={true} enterHook={() => { }} hint="عنوان بالمواصلات" />
               <br />
               <label>مكان التسجيل :</label>
               <TextInput defaultValue={registrationPlace} inputHook={setRegistrationPlace} editable={true} enterHook={() => { }} hint="الفرع" />
               <br />
               <label>رقم التسجيل :</label>
               <TextInput defaultValue={registrationNumber} inputHook={setRegistrationNumber} editable={true} enterHook={() => { }} hint="رقم التسجيل" />
               <br />
               <label>تاريخ التسجيل :</label>
               <TextInput type="date" defaultValue={registrationDate} inputHook={setRegistrationDate} editable={true} enterHook={() => { }} hint="تاريخ التسجيل" />
               <br />
               <label>ملاحظات :</label>
               <TextInput defaultValue={notes} inputHook={setNotes} editable={true} enterHook={() => { }} hint="ملاحظات الطالب" />
               <br />
               <label>سيخضع لسبر ترشيحي :</label>
               <TextInput type="checkbox" defaultValue={type} inputHook={setType} editable={true} enterHook={() => { }} hint="هل سيخضع الطالب لسبر ترشيحي" />
               <br />
               <Button
                  text="إدخال"
                  hook={
                     e => {
                        e.preventDefault();
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
                           transportationSubscriber,
                           address,
                           registrationPlace,
                           registrationNumber,
                           registrationDate,
                           notes,
                           () => {
                              handler.goTo(handler.ADDSTUDENT);
                           }
                        );
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default AddStudent;