import './DataHandler.css';
import { DataChunck } from '..';

function DataHandler(props) {
   return (
      <div className='datahandler'>
         {
            props.selectedGrades.map(
               (e, index) => {
                  if (e === undefined) return null;
                  let i;
                  for (i = 0; i < props.grades.length; i++)
                     if (props.grades[i].id === e)
                        break;
                  const grade = props.grades[i].name;

                  return <DataChunck
                     grade={grade}
                     subjects={props.grades[i].subjects}
                     classes={props.grades[i].g_classes}
                     subjectHook={props.addSubjectToGrade}
                     classHook={props.addClassToSubject}
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