//paths
const HOME = "/";
const LOGIN = "/login";
const ADDEMPLOYEE = "/employee/add";
const ADDTEACHER = "/teacher/add";
const ADDSUPERVISOR = "/supervisor/add";
const ADDSTUDENT = "/student/add";
const VIEWEMPLOYEE = "/employee";
const VIEWEMPLOYEEDATA = "/employee/view/";

const host = "http://127.0.0.1:8000/V1.0";

function getToken() {
   return JSON.parse(localStorage.getItem("auth")).token;
}

function goTo(path) {
   window.location.pathname = path;
}

function getRoles(func) {
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
            if (e["message"] === "Unauthenticated.") {
               goTo(LOGIN);
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

function getSubjects(func) {
   const path = "/general/getAllGradesWithClassesAndSubjects";

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
            if (e["message"] === "Unauthenticated.") {
               goTo(LOGIN);
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

function getEmployees(func, params) {
   const path = "/principal/employeeSearch/";

   const url = host + path + params;

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
            if (e["message"] === "results found successfully.") {
               func(e.data);
            } else if (e["message"] === "Unauthenticated.") {
               goTo(LOGIN);
            } else if (e["message"] === "no results found") {
               func({
                  current_page: 1,
                  next_page_url: null,
                  prev_page_url: null,
                  data: []
               });
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

function getEmployeeData(id, func) {
   const path = "/principal/viewEmployee/";

   const url = host + path + id;

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
            if (e["message"] === "Unauthenticated.") {
               goTo(LOGIN);
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

function logIn(name, password) {
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
               goTo(HOME);
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

function addEmployee(name, surname, roles, func) {
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
               func(e.data.employee);
            } else if (e.message.indexOf("(") >= 0) {
               alert(
                  ((e.errors.first_name) ? e.errors.first_name[0] : "\b") + "\n" +
                  ((e.errors.last_name) ? e.errors.last_name[0] : "\b") + "\n" +
                  ((e.errors.roles) ? e.errors.roles[0] : "")
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

function addTeacher(employeeId, arrayOfData, func) {
   const path = "/principal/assign_Class_Subject_ToTeacher/" + employeeId;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(arrayOfData);

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
            if (e.message === "Success!") {
               alert(e.message);
               func();
            } else if (e.message.indexOf("(") >= 0) {
               alert(e.message);
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

function addSupervisor(employeeId, arrayOfData, func) {
   const path = "/principal/assignClassesToSupervisor/" + employeeId;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "classes": arrayOfData });

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
            if (e.message === "Success!") {
               alert(e.message);
               func();
            } else if (e.message.indexOf("(") >= 0) {
               alert(
                  ((e.errors.first_name) ? e.errors.first_name[0] : "\b") + "\n" +
                  ((e.errors.last_name) ? e.errors.last_name[0] : "\b") + "\n" +
                  ((e.errors.roles) ? e.errors.roles[0] : "")
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

function editEmployee(id, name, surname, func) {
   const path = "/principal/editEmployee/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "first_name": name, "last_name": surname });

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
            if (e.message === "Success!!") {
               func();
            } else if (e.message.indexOf("(") >= 0) {
               alert(
                  ((e.errors.first_name) ? e.errors.first_name[0] : "\b") + "\n" +
                  ((e.errors.last_name) ? e.errors.last_name[0] : "\b") + "\n" +
                  ((e.errors.roles) ? e.errors.roles[0] : "")
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

function addEmployeeRole(id, role, func) {
   const path = "/principal/assignRolesToEmployee/";

   const url = host + path + id;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "roles": [role] });

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
            if (e.message === "Success!") {
               func();
            } else if (e.message.indexOf("(") >= 0) {
               alert(
                  ((e.errors.first_name) ? e.errors.first_name[0] : "\b") + "\n" +
                  ((e.errors.last_name) ? e.errors.last_name[0] : "\b") + "\n" +
                  ((e.errors.roles) ? e.errors.roles[0] : "")
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

function removeEmployeeRole(id, role, func) {
   const path = "/principal/removeRolesFromEmployee/";

   const url = host + path + id;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "roles": [role] });

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
            if (e.message === "Success!") {
               func();
            } else if (e.message.indexOf("(") >= 0) {
               alert(
                  ((e.errors.first_name) ? e.errors.first_name[0] : "\b") + "\n" +
                  ((e.errors.last_name) ? e.errors.last_name[0] : "\b") + "\n" +
                  ((e.errors.roles) ? e.errors.roles[0] : "")
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


export { HOME, LOGIN, ADDEMPLOYEE, ADDTEACHER, ADDSUPERVISOR, VIEWEMPLOYEE, ADDSTUDENT, VIEWEMPLOYEEDATA, goTo, getRoles, getSubjects, getEmployees, getEmployeeData, logIn, addEmployee, addTeacher, addSupervisor, editEmployee, addEmployeeRole, removeEmployeeRole };