import styles from "./Loading.module.css";
import { Spinner } from "react-bootstrap";

function Loading() {
   return (
      <div className={styles.loading}>
         <Spinner animation="border" variant="primary" style={{ scale: "2.5" }} />
      </div>
   );
}

export default Loading;