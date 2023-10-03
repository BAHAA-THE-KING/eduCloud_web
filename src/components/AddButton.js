

export function AddButton({text, handlPop}) {

  return(
    <div 
      className="text-purple ms-auto bg-white add-grade-btn rounded fw-bold pointer"
      onClick={() => {console.log(`clicked`); return handlPop()}}
    >
      + {text}
    </div>
  )

}