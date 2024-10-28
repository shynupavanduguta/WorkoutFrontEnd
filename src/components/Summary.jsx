import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Summary = ({ graphItems, setGraphItems }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(graphItems);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setGraphItems(reorderedItems);
  };

  const handleEdit = (index) => {
    // Implement your edit functionality here
    console.log(`Edit item at index ${index}`);

    alert(`Edit item at index ${index}`)
  };

  return (
    <Droppable droppableId="summaryItems" direction="vertical">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="mt-4 border-4 border-green-500 rounded-lg p-2 bg-white shadow-md"
        >
          <h2 className="text-lg font-bold text-center text-green-700">Summary</h2>
          {graphItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="my-2 p-4 border border-gray-300 rounded relative text-center bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm"
                >
                  <h3 className="font-bold text-xl text-gray-700">{item.name}</h3>
                  {item.segments ? (
                    item.segments.map((seg, segIndex) => (
                      <div key={segIndex} className="my-1 text-gray-600">
                        {seg.name}: {seg.distance} km, {seg.percentage}%
                      </div>
                    ))
                  ) : (
                    <div className="my-1 text-gray-600">
                      {item.distance} km, {item.percentage}%
                    </div>
                  )}
                  <button
                    onClick={() => handleEdit(index)}
                    className="absolute top-2 right-2 bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-200 ease-in-out"
                  >
                    Edit
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Summary;
