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
const VIEWTESTDATA = "/test/view/";

const ADDGRADE = "/grade/add";
const VIEWGRADES = "/grade";
const VIEWGRADEDATA = "/grade/view/";

const ADDCLASS = "/class/add";
const VIEWCLASSES = "/class";
const VIEWCLASSDATA = "/class/view/";

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
               return;
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
               return;
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
   const path = "/principal/viewClass/" + id;

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

function getTestForms(func) {
   const path = "/supervisor/getAllTypes";

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
               return;
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

function getTests(params, func) {
   const path = "/supervisor/searchTests?";

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
            if (e["message"] === "Unauthenticated.") {
               goTo(LOGIN);
               return;
            } else if (e.message === "tests found successfully") {
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
               return;
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

function getStudents(params, func) {
   const path = "/supervisor/studentSearch?" + params;

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
            } else if (e.message === "results found successfully") {
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

function addStudent(type, firstName, lastName, birthDate, birthPlace, placeOfLiving, grade, publicRecord, socialDescription, the6GradeAvg, previousSchool, fatherName, fatherAlive, fatherProfession, grandFatherName, motherName, motherLastName, transportationSubscriber, address, registrationPlace, registrationNumber, registrationDate, notes, func) {
   const path = "/secretary/addStudentOrCandidate/" + type;

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

   const body = JSON.stringify({ "class_id": class_id, "absences": students });

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

export { goTo, HOME, LOGIN, ADDEMPLOYEE, ADDTEACHER, ADDSUPERVISOR, VIEWEMPLOYEES, ADDSTUDENT, VIEWEMPLOYEEDATA, ADDTESTFORM, VIEWTESTFORMS, VIEWTESTFORMDATA, VIEWSTUDENTS, VIEWSTUDENTDATA, ADDTEST, VIEWTESTS, VIEWTESTDATA, ADDGRADE, VIEWGRADES, VIEWGRADEDATA, ADDCLASS, VIEWCLASSES, VIEWCLASSDATA };
export { logIn, getRoles, getSubjects };
export { addEmployee, addTeacher, addSupervisor, addEmployeeRole, getEmployees, getEmployeeData, editEmployee, removeEmployeeRole };
export { addTestForm, getTestForms, getTestFormData, editTestForm };
export { addTest, getTests, getTestData, editTest };
export { addStudent, addAbsents, getStudents };
export { addGrade, getGrades, getGradeData, editGrade };
export { addClass, editClass };