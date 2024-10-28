import React from "react";

const blocks = [
  { name: "Warm-Up", percentage: 75, distance: 3 },
  { name: "Active", percentage: 115, distance: 3 },
  { name: "Cool Down", percentage: 75, distance: 3 },
  {
    name: "Two-Step Repeat",
    segments: [
      { name: "Easy", percentage: 75, distance: 2 },
      { name: "Hard", percentage: 115, distance: 2 },
    ],
  },
  {
    name: "Ramp Up",
    segments: [
      { name: "Activity 1", percentage: 75, distance: 2 },
      { name: "Activity 2", percentage: 85, distance: 1 },
      { name: "Activity 3", percentage: 95, distance: 1 },
      { name: "Activity 4", percentage: 105, distance: 1 },
    ],
  },
  {
    name: "Ramp Down",
    segments: [
      { name: "Activity 1", percentage: 115, distance: 1 },
      { name: "Activity 2", percentage: 105, distance: 1 },
      { name: "Activity 3", percentage: 95, distance: 1 },
      { name: "Activity 4", percentage: 85, distance: 1 },
    ],
  },
];

const BlockSection = ({ addBlockToGraph }) => {
  return (
    <div className="mt-4 p-4 border-4 border-lightblue-400 rounded-lg">
      <h2 className="text-xl font-bold text-center text-lightblue-400 mb-4">Click or drag the blocks</h2>
      <div className="grid grid-cols-3 gap-4">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="border-2 border-lightblue-400 p-2 cursor-pointer text-center rounded-md bg-blue-100 hover:bg-blue-200 transition duration-200 ease-in-out"
            onClick={() => addBlockToGraph(block)}
            draggable
            onDragEnd={(e) => {
              e.preventDefault();
              addBlockToGraph(block);
            }}
          >
            {block.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockSection;
 