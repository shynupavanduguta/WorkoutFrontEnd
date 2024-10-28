import React, { useState } from "react";
import BlockSection from "./BlockSection";
import GraphSection from "./GraphSection";
import Summary from "./Summary";
import { DragDropContext } from "react-beautiful-dnd";

const ParentComponent = () => {
  const [graphItems, setGraphItems] = useState([]);
  const [showIntroText, setShowIntroText] = useState(true);

  const addBlockToGraph = (block) => {
    const newBlock = { ...block, id: `${block.name}-${Date.now()}` };
    setGraphItems((prev) => [...prev, newBlock]);
    setShowIntroText(false);
  };

  const clearGraph = () => {
    setGraphItems([]);
    setShowIntroText(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(graphItems);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setGraphItems(reorderedItems);
  };

  return (
    <div className="flex flex-col w-full h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to the Workout App</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row w-full">
          <div className="w-1/3 border-r pr-4">
            <BlockSection addBlockToGraph={addBlockToGraph} />
          </div>
          <div className="w-2/3 flex flex-col">
            <GraphSection graphItems={graphItems} clearGraph={clearGraph} showIntroText={showIntroText} />
            <Summary graphItems={graphItems} setGraphItems={setGraphItems} />
          </div>
        </div>
      </DragDropContext>
      <button className="absolute top-4 right-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out">
        Start Workout
      </button>
    </div>
  );
};

export default ParentComponent;
