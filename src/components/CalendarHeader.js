import { Container } from "react-bootstrap";
import * as handlers from "../handlers";
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
         <div
            style={{
               display: "flex",
               justifyContent: "flex-end",
               alignItems: "center"
            }}>
            {
               sections.map(
                  section =>
                     <Link
                        to={section.to}
                        onClick={() => setPath(section.to)}
                        style={{
                           marginRight: "100px",
                           marginTop: "10px",
                           backgroundColor: path === section.to ? "#2A1F61" : "transparent",
                           padding: "15px 35px",
                           borderRadius: "20px"
                        }}
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