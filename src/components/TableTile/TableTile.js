import './TableTile.css';

function TableTile(props) {
   return (
      <div
         className={"tabletile " + (props.className ?? "") + " " + (props.selected ? "selected" : "")}
         onClick={() => (props.selected) ? props.setSelected(null) : props.setSelected(props.id)}
      >
         <div className='inner'>
            {props.text}
         </div>
      </div>
   );
}

export default TableTile;