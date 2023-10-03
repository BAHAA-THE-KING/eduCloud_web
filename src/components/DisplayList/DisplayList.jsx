import styles from "./DisplayList.module.css";

import { Accordion } from "react-bootstrap";
import ViewTable from "../ViewTable/ViewTable";


function DisplayList({ list }) {
  return (
    <Accordion defaultActiveKey={[]} alwaysOpen>
      {
        list.map(
          item => (
            <Accordion.Item eventKey={"" + item.id} className={styles.displayList}>
              <Accordion.Header dir="rtl">{item.header}</Accordion.Header>
              <Accordion.Body>
                <ViewTable rows={item.list} />
              </Accordion.Body>
            </Accordion.Item>
          )
        )
      }
    </Accordion>
  );
}

export default DisplayList;