// src/components/SectionList.js
import React from "react";

const SectionList = ({ sections, onSectionSelect }) => {
  return (
    <div>
      <h2>Sections</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id} onClick={() => onSectionSelect(section)}>
            {section.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionList;
