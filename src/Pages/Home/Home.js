import "./Home.css";
import { ButtonList } from "../../components";

const shorts = ["إضافة طالب", "إضافة نموذج اختبار قدرات", "إضافة اختبار", "إضافة ملاحظة لاستاذ", "إضافة تقدم دراسي", "إضافة ملاحظة لطالب", "إضافة دور", "إضافة خطة دراسية", "إضافة علامة", "إضافة عنوان", "إضافة موظف", "التأكد من الرسائل"];

function Home() {
   return (
      <div className="home">
         <img src="Images/home.jpg" alt="" className="bg" />
         <div className="leftcenter">
            <ul>
               {shorts.map(e => <ButtonList text={e} />)}
            </ul>
         </div>
      </div>
   );
}

export default Home;