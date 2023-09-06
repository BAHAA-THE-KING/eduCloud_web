

function GradeDropDownMenu(props) {

  // get id, classObject, fun 

  return (
    <>
      <button
        className="btn dropdown-toggle text-gray fw-bold border-0"
        type="button"
        id={`class-dropdown${props.id}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Grade {props.id}
      </button>
      <ul
        className="dropdown-menu pointer"
        aria-labelledby={`class-dropdown${props.id}`}
        onClick={() => {props.fun(props.id);}
        }
      >
        {props.classObject.map((clas) => (
          <li className="text-purple class" key={clas.id}>
            Class {clas.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default GradeDropDownMenu;
