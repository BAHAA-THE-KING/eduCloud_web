import { useEffect, useMemo, useRef, useState } from "react";
import * as handlers from "../../handlers";
import { ViewInterface } from "../../Interfaces";
import { ListOfButtons, Multiple } from "../../components";
import { Row } from "react-bootstrap";

function AnalyzeTests() {
   const [data, setData] = useState([]);
   const [grades, setGrades] = useState([]);
   const [classes, setClasses] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [types, setTypes] = useState([]);

   const [labels, setLabels] = useState([]);
   const [values, setValues] = useState([]);

   useEffect(
      () => {
         handlers.getSubjects(
            data => {
               setGrades(data);
               setClasses(data.map(e => e.g_classes).flat());
               setSubjects(data.map(e => e.subjects).flat());
            }
         );
         handlers.getTestForms(
            data => {
               setTypes(data);
            }
         );
      },
      []
   );

   useEffect(
      () => {
         setValues(data.map(e => e.values));
         const newLabels = new Set(data.map(e => e.labels).flat());
         const labels = [];
         newLabels.forEach(e => labels.push(e));
         labels.sort();
         setLabels(labels);
      },
      [data]
   );

   const can = document.querySelector("#can");

   function draw(labels, values, mouse) {
      if (can) {
         const minX = 50;
         const maxX = 1200;
         const minY = 50;
         const maxY = 600;
         const colors = ["#5f27cd", "#ee5253", "#ff9f43", "#48dbfb", "#222f3e", "#f368e0"];

         const c = can.getContext("2d");

         c.clearRect(0, 0, 1250, 650);

         c.textAlign = 'center';

         c.save();
         c.fillStyle = "white";
         c.fillRect(0, 0, 1250, 650);
         c.restore();

         c.save();
         c.strokeStyle = "black";
         c.lineWidth = 1;
         c.beginPath();
         c.moveTo(minX, maxY);
         c.lineTo(maxX, maxY);
         c.closePath();
         c.stroke();

         c.beginPath();
         c.moveTo(minX, minY);
         c.lineTo(minX, maxY);
         c.closePath();
         c.stroke();
         c.restore();

         function calcY(y) {
            if (y === undefined) return undefined;
            return maxY - (maxY - minY) * y / 100;
         }

         c.save();
         c.fillStyle = "black";
         c.font = "15px Arial";
         c.fillText("100", minX - 10, calcY(100) + 10);
         c.fillText("75", minX - 10, calcY(75) + 10);
         c.fillText("50", minX - 10, calcY(50) + 10);
         c.fillText("25", minX - 10, calcY(25) + 10);
         c.fillText("0", minX - 10, calcY(0));

         const cLabels = {};
         labels.map(
            (e, i) => cLabels[e] = i * (maxX - minX) / (labels.length - 1) + minX
         );

         //for (const k in cLabels) {
         //   const e = cLabels[k];
         //   c.fillText(k, e, maxY + 20);
         //}
         c.restore();

         ////Gradient
         //c.save();
         //values.map(
         //   (e, i) => {
         //      if (!e.length) return;
         //      const min = {};
         //      min.x = e.reduce((p, e) => Math.min(cLabels[e.x], cLabels[p.x] ?? p));
         //      min.y = e.reduce((p, e) => Math.min(calcY(e.y), calcY(p.y) ?? p));
         //
         //      const max = {};
         //      max.x = e.reduce((p, e) => Math.max(cLabels[e.x], cLabels[p.x] ?? p));
         //      max.y = e.reduce((p, e) => Math.max(calcY(e.y), calcY(p.y) ?? p));
         //
         //      const grad = c.createLinearGradient((max.x + min.x) / 2, min.y, (max.x + min.x) / 2, maxY - 10);
         //      grad.addColorStop(0, colors[i] + "DE");
         //      grad.addColorStop(0.35, colors[i] + "DE");
         //      grad.addColorStop(1, "white");
         //      c.fillStyle = grad;
         //      c.beginPath();
         //      c.moveTo(min.x, maxY - 10);
         //      e.map(
         //         e => {
         //            const x = cLabels[e.x];
         //            const y = calcY(e.y);
         //            c.lineTo(x, y);
         //         }
         //      );
         //      c.lineTo(max.x, maxY - 10);
         //      c.closePath();
         //      c.fill();
         //   }
         //);
         //c.restore();

         //Lines
         c.save();
         values.map(
            (e, i) => {
               c.beginPath();
               c.strokeStyle = colors[i];
               c.lineWidth = 3;
               e.map(
                  (e, i) => {
                     const x = cLabels[e.x];
                     const y = maxY - (maxY - minY) * e.y / 100;
                     if (!i) {
                        c.moveTo(x, y);
                     } else {
                        c.lineTo(x, y);
                     }
                     c.stroke();
                  }
               );
            }
         );
         c.restore();

         //Circles
         c.save();
         values.map(
            (e, i) => {
               e.map(
                  e => {
                     const x = cLabels[e.x];
                     const y = maxY - (maxY - minY) * e.y / 100;
                     let r = 8;
                     if (mouse.x !== undefined && mouse.y !== undefined) {
                        if (Math.hypot(mouse.x - x, mouse.y - y) <= 30) {
                           r = 13;
                        }
                     }

                     c.save();
                     c.fillStyle = "white";
                     c.strokeStyle = colors[i];
                     c.lineWidth = 3;
                     c.beginPath();
                     c.arc(x, y, r, 0, 2 * Math.PI);
                     c.closePath();
                     c.fill();
                     c.stroke();
                     c.restore();
                  }
               );
            }
         );
         c.restore();

         //Info
         c.save();
         values.map(
            (e, i) => {
               e.map(
                  e => {
                     const x = cLabels[e.x];
                     const y = maxY - (maxY - minY) * e.y / 100;
                     if (mouse.x !== undefined && mouse.y !== undefined) {
                        if (Math.hypot(mouse.x - x, mouse.y - y) <= 30) {
                           c.save();
                           c.lineWidth = 2;
                           c.fillStyle = "white";
                           c.strokeStyle = colors[i];
                           c.fillRect(x - 60, y + 10, 120, 80);
                           c.strokeRect(x - 60, y + 10, 120, 80);
                           c.restore();

                           c.save();
                           c.fillStyle = "black";
                           c.font = "18px Arial";
                           c.fillText("المتوسط: " + e.y, x, y + 35);
                           c.fillText("التاريخ:", x, y + 55);
                           c.fillText(e.x, x, y + 75);
                           c.restore();
                        }
                     }
                  }
               );
            }
         );
         c.restore();
      }
   }

   const mouse = { x: undefined, y: undefined };

   const requestRef = useRef();

   const animate = () => {
      draw(labels, values, mouse);
      requestRef.current = requestAnimationFrame(animate);
   }

   useEffect(
      () => {
         requestRef.current = requestAnimationFrame(animate);
         return () => cancelAnimationFrame(requestRef.current);
      }
   );

   useEffect(
      () => {
         if (can) {
            window.onmousemove = function (e) {
               const rect = can.getBoundingClientRect();
               mouse.x = e.clientX - rect.left;
               mouse.y = e.clientY - rect.top;
            };

            can.setAttribute("width", "1250px");
            can.setAttribute("height", "650px");
         }
      },
      [can, labels, values]
   );

   function getTests(e, i) {
      e.controller?.abort();
      if (!e.grade || !e.classes.length || !e.subjects.length || !e.types.length) {
         setData(data.map((ee, ii) => ii === i ? { ...ee, labels: [], values: [] } : ee));
         return;
      }
      e.controller = new AbortController();
      handlers.getTests(
         e.controller,
         "",
         "",
         e.types,
         e.subjects,
         e.classes,
         "",
         "",
         tests => {
            const labels = tests.map(e => e.date);
            const values = tests.map(e => ({ x: e.date, y: e.avg }));
            const controller = new AbortController();
            setData(data.map((ee, ii) => ii === i ? { ...ee, labels, values, controller } : ee));
         }
      );
   }

   return (
      <ViewInterface
         control={
            <>
               <ListOfButtons
                  data={
                     [
                        {
                           name: "إضافة خط",
                           event: () => setData(
                              [
                                 ...data,
                                 {
                                    grade: "",
                                    classes: [],
                                    subjects: [],
                                    types: [],
                                    controller: new AbortController(),
                                    labels: [],
                                    values: []
                                 }
                              ]
                           )
                        }
                     ]
                  }
               />
               <Row className="text-start overflow-y-scroll overflow-x-hidden" style={{ height: "75vh" }}>
                  {
                     data.map(
                        (e, i) =>
                           <Row
                              key={i}
                              className="py-2 m-2"
                              style={{
                                 height: "fit-content",
                                 border: "3px #AAA solid",
                                 borderRadius: "10px"
                              }}
                           >
                              <Multiple
                                 id={"grade-" + i}
                                 text="الصف"
                                 options={grades}
                                 value={e.grade}
                                 hook={
                                    grade => {
                                       setData(
                                          data.map(
                                             (ee, ii) =>
                                                (i === ii) ?
                                                   {
                                                      grade,
                                                      classes: [],
                                                      subjects: [],
                                                      types: [],
                                                      controller: new AbortController(),
                                                      labels: [],
                                                      values: []
                                                   }
                                                   : ee
                                          )
                                       );
                                    }
                                 }
                              />
                              <Multiple
                                 id={"class-" + i}
                                 text="الشعب"
                                 multiple={true}
                                 options={classes.filter(ee => ee.grade_id === e.grade)}
                                 value={e.classes}
                                 hook={
                                    classes => {
                                       e.classes = classes;
                                       setData(data.map((ee, ii) => ii === i ? e : ee))
                                       getTests(e, i);
                                    }
                                 }
                              />
                              <Multiple
                                 id={"subject-" + i}
                                 multiple={true}
                                 text="المادة"
                                 options={subjects.filter(ee => ee.grade_id === e.grade)}
                                 value={e.subjects}
                                 hook={
                                    subjects => {
                                       e.subjects = subjects;
                                       setData(data.map((ee, ii) => ii === i ? e : ee))
                                       getTests({ ...e, subjects }, i);
                                    }
                                 }
                              />
                              <Multiple
                                 id={"type-" + i}
                                 text="النوع"
                                 multiple={true}
                                 options={types}
                                 value={e.types}
                                 hook={
                                    types => {
                                       e.types = types;
                                       setData(data.map((ee, ii) => ii === i ? e : ee))
                                       getTests({ ...e, types }, i);
                                    }
                                 }
                              />
                           </Row>
                     )
                  }
               </Row>
            </>
         }
         view={
            <canvas id="can" style={{ border: "1px solid black", borderRadius: "5px" }}></canvas>
         }
         navigation={false}
      />
   );
}

export default AnalyzeTests;