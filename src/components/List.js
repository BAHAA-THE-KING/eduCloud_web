import { Dropdown, Form } from "react-bootstrap";

function List({ title, opitons, value, setValue }) {
   return (
      <Dropdown style={{ width: "unset" }}>
         <Dropdown.Toggle variant="secondary">{title}</Dropdown.Toggle>
         <Dropdown.Menu>
            {
               opitons.map(
                  option => {
                     const checked = !!value.find(e => e === option.id);
                     return <Dropdown.Item
                        style={{
                           display: "flex",
                           flexFlow: "nowrap row",
                           justifyContent: "flex-start",
                           alignItems: "center"
                        }}
                        onClick={
                           () => {
                              let newValue;
                              if (checked) {
                                 newValue = value.filter(e => e !== option.id);
                              } else {
                                 newValue = [...value, option.id];
                              }
                              console.log(newValue)
                              setValue(newValue)
                           }
                        }
                     >
                        <Form.Check
                           type="checkbox"
                           checked={checked}
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

export default List;