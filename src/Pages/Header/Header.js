import "./Header.css";
import { Logo, HeaderList } from "../../components";

const titles = ["الطلاب", "الاختبارات", "الخطة الدراسية", "العلامات", "الملاحظات", "الموظفون", "الرسائل"];
const names = ["students", "tests", "schedule", "marks", "notes", "employees", "smss"];

function Header(props) {
   return (
      <header>
         <ul>
            {titles.map((e, i) => <HeaderList title={e} active={props.active === names[i]} />)}
         </ul>
         <Logo />
      </header>
   );
}

export default Header;