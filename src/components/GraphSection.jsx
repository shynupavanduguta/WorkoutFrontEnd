import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Droppable, Draggable } from "react-beautiful-dnd";

Chart.register(...registerables);

const GraphSection = ({ graphItems, clearGraph, showIntroText }) => {
  const cumulativeKm = graphItems.flatMap((item) => {
    if (item.segments) {
      let kmSum = 0;
      return item.segments.map((seg) => {
        kmSum += seg.distance;
        return kmSum;
      });
    }
    return [item.distance];
  });

  const flatData = graphItems.flatMap((item) =>
    item.segments ? item.segments.map((seg) => seg.percentage) : [item.percentage]
  );

  const graphData = {
    labels: cumulativeKm,
    datasets: [
      {
        label: "Workout Intensity",
        data: flatData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 150,
        stacked: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        stacked: true,
        ticks: {
          callback: (value) => `${value +1} km`,
          beginAtZero: false, // Start the x-axis at 1
        },
        title: {
          display: true,
          text: "km",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const tooltipItem = tooltipItems[0];
            const index = tooltipItem.dataIndex;
            const item = graphItems[index];
            return item ? item.name : "";
          },
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const item = graphItems[index];
            if (item.segments) {
              const segment = item.segments[tooltipItem.index];
              return `${segment.name}: ${segment.distance} km`;
            }
            return `${item.name}: ${item.distance} km`;
          },
        },
      },
    },
  };

  return (
    <Droppable droppableId="graphItems" direction="horizontal">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="relative border-4 border-blue-500 rounded-lg p-2" style={{ height: "320px", width: "100%" }}>
          {showIntroText && <div className="text-center text-gray-700 font-bold">Drag or click the blocks on  left of display your workout in the graph section</div>}
          <Bar data={graphData} options={options} />
          {graphItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="transition duration-200 ease-in-out absolute top-0 left-0 w-full h-full cursor-pointer"
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button onClick={clearGraph} className="absolute top-2 right-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out">
            Clear All
          </button>
        </div>
      )}
    </Droppable>
  );
};

export default GraphSection;
