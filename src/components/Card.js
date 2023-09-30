import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function myCard({ header, image, details, to, index, isActive, setActive }) {
   return (
      <div
         style={{
            width: "100%",
            maxWidth: "505px",
            height: "100%",
            backgroundColor: "white",
            boxShadow: isActive ? "10px 10px 5px #80808080" : "1px 1px 5px #808080",
            transitionDuration: "0.2s"
         }}
         className='text-start p-4 border'
      >
         <Link to={to}>
            <Card
               className='border-0'
               onMouseEnter={() => setActive(index)}
               onMouseLeave={() => setActive(null)}
            >
               <Card.Title
                  style={{
                     display: "flex",
                     flexFlow: "nowrap row",
                     justifyContent: "space-between",
                     alignItems: "center"
                  }}
               >
                  <span>
                     <h4>
                        <b>
                           {header}
                        </b>
                     </h4>
                  </span>
                  <Image
                     src={image}
                     style={{
                        width: "60px",
                        height: "60px"
                     }}
                  />
               </Card.Title>
               <Card.Text>
                  <span
                     style={{
                        color: "gray",
                        fontSize: "0.95rem"
                     }}>
                     {details}
                  </span>
               </Card.Text>
            </Card>
         </Link>
      </div>
   );
}
export default myCard;