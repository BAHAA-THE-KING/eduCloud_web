import styles from "./Card.module.css";

import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function myCard({ header, image, details, to, index, isActive, setActive }) {
   return (
      <div
         className={`text-start p-4 border ${styles.card} ${isActive ? styles.active : ""}`}
      >
         <Link to={to}>
            <Card
               className='border-0'
               onMouseEnter={() => setActive(index)}
               onMouseLeave={() => setActive(null)}
            >
               <Card.Title className={styles.cardTitle}>
                  <span>
                     <h4>
                        <b>
                           {header}
                        </b>
                     </h4>
                  </span>
                  <Image
                     src={image}
                     className={styles.cardImage}
                  />
               </Card.Title>
               <Card.Text>
                  <span className={styles.cardText}>
                     {details}
                  </span>
               </Card.Text>
            </Card>
         </Link>
      </div>
   );
}
export default myCard;