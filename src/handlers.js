//paths
const Home = "/";
const Login = "/login";
const addEmployee = "/employee/add";

const host = "http://127.0.0.1:8000/V1.0";

function login(name, password) {
   const path = "/auth/login";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
   };

   const body = JSON.stringify({ "user_name": name, "password": password });

   fetch(url, { method, headers, body })
      .then(
         e => {
            if (e.status >= 500) {
               alert("خطأ في السيرفر، تواصل مع المطور لحل المشكلة");
               return;
            }
            return e.json();
         }
      )
      .then(
         e => {
            if (e.message === "logged in successfully") {
               localStorage.setItem("auth", JSON.stringify(e.data));
               goTo(Home);
            } else if (e.message.indexOf("(") >= 0) {
               alert(e.errors.user_name[0] + "\n" + e.errors.password[0]);
            } else {
               alert(e.message);
            }
         }
      )
      .catch(
         err => {
            alert("An Error Occured.");
            console.log(err);
         }
      );
}

function goTo(path) {
   window.location.pathname = path;
}
export { login };