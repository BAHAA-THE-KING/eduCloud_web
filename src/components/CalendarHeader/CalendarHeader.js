import styles from "./CalendarHeader.module.css";

import { Container } from "react-bootstrap";
import * as handlers from "../../handlers";
import { Link } from "react-router-dom";
import { useState } from "react";

const sections = [
   {
      title: "Subjects plan",
      to: handlers.CALENDAR.main + handlers.CALENDAR.subjects
   },
   {
      title: "School plan",
      to: handlers.CALENDAR.main + handlers.CALENDAR.school
   },
   {
      title: "Class plan",
      to: handlers.CALENDAR.main + handlers.CALENDAR.class
   },
   {
      title: "Study plan",
      to: handlers.CALENDAR.main + handlers.CALENDAR.study
   }
];

function CalendarHeader() {
   const [path, setPath] = useState(window.location.pathname);
   return (
      <Container fluid>
         <div className={styles.header}>
            {
               sections.map(
                  section =>
                     <Link
                        key={section.to}
                        to={section.to}
                        onClick={() => setPath(section.to)}
                        className={styles.link + " " + (path === section.to ? styles.active : "")}
                     >
                        <span
                           style={{
                              color: path === section.to ? "white" : "gray"
                           }}
                        >
                           <b>
                              {section.title}
                           </b>
                        </span>
                     </Link>
               )
            }
         </div>
      </Container>
   );
}

export default CalendarHeader;