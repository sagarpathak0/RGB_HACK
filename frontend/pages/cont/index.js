// import React from "react";
// import Navbar from "@/components/navbar";
// import BasicPie from "../cont/pie.js";
// import {useState} from "react"

// const Cont = () => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     getNotes().then((notes) => {
//       setNotes(notes);
//       console.log("Fetched notes:", notes);
//     });
//   }, [refresh]);

//   async function getNotes() {
//     try {
//       console.log(localStorage.getItem("email"));
//       const url = `http://localhost:8080/api/notes/fetch/${localStorage.getItem(
//         "email"
//       )}`;
//       console.log("Fetching from URL:", url);
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const notes = await response.json();
//       return notes.map((note) => ({
//         ...note,
//         position: {
//           x: parseInt(note.positionX, 10),
//           y: parseInt(note.positionY, 10),
//         },
//       }));
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//       return [];
//     }
//   }
//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//         <div className="w-1/2 bg-gray-700 rounded-md shadow-md p-4">
//           <BasicPie notes={notes} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cont;
