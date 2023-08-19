import "./Header.css";

import * as handlers from "../../handlers"
import { Logo, HeaderList } from "../../components";

const titles = [
   "الطلاب",
   "الاختبارات",
   "الخطة الدراسية",
   "العلامات",
   //"الملاحظات",
   "الموظفون",
   "أمور إدارية",
   "الرسائل"
];
const names = [
   "students",
   "tests",
   "calendar",
   "marks",
   //"notes",
   "employees",
   "managements",
   "smss"
];

const actions = [
   handlers.VIEWSTUDENTS,
   handlers.VIEWTESTS,
   handlers.CALENDAR,
   handlers.VIEWMARKS,
   //"",
   handlers.VIEWEMPLOYEES,
   handlers.VIEWGRADES,
   "",
];

function Header(props) {
   return (
      <header>
         <Logo />
         <ul>
            {
               titles.map(
                  (e, i) =>
                     <HeaderList
                        title={e}
                        active={props.active === names[i]}
                        action={actions[i]}
                        key={i}
                     />
               )
            }
         </ul>
      </header>
   );
}

export default Header;