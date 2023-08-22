import { InputWithLabel, ListOfButtons } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ViewInterface } from "../../Interfaces";

function ViewTestFormData() {
   const { id } = useParams();

   let [name, setName] = useState("");

   useEffect(
      function () {
         handler.getTestFormData(
            id,
            data => setName(data.name)
         )
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

   return (
      <ViewInterface
         control={
            <Form className="text-start">
               <Form.Label>عرض النموذج</Form.Label>
               <ListOfButtons
                  data={
                     [
                        {
                           name: isEdit ? "تأكيد التعديلات" : "تعديل",
                           event: () => {
                              if (!isEdit) {
                                 setIsEdit(true);
                              } else {
                                 handler.editTestForm(
                                    id,
                                    name,
                                    () => {
                                       setIsEdit(false);
                                    }
                                 );
                              }
                           }
                        }
                     ]
                  }
               />
               <InputWithLabel
                  id="name"
                  text="اسم النموذج"
                  hint="اسم النموذج"
                  disabled={!isEdit}
                  value={name}
                  hook={setName}
               />
            </Form>
         }
         view={
            <>

            </>
         }
         navigation={false}
      />
   );
}

export default ViewTestFormData;