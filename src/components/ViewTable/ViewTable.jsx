import styles from "./ViewTable.module.css";

import { Table } from "react-bootstrap";

function ViewTable({ headers, rows }) {
   return (
      <Table className={`${styles.table}`}>
         <thead className="text-white p-1">
            <tr>
               {
                  headers.map(
                     e =>
                        <th key={e.title + e.name}>{e.title}</th>
                  )
               }
            </tr>
         </thead>
         <tbody>
            {
               rows.map(
                  row =>
                     <tr
                        key={row.id}
                        className="text-purple p-1"
                     >
                        {
                           headers.map(
                              e =>
                                 <td key={row.id + "-" + e.name}>{row[e.name]}</td>
                           )
                        }
                     </tr>
               )
            }
         </tbody>
      </Table>
   );
}

export default ViewTable;