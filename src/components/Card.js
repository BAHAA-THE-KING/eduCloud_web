import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function myCard({ header, image, details, to }) {
   return (
      <Link to={to}>
         <Card
            style={{
               width: "100%",
               maxWidth: "505px",
               height: "100%",
               boxShadow: "1px 1px 5px gray",
               // hover "5px 5px 5px gray"
            }}
            className='text-start px-4 py-4'
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
   );
}
export default myCard;