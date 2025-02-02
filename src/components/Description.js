import React, { useState } from "react";

const Description = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if the description exceeds the max length
  const shouldTrim = text.length > maxLength;
  const trimmedText = shouldTrim ? text.slice(0, maxLength) + "..." : text;

  return (
    <div>
      <p>{isExpanded ? text : trimmedText}</p>
      {shouldTrim && (
        <span cl onClick={() => setIsExpanded(!isExpanded)} className="app-link">
          {isExpanded ? "View Less" : "View More"}
        </span >
      )}
    </div>
  );
};

export default Description;