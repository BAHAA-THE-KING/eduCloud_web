import styles from "./MultiList.module.css";
import { Dropdown, Form } from "react-bootstrap";

function MultiList({ title, opitons, value, setValue }) {
   return (
      <Dropdown style={{ width: "unset" }} autoClose="outside">
         <Dropdown.Toggle
            className={`text-black ${styles.toggle}`}
            variant="secondary"
         >
            <span className="text-gray">
               {title}
            </span>
         </Dropdown.Toggle>
         <Dropdown.Menu className={styles.menu}>
            {
               opitons.map(
                  option => {
                     const checked = !!value.find(e => e === option.id);
                     return <Dropdown.Item
                        key={option.id}
                        className={styles.item}
                        onClick={
                           e => {
                              e.preventDefault();
                              let newValue;
                              if (checked) {
                                 newValue = value.filter(e => e !== option.id);
                              } else {
                                 newValue = [...value, option.id];
                              }
                              setValue(newValue)
                           }
                        }
                     >
                        <Form.Check
                           type="checkbox"
                           checked={checked}
                           onChange={() => { }}
                        />
                        <span style={{ marginLeft: "10px" }}>
                           {option.title ?? option.name}
                        </span>
                     </Dropdown.Item>
                  }
               )
            }
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default MultiList;