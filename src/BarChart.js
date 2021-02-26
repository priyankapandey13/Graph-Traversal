import React, { useState, useEffect, useRef, useContext } from "react";
import Chartjs from "chart.js";
import { PageContext } from "./BreadthFirstSearch";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

const chartConfig = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "  User interaction % ",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const BarChart = (UpdateNode) => {
  // debugger;
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  const NoOfVertices = useContext(PageContext);
   
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }else{
      return;
    }
  }, []);

  const updateDataset = (
    datasetIndex,
    newData,
    newLabels,
    newbgcolor,
    newbdrcolor
  ) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.data.labels = newLabels;
    chartInstance.data.datasets[
      datasetIndex
    ].backgroundColor = newbgcolor.map((items) =>
      items === "SERVICE"
        ? "rgba(255, 99, 132, 0.2)"
        : "rgba(54, 162, 235, 0.2)"
    );
    chartInstance.data.datasets[
      datasetIndex
    ].borderColor = newbdrcolor.map((items) =>
      items === "SERVICE"
        ? "rgba(255, 99, 132, 0.2)"
        : "rgba(54, 162, 235, 0.2)"
    );
    chartInstance.update();
  };

  const onNodeSelection = () => {
    const newdataArr = [];
    const newlabelArr = [];
    const newtypeArr = [];
    const newbdrcolor = [];

    NoOfVertices[0] &&
      Object.keys(NoOfVertices[0]).map((items, index) => {
        
        newdataArr.push(NoOfVertices[0][items].value);
        newlabelArr.push(NoOfVertices[0][items].label);
        newtypeArr.push(NoOfVertices[0][items].type);
        newbdrcolor.push(NoOfVertices[0][items].type);

        return items;
      });

    updateDataset(0, newdataArr, newlabelArr, newtypeArr, newbdrcolor);
  };

  UpdateNode.Isfound && onNodeSelection();

  return (
    <Row className="chartContainer">
      <canvas ref={chartContainer}>
        <p>Your browser does not support the canvas element.</p>
      </canvas>
    </Row>
  );
};

BarChart.propTypes = {
  UpdateNode: PropTypes.func,
};

export default BarChart;
