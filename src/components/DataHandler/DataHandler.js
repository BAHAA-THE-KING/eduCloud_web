import './DataHandler.css';
import { DataChunck } from '..';

function DataHandler(props) {
   return (
      <div className='datahandler'>
         {
            props.selectedData.map(
               (e, index) => {
                  if (e === undefined) return null;
                  let i;
                  for (i = 0; i < props.fullData.length; i++)
                     if (props.fullData[i].id === e)
                        break;
                  return <DataChunck
                     mainText={props.fullData[i].name}

                     removeDataHook={props.removeDataHook}

                     hasButtonSelection={props.hasButtonSelection}
                     buttonSelectionOptions={props.fullData[i][props.buttonSelectionData]}
                     buttonSelectionHook={props.buttonSelectionHook}

                     checkboxSelectionOptions={props.fullData[i][props.checkboxSelectionData]}
                     checkboxSelectionHook={props.checkboxSelectionHook}

                     index={index}
                     key={index}
                  />;
               }
            )
         }
      </div>
   );
}

export default DataHandler;