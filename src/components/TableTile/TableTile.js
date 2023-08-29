import './TableTile.css';

import { TextInput } from '..';

function TableTile(props) {
   return (
      <div
         className={"tabletile " + (props.className ?? "") + " " + (props.selected ? "selected" : "")}
         onClick={() => (props.selected && (!props.editable ?? true)) ? props.setSelected(-1) : props.setSelected(props.id)}
      >
         <div className={'inner' + ((props.editable ?? false) ? " editable" : "")}>
            {
               (props.editable ?? false) ?
                  (<TextInput
                     type="number"
                     hint=""
                     defaultValue={props.text}
                     inputHook={props.inputHook}
                     enterHook={props.enterHook}
                  />)
                  : props.text
            }
         </div>
      </div>
   );
}

export default TableTile;