

export function AddButton({text, handlPop}) {

  return(
    <div 
      className="text-purple ms-auto bg-white add-grade-btn rounded fw-bold pointer"
      onClick={() => handlPop()}
    >
      + {text}
    </div>
  )

}