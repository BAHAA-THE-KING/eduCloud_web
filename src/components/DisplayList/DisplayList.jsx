import styles from "./DisplayList.module.css";

import { Accordion } from "react-bootstrap";
import ViewTable from "../ViewTable/ViewTable";


function DisplayList({ list }) {
  return (
    <Accordion defaultActiveKey={[]} alwaysOpen>
      {
        list.map(
          item => (
            <Accordion.Item key={item.id} eventKey={"" + item.id} className={`border-0 ${styles.displayList} ${styles.item}`}>
              <Accordion.Header dir="rtl">{item.header}</Accordion.Header>
              <Accordion.Body style={{ backgroundColor: "transparent" }}>
                <ViewTable headers={item.list.headers} rows={item.list.items} />
              </Accordion.Body>
            </Accordion.Item>
          )
        )
      }
    </Accordion>
  );
}

export default DisplayList;