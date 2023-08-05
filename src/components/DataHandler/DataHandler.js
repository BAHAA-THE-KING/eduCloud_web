import './DataHandler.css';

import { DataChunck } from '..';

function DataHandler(props) {
   const gradesWithNames = {};
   props.allGrades.map(e => gradesWithNames[e.id] = e.name);

   return (
      <div className='datahandler'>
         {
            props.selectedData.map(
               (e, i) => {
                  const grade = props.allGrades.filter(elm => elm.id === e.grade_id)[0];
                  if (!grade) return;
                  const subject = grade.subjects.filter(elm => elm.id === e.subject_id)[0]?.name;
                  const classes = grade.g_classes.map(elm => (e.classes_id.indexOf(elm.id + "") > -1) ? elm.name : undefined).filter(e => e);

                  return <DataChunck
                     editable={props.editable}
                     hasButtonSelection={props.hasButtonSelection}

                     mainText={gradesWithNames[e.grade_id]}

                     buttonSelectionOptions={grade.subjects}
                     buttonSelectedText={subject}
                     buttonSelectedData={e.subject_id}
                     buttonSelectHook={id => props.addSubjectToGrade(i, id)}

                     checkboxSelectionOptions={grade.g_classes}
                     checkboxSelectedText={classes}
                     checkboxSelectedData={e.classes_id.map(e => Number(e))}
                     checkboxSelectHook={classes => props.addClassesToGrade(i, classes)}

                     removeDataHook={() => props.removeGrade(i)}
                  />
               }
            )
         }
      </div>
   );
}

export default DataHandler;