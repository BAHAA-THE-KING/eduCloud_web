import styles from "./Cell.module.css";

function Cell({ plan, even, active, setActive }) {
   return (
      <div
         className={`${styles.cell} ${plan.date.getMonth() !== active.getMonth() ? styles.disabled : ""} ${active.toLocaleDateString("en-Gb") === plan.date.toLocaleDateString("en-Gb") ? styles.active : (even ? styles.even : styles.odd)}`}
         onClick={() => setActive(plan.date)}
      >
         <span style={{ flex: "1" }}>
            <h4>
               <b>
                  {
                     plan.date.toLocaleDateString("en-Gb").substring(0, 2)
                  }
               </b>
            </h4>
         </span>
         <span className={styles.listContainer}>
            <ul className={styles.list}>
               {
                  plan.plans.map(
                     plan =>
                        <li
                           key={plan.title}
                           style={{ marginBottom: "5px" }}
                        >
                           <div style={{ whiteSpace: "nowrap" }}>
                              <span
                                 className={`${styles.status} ${plan.status === "completed" ? styles.completed : (plan.status === "pending" ? styles.pending : (plan.status === "skipped" ? styles.skipped : ""))}`}
                              ></span>
                              <span style={{ marginLeft: "5px" }}>
                                 <b>{plan.title}</b>
                              </span>
                           </div>
                        </li>
                  )
               }
            </ul>
         </span>
      </div >
   );
}
export default Cell;