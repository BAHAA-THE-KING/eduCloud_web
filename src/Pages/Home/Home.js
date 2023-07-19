import "./Home.css";
import { ButtonList } from "../../components";
import { ADDEMPLOYEE, ADDSTUDENT, goTo } from "../../handlers";

const shorts = [
   { name: "إضافة طالب", action: () => { goTo(ADDSTUDENT); } },
   { name: "إضافة نموذج اختبار قدرات", action: () => { } },
   { name: "إضافة اختبار", action: () => { } },
   { name: "إضافة ملاحظة لاستاذ", action: () => { } },
   { name: "إضافة تقدم دراسي", action: () => { } },
   { name: "إضافة ملاحظة لطالب", action: () => { } },
   { name: "إضافة دور", action: () => { } },
   { name: "إضافة خطة دراسية", action: () => { } },
   { name: "إضافة علامة", action: () => { } },
   { name: "إضافة عنوان", action: () => { } },
   { name: "إضافة موظف", action: () => { goTo(ADDEMPLOYEE); } },
   { name: "التأكد من الرسائل", action: () => { } }
];

function Home() {
   return (
      <div className="home">
         <img src="Images/home.jpg" alt="" className="bg" />
         <div className="leftcenter">
            <ul>
               {shorts.map(e => <ButtonList text={e.name} action={e.action} />)}
            </ul>
         </div>
      </div>
   );
}

export default Home;