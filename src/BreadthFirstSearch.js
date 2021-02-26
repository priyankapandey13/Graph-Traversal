import { useState, useEffect, createContext, useContext } from "react";
import nodemap from "./nodemap.json";
import { Newbranchname } from "./Dropdown";
import BarChart from "./BarChart";
export const PageContext = createContext();

const SearchContext = (props) => {
  const [NoOfVertices, SetNoOfVertices] = useState({ allnodes: [] });
  const [Isfound, SetIsfound] = useState(false);

  let firstvalue = Object.keys(nodemap).splice(0, 1);

  let defaultBranchName = useContext(Newbranchname);
  if (!defaultBranchName) {
    defaultBranchName = firstvalue[0];
  }

  useEffect(() => {
    SetIsfound(true);
  }, [NoOfVertices]);

  let path = [];

  const BreadthFirstSearch = (tree, rootNode) => {
    let queue = [];

    queue.push(rootNode);

    while (queue.length > 0) {
      let currentNode = queue[0];
      

      path.push(currentNode);

      if (currentNode.adjList.length === 1) {
        queue.push(tree[currentNode.adjList[0]]);
      } else if (currentNode.adjList.length > 1) {
        for (let key of currentNode.adjList) {
          BreadthFirstSearch(tree, tree[key]);
        }
      }

      // remove the currentNode from the queue.
      queue.shift();
    }

    SetNoOfVertices(() => ({
      allnodes: [path],
    }));
    return path;
  };

  useEffect(() => {
    BreadthFirstSearch(nodemap, nodemap[defaultBranchName]);
  }, [defaultBranchName]);

  return (
    <PageContext.Provider value={NoOfVertices.allnodes}>
      <BarChart Isfound={Isfound} />
    </PageContext.Provider>
  );
};

export default SearchContext;
