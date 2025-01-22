// import React from "react";
// import Chart from "chart.js";

// export default function CardLineChart() {
//   React.useEffect(() => {
//     const config = {
//       type: "line",
//       data: {
//         labels: [
//           "Semana 1",
//           "Semana 2",
//           "Semana 3",
//           "Semana 4",
//           "Semana 5",
//           "Semana 6",
//           "Semana 7",
//         ],
//         datasets: [
//           {
//             label: `Consultas ${new Date().getFullYear()}`,
//             backgroundColor: "#2dce89",
//             borderColor: "#2dce89",
//             data: [50, 65, 70, 60, 80, 75, 85],
//             fill: false,
//           },
//           {
//             label: `Consultas ${new Date().getFullYear() - 1}`,
//             backgroundColor: "#5e72e4",
//             borderColor: "#5e72e4",
//             data: [45, 60, 65, 55, 70, 68, 80],
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         maintainAspectRatio: false,
//         responsive: true,
//         title: {
//           display: false,
//         },
//         legend: {
//           labels: {
//             fontColor: "rgba(255,255,255,.7)",
//           },
//           align: "end",
//           position: "bottom",
//         },
//         tooltips: {
//           mode: "index",
//           intersect: false,
//         },
//         hover: {
//           mode: "nearest",
//           intersect: true,
//         },
//         scales: {
//           xAxes: [
//             {
//               ticks: {
//                 fontColor: "rgba(255,255,255,.7)",
//               },
//               display: true,
//               scaleLabel: {
//                 display: true,
//                 labelString: "Semanas",
//                 fontColor: "rgba(255,255,255,.7)",
//               },
//               gridLines: {
//                 display: false,
//                 borderDash: [2],
//                 borderDashOffset: [2],
//                 color: "rgba(33, 37, 41, 0.3)",
//                 zeroLineColor: "rgba(0, 0, 0, 0)",
//                 zeroLineBorderDash: [2],
//                 zeroLineBorderDashOffset: [2],
//               },
//             },
//           ],
//           yAxes: [
//             {
//               ticks: {
//                 fontColor: "rgba(255,255,255,.7)",
//               },
//               display: true,
//               scaleLabel: {
//                 display: true,
//                 labelString: "Consultas",
//                 fontColor: "rgba(255,255,255,.7)",
//               },
//               gridLines: {
//                 borderDash: [3],
//                 borderDashOffset: [3],
//                 drawBorder: false,
//                 color: "rgba(255, 255, 255, 0.15)",
//                 zeroLineColor: "rgba(33, 37, 41, 0)",
//                 zeroLineBorderDash: [2],
//                 zeroLineBorderDashOffset: [2],
//               },
//             },
//           ],
//         },
//       },
//     };
//     const ctx = document.getElementById("line-chart").getContext("2d");
//     window.myLine = new Chart(ctx, config);
//   }, []);

//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
//         <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
//           <div className="flex flex-wrap items-center">
//             <div className="relative w-full max-w-full flex-grow flex-1">
//               <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
//                 Resumen Semanal
//               </h6>
//               <h2 className="text-white text-xl font-semibold">
//                 Consultas Atendidas
//               </h2>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 flex-auto">
//           {/* Chart */}
//           <div className="relative h-350-px">
//             <canvas id="line-chart"></canvas>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
