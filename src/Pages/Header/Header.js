import "./Header.css";
import { Logo, HeaderList } from "../../components";

const titles = ["الطلاب", "الاختبارات", "الخطة الدراسية", "العلامات", "الملاحظات", "الموظفون", "الرسائل"];
function Header() {
   return (
      <header>
         <ul>
            {titles.map(e => <HeaderList title={e} />)}
         </ul>
         <Logo />
      </header>
   );
}

export default Header;