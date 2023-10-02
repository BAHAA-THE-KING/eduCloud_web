import styles from "./List.module.css";
import { Dropdown } from "react-bootstrap";

function List({ title, opitons, value, setValue, mini, className }) {
   return (
      <Dropdown style={{ width: "unset" }}>
         <Dropdown.Toggle
            className={`text-black ${styles.toggle} ${className}`}
            variant="secondary"
            style={{
               width: mini ? "max-content" : ""
            }}
         >
            <span className="text-gray">
               {title}
            </span>
         </Dropdown.Toggle>
         <Dropdown.Menu className={styles.menu}>
            {
               opitons.map(
                  option => {
                     const choosen = value === option.id;
                     return <Dropdown.Item
                        key={option.id}
                        className={`${choosen ? "bg-primary text-white" : ""} ${styles.item}`}
                        onClick={
                           e => {
                              e.preventDefault();
                              let newValue = option.id;
                              setValue(newValue)
                           }
                        }
                     >
                        <span style={{ marginLeft: "10px" }}>
                           {option.title ?? option.name}
                        </span>
                     </Dropdown.Item>
                  }
               )
            }
         </Dropdown.Menu>
      </Dropdown >
   );
}

export default List;