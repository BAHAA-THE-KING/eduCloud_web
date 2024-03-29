//paths
const HOME = "/";
const LOGIN = "/login";

const ADDEMPLOYEE = "/employee/add";
const ADDTEACHER = "/teacher/add";
const ADDSUPERVISOR = "/supervisor/add";
const VIEWEMPLOYEES = "/employee";
const VIEWEMPLOYEEDATA = "/employee/view/";

const ADDTESTFORM = "/test-form/add";
const VIEWTESTFORMS = "/test-form";
const VIEWTESTFORMDATA = "/test-form/view/";

const ADDSTUDENT = "/student/add";
const VIEWSTUDENTS = "/student/";
const VIEWSTUDENTDATA = "/student/view/";

const ADDTEST = "/test/add";
const VIEWTESTS = "/test";
const VIEWMARKS = "/test/marks";
const VIEWTESTDATA = "/test/view/";
const ANALYZETESTS = "/test/analyze";

const ADDGRADE = "/grade/add";
const VIEWGRADES = "/grade";
const VIEWGRADEDATA = "/grade/view/";

const ADDCLASS = "/class/add";
const VIEWCLASSES = "/class";
const VIEWCLASSDATA = "/class/view/";

const ADDSUBJECT = "/subject/add";
const VIEWSUBJECTS = "/subject";
const VIEWSUBJECTDATA = "/subject/view/";

const ADDABILITYTESTFORM = "/ability-test-form/add";
const VIEWABILITYTESTFORMS = "/ability-test-form";
const VIEWABILITYTESTFORMDATA = "/ability-test-form/view/";

const CALENDAR = {
   main: "/calendar",
   subjects: "/subject",
   school: "/school",
   class: "/class",
   study: "/study",
};

export const SCHOOL = {
   main: "/school",
   classes: "/classes",
   student: "/student",
   school: "/grades"
}

const ACCEPTSTUDENTS = "/student/accept";
const SELECTSTUDENTS = "/student/select";
const DISTRIBUTESTUDENTS = "/student/distribute";

const host = "http://localhost:8000/V1.0";
//const host = "https://bdh.point-dev.nl/V1.0";

function proccess(url, method, headers, body, signal, onSuccess, onError, onEnd) {
   fetch(url, { method, headers, body, signal })
      .then(
         e => {
            if (e.status >= 500)
               throw new Error("Server Error");
            else if (e.status !== 200)
               throw e.json();
            return e.json();
         }
      )
      .then(
         data => {
            onSuccess(data);
         }
      )
      .catch(
         err => {
            if (err.message === "Server Error") {
               onError("خطأ في السيرفر، تواصل مع المطور لحل المشكلة");
            } else if (err.name === "AbortError") {
            } else if (err instanceof Promise) {
               err.then(
                  error => {
                     if (error === "Unauthenticated.") {
                        goTo(LOGIN);
                     } else {
                        onError(error.message || error.title || error);
                     }
                  }
               )
            } else {
               onError(err);
            }
         }
      ).finally(
         () => {
            onEnd();
         }
      );
}

function getToken() {
   return JSON.parse(localStorage.getItem("auth")).token;
}

