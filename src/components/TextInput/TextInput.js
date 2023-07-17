import "./TextInput.css";

function TextInput(props) {
   return (
      <div className='text'>
         <input className='inptext' type='text' dir='rtl' placeholder='اسم المستخدم' onChange={e => { props.hook(e.target.value) }} />
         <img className="imgtext" src={(props.type==="user name")?"icons/person.svg":"#"} alt="" />
      </div>
   );
}

export default TextInput;