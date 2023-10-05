import styles from "./ContextMenu.module.css";

function ContextMenu({ data }) {
   const reversed = window.innerWidth - data.x < 300;
   return (
      <div
         className={styles.context}
         style={{
            left: (!reversed) ? data.x + "px" : "",
            right: (reversed) ? window.innerWidth - data.x + "px" : "",
            borderTopLeftRadius: (!reversed) ? "0px" : "",
            borderTopRightRadius: (reversed) ? "0px" : "",
            top: data.y + "px",
            //transformOrigin: !reversed ? "0 0" : "100% 0"
         }}>
         {
            data.items.map(
               item =>
                  <div
                     key={item.text}
                     style={{ padding: "0 60px" }}
                     className="pointer"
                     onClick={item.func}
                  >
                     {item.text}
                  </div>
            )
         }
      </div>
   );
}

export default ContextMenu;