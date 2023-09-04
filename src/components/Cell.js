function Cell({ active, odd, plans }) {
   return (
      <div
         style={{
            width: "160px",
            paddingLeft: "20px",
            height: "90px",
            paddingTop: "5px",
            backgroundColor: active ? "#71B4E8" : (odd ? "#D9D2FE" : "#2A1F61"),
            color: "white",
            display: "flex",
            flexFlow: "nowrap row"
         }}>
         <span style={{ flex: "1" }}>
            <h4>
               <b>
                  31
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
                  plans.map(
                     plan =>
                        <li style={{ marginBottom: "5px" }} key={plan.text}>
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