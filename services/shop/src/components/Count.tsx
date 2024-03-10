import React, { useState } from "react";
import "@/components/countstyle.scss";

export const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="count">
      <button onClick={() => setCount(count + 1)}>+++</button>
      <span>{count}</span>
    </div>
  );
};
