import React, { useState } from "react";

const App = () => {
  // Sample data for sections, subjects, and students
  const [sections] = useState([
    { id: 1, name: "Section A" },
    { id: 2, name: "Section B" },
    { id: 3, name: "Section C" },
  ]);

  const [subjects] = useState([
    { id: 1, name: "Math" },
    { id: 2, name: "Science" },
    { id: 3, name: "History" },
    { id: 4, name: "English" },
    { id: 5, name: "Geography" },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "Eren Yeager", sectionId: 1 },
    { id: 2, name: "Mikasa Ackerman", sectionId: 1 },
    { id: 3, name: "Armin Arlert", sectionId: 1 },
    { id: 4, name: "Levi Ackerman", sectionId: 1 },
    { id: 5, name: "Erwin Smith", sectionId: 1 },
    { id: 6, name: "Jean Kirstein", sectionId: 2 },
    { id: 7, name: "Sasha Blouse", sectionId: 2 },
    { id: 8, name: "Connie Springer", sectionId: 2 },
    { id: 9, name: "Historia Reiss", sectionId: 3 },
    { id: 10, name: "Ymir", sectionId: 3 },
  ]);

  const [selectedSection, setSelectedSection] = useState(null);
  const [newStudentName, setNewStudentName] = useState("");
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  const filteredStudents = students.filter(
    (student) => student.sectionId === selectedSection?.id
  );

  const handleUpdateStudent = (studentId) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, name: updatedName } : student
    );
    setStudents(updatedStudents);
    setUpdatedName(""); // Clear the input after update
    setStudentToEdit(null); // Close the edit mode
  };

  const handleAddStudent = () => {
    // Check if the student already exists in another section
    const studentExists = students.some(
      (student) => student.name === newStudentName
    );

    if (studentExists) {
      alert("This student is already in another section!");
      return;
    }

    // Add new student to the selected section
    const newStudent = {
      id: students.length + 1,
      name: newStudentName,
      sectionId: selectedSection.id,
    };
    setStudents([...students, newStudent]);
    setNewStudentName(""); // Clear the input after adding
  };

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "20px",
      padding: "20px",
      backgroundColor: "#f4f4f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      fontSize: "24px",
      marginBottom: "20px",
    },
    sectionList: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      padding: "10px",
      margin: "5px 0",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    subjectList: {
      listStyleType: "none",
      padding: "0",
    },
    subjectItem: {
      padding: "10px",
      margin: "5px 0",
      backgroundColor: "#e1e1e1",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    studentList: {
      listStyleType: "none",
      padding: "0",
    },
    studentItem: {
      padding: "10px",
      margin: "5px 0",
      backgroundColor: "#d3f8e2",
      border: "1px solid #ddd",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "space-between",
    },
    input: {
      padding: "5px",
      margin: "10px 0",
      width: "100%",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10px",
    },
    buttonDanger: {
      backgroundColor: "#dc3545",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>School Management System</h1>

      {/* Section List */}
      <div>
        <h2 style={{ textAlign: "center" }}>Sections</h2>
        <ul style={styles.sectionList}>
          {sections.map((section) => (
            <li
              key={section.id}
              onClick={() => handleSectionSelect(section)}
              style={styles.listItem}
            >
              {section.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Subject List (Same for all sections) */}
      {selectedSection && (
        <div>
          <h2 style={{ textAlign: "center" }}>Subjects</h2>
          <ul style={styles.subjectList}>
            {subjects.map((subject) => (
              <li key={subject.id} style={styles.subjectItem}>
                {subject.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Student List for Selected Section */}
      {selectedSection && (
        <div>
          <h2 style={{ textAlign: "center" }}>
            Students in {selectedSection.name}
          </h2>
          <ul style={styles.studentList}>
            {filteredStudents.map((student) => (
              <li key={student.id} style={styles.studentItem}>
                {studentToEdit === student.id ? (
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  student.name
                )}
                <div>
                  {studentToEdit === student.id ? (
                    <button
                      style={styles.button}
                      onClick={() => handleUpdateStudent(student.id)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      style={styles.button}
                      onClick={() => setStudentToEdit(student.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    style={{ ...styles.button, ...styles.buttonDanger }}
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add New Student */}
      {selectedSection && (
        <div>
          <input
            type="text"
            placeholder="Enter new student name"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleAddStudent}>
            Add Student
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
