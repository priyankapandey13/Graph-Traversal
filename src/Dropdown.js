import "./App.css";
import { Container, Form } from "react-bootstrap";

import nodemap from "./nodemap.json";
import SearchContext from "./BreadthFirstSearch";
import { useState, createContext } from "react";

export const Newbranchname = createContext();

function DropdownFunction() {
  const [Currentnode, setCurrentnode] = useState();
  const [NewbranchInfo] = useState(false);

  return (
    <Container>
      <Newbranchname.Provider value={Currentnode}>
        <Form>
          <Form.Group controlId="updateNode">
            <Form.Label>Select Branch</Form.Label>
            <Form.Control as="select" custom>
              {Object.keys(nodemap).map((items, index) => {
                return (
                  <option
                    href="#"
                    onClick={() => setCurrentnode(items) && NewbranchInfo(true)}
                    key={index}
                  >
                    {" "}
                    {nodemap[items].label}{" "}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form>

        <SearchContext />
      </Newbranchname.Provider>
    </Container>
  );
}

export default DropdownFunction;
