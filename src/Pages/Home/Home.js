import "./Home.css";
import { ButtonList } from "../../components";
import { ADDEMPLOYEE, ADDSTUDENT, ADDTEST, ADDTESTFORM, CALENDAR, VIEWMARKS } from "../../handlers";

const shorts = [
   { name: "إضافة طالب", action: ADDSTUDENT },
   { name: "إضافة نموذج اختبار قدرات", action: ADDTESTFORM },
   { name: "إضافة اختبار", action: ADDTEST },
   { name: "إضافة ملاحظة لاستاذ", action: "" },
   { name: "إضافة تقدم دراسي", action: CALENDAR },
   { name: "إضافة ملاحظة لطالب", action: "" },
   { name: "إضافة دور", action: "" },
   { name: "إضافة خطة دراسية", action: CALENDAR },
   { name: "إضافة علامة", action: VIEWMARKS },
   { name: "إضافة عنوان", action: "" },
   { name: "إضافة موظف", action: ADDEMPLOYEE },
   { name: "التأكد من الرسائل", action: "" }
];

function Home() {
   return (
      <div className="home">
         <img src="Images/home.jpg" alt="" className="bg" />
         <div className="leftcenter">
            <ul>
               {shorts.map(e => <ButtonList text={e.name} action={e.action} src="Icons/add.svg" />)}
            </ul>
         </div>
      </div>
   );
}

export default Home;