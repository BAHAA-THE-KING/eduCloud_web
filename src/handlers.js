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

function roles(func) {
   const path = "/principal/possibleRolesForEmps";

   const url = host + path;

   const method = "GET";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   fetch(url, { method, headers })
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
            if (e["message"] === "Unauthenticated") {
               goTo(Login);
               return;
            }
            func(e);
         }
      )
      .catch(
         err => {
            alert("An Error Occured.");
            console.log(err);
         }
      );
}

function addemployee(name, surname, roles) {
   const path = "/principal/addEmployee";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "first_name": name, "last_name": surname, "roles": roles });

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
            if (e.message === "Employee was added successfully") {
               alert(e.data["account info"].user_name);
               alert(e.data["account info"].password);
               goTo(Home);
            } else if (e.message.indexOf("(") >= 0) {
               alert(
                  (e.errors.first_name) ? e.errors.first_name[0] : "\b" + "\n" +
                     (e.errors.last_name) ? e.errors.last_name[0] : "\b" + "\n" +
                        (e.errors.roles) ? e.errors.roles[0] : ""
               );
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

function getToken() {
   return JSON.parse(localStorage.getItem("auth")).token;
}

function goTo(path) {
   window.location.pathname = path;
}

export { login, roles, addemployee };