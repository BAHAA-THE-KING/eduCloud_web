import { Container, Row } from "react-bootstrap";
import { Card } from "../components";
import * as handlers from '../handlers';
import SideNavbar from "../components/SideNavbar";

const cards = [
   {
      header: "Add new student",
      details:
         <>
            {"start adding student to your school to start a new journy."}
            <br />
            {"You can implement all student information on your system"}
            <br />
            {"(address, phone, parents situation, ...)."}
         </>,
      image: "Images/reading.png",
      to: handlers.ADDSTUDENT
   },
   {
      header: "School marks",
      details:
         <>
            {"You can see here the school marks and situation."}
            <br />
            {"You can enter new marks and compare between students"}
            <br />
            {"and classes and export it to excel."}
         </>,
      image: "Images/books.png",
      to: handlers.VIEWMARKS
   },
   {
      header: "Study plan",
      details:
         <>
            {"start adding student to your school to start a new journy."}
            <br />
            {"You can implement all student information on your system"}
            <br />
            {"(address, phone, parents situation, ...)."}
         </>,
      image: "Images/calender.png",
      to: handlers.CALENDAR
   },
   {
      header: "About us",
      details:
         <>
            {"You can know alot of things about W.ever."}
            <br />
            {"Join us to build more modern useful apps and websites."}
            <br />
            {"Don't forget to rate us on Google Play."}
         </>,
      image: "Images/warning.png",
      to: ""
   },
];

function Home() {
   return (
      <>
      <SideNavbar />
      {/* <Container className="h-100 w-75">
         <Row className="h-25 text-start">
            <div style={{
               position: "relative",
               insetBlockStart: "10%"
            }}
            >
               <span style={{ color: "#281d61" }}>
                  <h1>
                     <b>
                        Home Screen
                     </b>
                  </h1>
                  <p>
                     <span style={{ fontSize: "1.3rem" }}>
                        You can see some categories here, enjoy our app.
                     </span>
                     <br />
                     <span style={{ fontSize: "1rem" }}>
                        You can use the drawer to get to the main topic.
                     </span>
                  </p>
               </span>
            </div>
         </Row>
         <Row
            className="w-100"
            style={{
               display: "grid",
               gridTemplateColumns: "auto auto",
               rowGap: "50px",
               columnGap: "70px"
            }}
         >
            {
               cards.map(
                  card =>
                     <Card
                        header={card.header}
                        image={card.image}
                        details={card.details}
                        to={card.to}
                     />
               )
            }
         </Row>
      </Container> */}
      </>
   );
}

export default Home;