function logOut() {
   localStorage.removeItem("auth");
   goTo(LOGIN);
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

function getGrades(func) {
   const path = "/general/getAllGrades";

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getGradeData(id, func) {
   const path = "/principal/viewGrade/" + id;

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getClassData(id, func) {
   const path = "/supervisor/getGClass/" + id;

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getClassesAndSubjects(controller, onSuccess, onError, onEnd) {
   const path = "/general/getAllGradesWithClassesAndSubjects";

   const url = host + path;

   const method = "GET";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const signal = controller.signal;

   proccess(url, method, headers, null, signal, onSuccess, onError, onEnd);
}

function getSubjectData(id, func) {
   const path = "/principal/viewSubject/" + id;

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function regeneratePassword(id, func) {
   const path = "/principal/regenerateEmployeePassword/";

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
            } else if (e.maessage === "password changed successfully.") {
               func(e.data);
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

function getTestForms(func) {
   const path = "/general/getAllTypes";

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getTestFormData(id, func) {
   const path = "/general/getNameOfType/" + id;

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
            } else if (e.message === "Success!") {
               func(e.data);
            } else if (e.message === "this type id is not valid") {
               alert("Test Form Not Found");
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

function getTests(controller, page, title, types, subjects, classes, startDate, endDate, func) {
   const path = "/supervisor/searchTests?";

   const params = [];
   if (!!page) params.push("page=" + page);
   if (!!title) params.push("title=" + title);
   if (!!types.length) types.map((e, i) => params.push("type_ids[" + i + "]=" + e));
   if (!!subjects.length) subjects.map((e, i) => params.push("subject_ids[" + i + "]=" + e));
   if (!!classes.length) classes.map((e, i) => params.push("g_class_ids[" + i + "]=" + e));
   if (!!startDate) params.push("start_date=" + startDate);
   if (!!endDate) params.push("end_date=" + endDate);

   const url = host + path + params.join("&");

   const method = "GET";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const signal = controller.signal;

   fetch(url, { method, headers, signal })
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
            } else if (e.message === "tests found successfully") {
               func(e.data);
            }
         }
      )
      .catch(
         err => {
            if (err.name === "AbortError") return;
            alert("An Error Occured.");
            console.log(err);
         }
      );
}

function getTestData(id, func) {
   const path = "/supervisor/getTest/" + id;

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getStudents(search, page, grade, theClass, hasClass, controller, onSuccess, onError, onEnd) {
   const path = "/supervisor/studentSearch?";

   const params = [];
   if (!!search) params.push("search=" + search);
   if (!!page) params.push("page=" + page);
   if (!!grade) params.push("grade_id=" + grade);
   if (!!theClass) params.push("class_id=" + theClass);
   if (theClass ?? false) params.push("hasClass=" + (+hasClass));

   const url = host + path + params.join("&");

   const method = "GET";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const signal = controller.signal;

   proccess(url, method, headers, undefined, signal, onSuccess, onError, onEnd)
}

function getBaseCalendar(grades, subjects, controller, onSuccess, onError, onEnd) {
   const path = "/supervisor/getCalendar?";

   const params = [];
   if (!!grades.length) grades.map((e, i) => params.push("grade_ids[" + i + "]=" + e));
   if (!!subjects.length) subjects.map((e, i) => params.push("subject_ids[" + i + "]=" + e));

   const url = host + path + params.join("&");

   const method = "GET";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const signal = controller.signal;

   proccess(url, method, headers, null, signal, onSuccess, onError, onEnd);
}

function getProgressCalendar(subjects, theClass, controller, onSuccess, onError, onEnd) {
   const path = "/supervisor/getProgressOfClass?";

   const params = [];
   params.push("g_class_id=" + theClass);
   if (!!subjects.length) subjects.map((e, i) => params.push("subject_ids[" + i + "]=" + e));

   const url = host + path + params.join("&");

   const method = "GET";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const signal = controller.signal;

   proccess(url, method, headers, null, signal, onSuccess, onError, onEnd);
}

function getCandidateToOfficial(grade, minNum, func) {
   const path = "/secretary/candidateToOfficial/view/" + grade + "?min_percentage=" + minNum;

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getMarks(test, func) {
   const path = "/supervisor/testMarks/" + test;

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getRemainingStudents(test, func) {
   const path = "/supervisor/getRemainingStudentsForTest/" + test;

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
            } else if (e.message === "here are the students who's mark was't inserted yet:") {
               func(e.data);
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

function getAbilityTests(subject, func) {
   const path = "/supervisor/getAbilityTestsOf/";

   const url = host + path + subject;

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
            } else if (e.message === "Success!") {
               func(e.data);
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

function getStudentData(id, controller, onSuccess, onError, onEnd) {
   const path = "/general/viewStudent/";

   const params = "?all=1";

   const url = host + path + id + params;

   const method = "GET";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const signal = controller.signal;

   proccess(url, method, headers, undefined, signal, onSuccess, onError, onEnd);
}

function logIn(name, password, controller, onSuccess, onError, onEnd) {
   const path = "/auth/login";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
   };

   const body = JSON.stringify({ "user_name": name, "password": password });

   const signal = controller.signal;

   proccess(url, method, headers, body, signal, onSuccess, onError, onEnd);
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

function addEmployeeRole(id, roles, func) {
   const path = "/principal/assignRolesToEmployee/";

   const url = host + path + id;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "roles": roles });

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

function addTestForm(name, func) {
   const path = "/supervisor/addTestType";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "name": name });

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
            if (e.message === "type added successfully") {
               alert("Success!");
               func(e.data);
            } else if (e.message === "The name has already been taken.") {
               alert(e.errors.name);
            } else if (e.message === "The name field is required.") {
               alert(e.errors.name);
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

function addTest(title, passMark, maxMark, type, date, theClass, subject, func) {
   const path = "/supervisor/addTest";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "title": title,
         "min_mark": passMark,
         "max_mark": maxMark,
         "date": date,
         "type_id": type,
         "g_class_id": theClass,
         "subject_id": subject,
         "image_url": "asd",
      }
   );

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
            if (e.message === "test created successfully") {
               alert("Success!");
               func();
            } else if (e.message === "this title is already in use for this subject and class") {
               alert("Choose Another Title.");
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

function addStudent(type, firstName, lastName, birthDate, birthPlace, placeOfLiving, grade, publicRecord, socialDescription, the6GradeAvg, previousSchool, fatherName, fatherAlive, fatherProfession, grandFatherName, motherName, motherLastName, motherAlive, transportationSubscriber, address, registrationPlace, registrationNumber, registrationDate, notes, func) {
   const path = "/secretary/addStudentOrCandidate/" + +type;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "first_name": firstName,
         "last_name": lastName,
         "birth_date": birthDate,
         "birth_place": birthPlace,
         "place_of_living": placeOfLiving,
         "grade_id": grade,
         "public_record": publicRecord,
         "social_description": socialDescription,
         "6th_grade_avg": the6GradeAvg,
         "previous_school": previousSchool,
         "father_name": fatherName,
         "father_alive": fatherAlive,
         "father_profession": fatherProfession,
         "grand_father_name": grandFatherName,
         "mother_name": motherName,
         "mother_last_name": motherLastName,
         "mother_alive": motherAlive,
         "transportation_subscriber": transportationSubscriber,
         "address_id": address,
         "registration_place": registrationPlace,
         "registration_number": registrationNumber,
         "registration_date": registrationDate,
         "notes": notes
      }
   );

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
               alert("Success!");
               func();
            } else if (e.message.indexOf("The selected") === 0) {
               alert("Invalid Student.");
            } else if (e.message.indexOf("been marked as absent for today or is entered twice") !== -1) {
               alert("The Students Marked Already.");
            } else if (e.message.indexOf("belong to this class") !== -1) {
               alert("The Student Doesn't Belong To The Class.");
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

function addAbsents(class_id, students, func) {
   const path = "/supervisor/todaysAbsences";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "class_id": class_id,
         "absences": Object.entries(students).map(
            e => {
               return {
                  "student_id": e[0],
                  "justification": e[1]
               };
            }
         )
      }
   );

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
               alert("Success!");
               func();
            } else if (e.message.indexOf("The selected") === 0) {
               alert("Invalid Student.");
            } else if (e.message.indexOf("been marked as absent for today or is entered twice") !== -1) {
               alert("The Students Marked Already.");
            } else if (e.message.indexOf("belong to this class") !== -1) {
               alert("The Student Doesn't Belong To The Class.");
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

function addGrade(name, func) {
   const path = "/principal/addGrade";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "name": name });

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
               alert("Success!");
               func();
            } else if (e.message === "This grade is already in the system") {
               alert(e.errors.name);
            } else if (e.message === "The name field is required.") {
               alert(e.errors.name);
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

function addClass(name, grade, maxNumber, func) {
   const path = "/principal/addClassesToGrade/" + grade;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      [
         {
            "name": name,
            "max_number": maxNumber
         }
      ]
   );

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
            if (e.message === "Classes created successfully") {
               alert("Success!");
               func();
            } else if (e.message === "This grade is already in the system") {
               alert(e.errors.name);
            } else if (e.message === "The name field is required.") {
               alert(e.errors.name);
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

function addSubject(name, grade, maxMark, passMark, notes, func) {
   const path = "/principal/addSubjectsToGrade/" + grade;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      [
         {
            "name": name,
            "max_mark": maxMark,
            "min_mark": passMark,
            "notes": notes,
         }
      ]
   );

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
            if (e.message === "Classes created successfully") {
               alert("Success!");
               func();
            } else if (e.message === "This grade is already in the system") {
               alert(e.errors.name);
            } else if (e.message === "The name field is required.") {
               alert(e.errors.name);
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

function addAbilityTestForm(subject, name, isEntry, sections, func) {
   const path = "/supervisor/addAbilityTestForm/" + subject;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "title": name,
         "is_entry_test": isEntry,
         "sections": sections,
      }
   );

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
            if (e.message === "Classes created successfully") {
               alert("Success!");
               func();
            } else if (e.message === "This grade is already in the system") {
               alert(e.errors.name);
            } else if (e.message === "The name field is required.") {
               alert(e.errors.name);
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

function addCalendar(grade, subject, title, date, is_test, onSuccess, onError, onEnd) {
   const path = "/principal/addBaseCalendar/";

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      [
         {
            "title": title,
            "is_test": +is_test,
            "subject_id": subject,
            "grade_id": grade,
            "date": date
         }
      ]
   );

   proccess(url, method, headers, body, undefined, onSuccess, onError, onEnd);
}

function addCandidateToOfficial(grade, selectedStudents, func) {
   const path = "/secretary/candidateToOfficial/perform/" + grade;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "ids": selectedStudents
      }
   );

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
            if (e.message.indexOf("Success!") === 0) {
               alert("Success!");
               func(e.data);
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

function addStudentsToClasses(grade, force, assignments, func) {
   const path = "/secretary/addOrMoveStudentsToClasses/" + grade;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "allowMoving": force,
         "assignments": assignments
      }
   );

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
            if (e.message.indexOf("Success!") === 0) {
               alert("Success!");
               func();
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

function addStudentsToClassesAutomatically(students, classes, type, func) {
   const path = "/secretary/automaticStudentsDistribution/" + type;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "force": true,
         "students_ids": students,
         "classes_ids": classes
      }
   );

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
               func(e.data);
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

function editTestForm(id, name, func) {
   const path = "/supervisor/editTestType/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "name": name });

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
            if (e.message === "type edited successfully") {
               alert("Success!");
               func(e.data);
            } else if (e.message === "The name has already been taken.") {
               alert(e.errors.name);
            } else if (e.message === "The name field is required.") {
               alert(e.errors.name);
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

function editTest(id, title, passMark, maxMark, type, date, func) {
   const path = "/supervisor/editTest/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "title": title,
         "min_mark": passMark,
         "max_mark": maxMark,
         "type_id": type,
         "date": date,
         "image_url": "none",
      }
   );

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
            if (e.message === "test info updated successfully") {
               alert("Success!");
               func();
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

function addMarks(test, marks, func) {
   const path = "/supervisor/addTestMarks/" + test;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      Object.entries(marks).map(
         e => {
            return {
               "student_id": e[0],
               "mark": e[1]
            };
         }
      )
   );

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
            if (e.message === "marks added successfully") {
               alert("Success!");
               func();
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

function editGrade(id, name, func) {
   const path = "/principal/editGrade/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify({ "name": name });

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
               alert("Success!");
               func();
            } else if (e.message === "Failed. The grade you entered is already in the system!") {
               alert("The name has already been taken.");
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

function editClass(id, name, maxNum, func) {
   const path = "/principal/editClass/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "name": name,
         "max_number": maxNum
      }
   );

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
               alert("Success!");
               func();
            } else if (e.message === "Failed. The grade you entered is already in the system!") {
               alert("The name has already been taken.");
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

function editSubject(id, name, maxMark, passMark, notes, func) {
   const path = "/principal/editSubject/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };
   const body = JSON.stringify(
      {
         "name": name,
         "max_mark": maxMark,
         "min_mark": passMark,
         "notes": notes
      }
   );

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
               alert("Success!");
               func();
            } else if (e.message === "Failed. The grade you entered is already in the system!") {
               alert("The name has already been taken.");
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

function editCalendar(id, grade, subject, title, date, is_test, onSuccess, onError, onEnd) {
   const path = "/principal/editBaseCalendar/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      [
         {
            "title": title,
            "date": date,
            "is_test": is_test,
            "subject_id": subject,
            "grade_id": grade
         }
      ]
   );

   proccess(url, method, headers, body, undefined, onSuccess, onError, onEnd);
}

function editMark(id, mark, func) {
   const path = "/supervisor/editMark/" + id;

   const url = host + path;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };
   const body = JSON.stringify(
      {
         "mark": mark
      }
   );

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
            if (e.message === "mark changed successfully") {
               alert("Success!");
               func();
            } else if (e.message === "Failed. The grade you entered is already in the system!") {
               alert("The name has already been taken.");
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

function removeEmployeeRole(id, roles, func) {
   const path = "/principal/removeRolesFromEmployee/";

   const url = host + path + id;

   const method = "POST";

   const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + getToken()
   };

   const body = JSON.stringify(
      {
         "roles": [...roles]
      }
   );

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

export { goTo, HOME, LOGIN, ADDEMPLOYEE, ADDTEACHER, ADDSUPERVISOR, VIEWEMPLOYEES, ADDSTUDENT, VIEWEMPLOYEEDATA, ADDTESTFORM, VIEWTESTFORMS, VIEWTESTFORMDATA, VIEWSTUDENTS, VIEWSTUDENTDATA, ADDTEST, VIEWTESTS, VIEWTESTDATA, ADDGRADE, VIEWGRADES, VIEWGRADEDATA, ADDCLASS, VIEWCLASSES, VIEWCLASSDATA, ADDSUBJECT, VIEWSUBJECTS, VIEWSUBJECTDATA, ADDABILITYTESTFORM, CALENDAR, ACCEPTSTUDENTS, VIEWMARKS, SELECTSTUDENTS, DISTRIBUTESTUDENTS, VIEWABILITYTESTFORMS, VIEWABILITYTESTFORMDATA, ANALYZETESTS };
export { logIn, logOut, getRoles, getClassesAndSubjects };
export { addEmployee, addTeacher, addSupervisor, addEmployeeRole, getEmployees, getEmployeeData, regeneratePassword, editEmployee, removeEmployeeRole };
export { addTestForm, getTestForms, getTestFormData, editTestForm };
export { addTest, getTests, getTestData, editTest };
export { addStudent, addAbsents, getStudents, getStudentData };
export { addGrade, getGrades, getGradeData, editGrade };
export { addClass, getClassData, editClass };
export { addSubject, getSubjectData, editSubject };
export { addAbilityTestForm, getAbilityTests };
export { addCalendar, getBaseCalendar, editCalendar, getProgressCalendar };
export { getCandidateToOfficial, addCandidateToOfficial, addStudentsToClasses, addStudentsToClassesAutomatically };
export { addMarks, getMarks, getRemainingStudents, editMark };