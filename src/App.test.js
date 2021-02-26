import { act, render, screen, fireEvent, queryByText, queryByTitle, queryAllByPlaceholderText } from '@testing-library/react';
import App from "./App";
import Dropdown from "./Dropdown";
import BreadthFirstSearch from "./BreadthFirstSearch";
import BarChart from "./BarChart";
import nodemap from "./nodemap.json";

import { unmountComponentAtNode } from "react-dom";

let container;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const fakeUser = { "node1": {
  "label": "Contact Info",
  "value": 100,
  "type": "BASIC",
  "adjList": ["node2", "nodeA"]
 }};  


describe("if the App is called", () => {
  it("The Dropdown function exists", () => {
    expect(typeof Dropdown).toBe("function");
  });

  it("The BreadthFirstSearch function exists", () => {
    expect(typeof BreadthFirstSearch).toBe("function");
  });

  it("The BarChart function exists", () => {
    expect(typeof BarChart).toBe("function");
  });
  
  it("The nodemap function exists", () => {
    expect(typeof nodemap).toBe("object");
  });

})