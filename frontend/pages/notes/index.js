import React, { useState, useEffect } from "react";
import Note from "@/components/note";
import Navbar from "@/components/navbar";
import { FaPlus } from "react-icons/fa";
import Draggable from "react-draggable";

const Notes = () => {
  const groups = ["Group 1", "Group 2", "Group 3", "Group 4", "Mathematics", "Physics", "Chemistry", "Computer Science"];
  const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];

  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    getNotes().then((notes) => {
      setNotes(notes);
      console.log("Fetched notes:", notes);
    });
  }, [refresh]);

  async function getNotes() {
    try {
      console.log(localStorage.getItem("email"))
      const url = `https://rgb-hack.vercel.app/api/notes/fetch/${localStorage.getItem("email")}`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const notes = await response.json();
      return notes.map((note) => ({
        ...note,
        position: {
          x: parseInt(note.positionX, 10),
          y: parseInt(note.positionY, 10),
        },
      }));
    } catch (error) {
      console.error("Error fetching notes:", error);
      return [];
    }
  }

  const createNote = (ev) => {
    ev.preventDefault();
    console.log(localStorage.getItem("email"))
    console.log(localStorage.getItem("token")) 
    const url = `https://rgb-hack.vercel.app/api/notes/create/${localStorage.getItem("email")}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: selectedGroup,
        color: selectedColor,
        title: newNoteTitle,
        content: newNoteContent,
        positionX: "0",
        positionY: "0",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setNewNoteTitle("");
        setNewNoteContent("");
        setSelectedGroup("");
        setSelectedColor("");
        console.log("New note created:", json);
        setRefresh(!refresh);
        setIsCreatePopupOpen(false);
      })
      .catch((error) => console.error("Error creating note:", error));
  };

  const deleteNote = (id) => {
    fetch(`https://rgb-hack.vercel.app/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: { 
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-type": "application/json" },
    })
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
        setRefresh(!refresh);
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  const handleDragEnd = (id, newPosition) => {
    console.log(localStorage.getItem("token"))
    console.log(newPosition)
    fetch(`https://rgb-hack.vercel.app/api/notes/updatePosition/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        positionX: newPosition.x,
        positionY: newPosition.y,
      }),
    })
      .then((response) => response.json())
      .then((updatedNote) => {
        console.log("ok")
        setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
      })
      .catch((error) => console.error("Error updating note position:", error));
  };

  const updateNote = (changedNote) => {
    console.log("Updating note:", changedNote);
    fetch(`https://rgb-hack.vercel.app/api/notes/updateContent/${changedNote.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: changedNote.title,
        content: changedNote.content,
        group: changedNote.group,
        color: changedNote.color,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedNote) => {
        console.log("Updated note received from server:", updatedNote);
        setNotes(notes.map((note) => (note._id === changedNote.id ? updatedNote : note)));
      })
      .catch((error) => console.error("Error updating note:", error));
  };

  const resetAllNotes = () => {
    const defaultPosition = { x: 0, y: 0 };
    notes.forEach((note) => {
      handleDragEnd(note._id, defaultPosition);
    });
    setRefresh(!refresh);
  };

  const filteredNotes = notes.filter(
    (note) =>
      (!selectedGroup || note.group === selectedGroup) &&
      (!selectedColor || note.color === selectedColor)
  );

  const openCreateNotePopup = () => {
    setIsCreatePopupOpen(true);
  };

  const closeCreateNotePopup = () => {
    setIsCreatePopupOpen(false);
  };

  const handleNoteClick = ({ type, note }) => {
    if (type === "edit") {
      const noteToEdit = notes.find((n) => n._id === note.id);
      
      if (!noteToEdit) {
        console.error("Note not found:", note.id);
        return;
      }
      
      setEditingNote({
        id: noteToEdit._id,
        title: noteToEdit.title,
        content: noteToEdit.content,
        group: noteToEdit.group,
        color: noteToEdit.color,
      });
      setIsEditPopupOpen(true);
    } else if (type === "view") {
      // Handle view functionality
      console.log("Viewing note:", note);
    }
  };

  return (
    <>
      <div className="bg-black shadow-md">
        <Navbar />
      </div>
      <div className="h-[50rem] w-full dark:bg-black bg-[#EFF1DB]  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      
      
    
      
      <div className="p-0 h-screen pt-36">
        <Draggable><h1 className="text-3xl font-bold mb-4">NOTES</h1></Draggable>
        <div className="flex space-x-4 mb-4">
          <Draggable><select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="p-2 border rounded border-gray-300"
          >
            <option value="">Select Group</option>
            {groups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select></Draggable>
          <Draggable><select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="p-2 border rounded border-gray-300"
          >
            <option value="">Select Color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select></Draggable>
          <Draggable><button
            onClick={resetAllNotes}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Reset
          </button></Draggable>
          <Draggable><button
            onClick={openCreateNotePopup}
            className="p-2 bg-green-500 text-white rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Note
          </button></Draggable>
        </div>

        <div className="flex flex-wrap gap-4">
          {filteredNotes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              position={note.position}
              color={note.color}
              group={note.group}
              onDragEnd={handleDragEnd}
              onDelete={deleteNote}
              onClick={handleNoteClick}
            />
          ))}
        </div>

        {/* Create Note Popup */}
        {isCreatePopupOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Create Note</h2>
              <form onSubmit={createNote}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Group</label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  >
                    <option value="">Select Group</option>
                    {groups.map((group, index) => (
                      <option key={index} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  >
                    <option value="">Select Color</option>
                    {colors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeCreateNotePopup}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Note Popup */}
        {isEditPopupOpen && editingNote && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateNote({
                    id: editingNote.id,
                    title: editingNote.title,
                    content: editingNote.content,
                    group: editingNote.group,
                    color: editingNote.color,
                  });
                  setIsEditPopupOpen(false);
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({
                      ...editingNote,
                      title: e.target.value,
                    })}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({
                      ...editingNote,
                      content: e.target.value,
                    })}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Group</label>
                  <select
                    value={editingNote.group}
                    onChange={(e) => setEditingNote({
                      ...editingNote,
                      group: e.target.value,
                    })}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  >
                    <option value="">Select Group</option>
                    {groups.map((group, index) => (
                      <option key={index} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <select
                    value={editingNote.color}
                    onChange={(e) => setEditingNote({
                      ...editingNote,
                      color: e.target.value,
                    })}
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  >
                    <option value="">Select Color</option>
                    {colors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditPopupOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        )}
      </div>
      </div>
    </>
  );
};

export default Notes;
