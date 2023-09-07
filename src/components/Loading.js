import { Spinner } from "react-bootstrap";

function Loading() {
   return (
      <div style={{
         width: "100%",
         height: "100vh",
         position: "fixed",
         top: 0,
         left: 0,
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: "rgba(0,0,0,0.6)",
         zIndex: "1000000"
      }}>
         <Spinner animation="border" variant="primary" style={{ scale: "2.5" }} />
      </div>
   );
}

export default Loading;