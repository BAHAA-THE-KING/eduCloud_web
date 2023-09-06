function Cell({ plan, odd, active, setActive }) {
   return (
      <div
         style={{
            height: "90px",
            paddingTop: "5px",
            paddingLeft: "20px",
            marginTop: "5px",
            backgroundColor: active.toLocaleDateString("en-Gb") === plan.date.toLocaleDateString("en-Gb") ? "#71B4E8" : (odd ? "#D9D2FE" : "#2A1F61"),
            color: "white",
            opacity: plan.date.getMonth() === active.getMonth() ? 1 : 0.5,
            display: "flex",
            flexFlow: "nowrap row"
         }}
         onClick={() => setActive(plan.date)}
      >
         <span style={{ flex: "1" }}>
            <h4>
               <b>
                  {
                     plan.date.toLocaleDateString("en-Gb").slice(0, 2)
                  }
               </b>
            </h4>
         </span>
         <span
            style={{
               fontSize: "0.75rem",
               flex: "3",
               textAlign: "start",
               overflow: "hidden",
            }}>
            <ul
               style={{
                  listStyle: "none",
                  paddingLeft: "1rem",
                  marginTop: "15px"
               }}>
               {
                  plan.plans.map(
                     plan =>
                        <li
                           key={plan.text}
                           style={{ marginBottom: "5px" }}
                        >
                           <div style={{ whiteSpace: "nowrap" }}>
                              <span
                                 style={{
                                    display: "inline-block",
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: plan.status === "completed" ? "#43E867" : plan.status === "pending" ? "#FFAA64" : plan.status === "skipped" ? "#FD000E" : "gray",
                                    borderRadius: "50%"
                                 }}
                              ></span>
                              <span style={{ marginLeft: "5px" }}>
                                 {plan.text}
                              </span>
                           </div>
                        </li>
                  )
               }
            </ul>
         </span>
      </div>
   );
}
export default Cell;