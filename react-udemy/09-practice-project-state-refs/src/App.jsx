import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/SideBar";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProject: null,
      };
    });
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };
    setProjectState((prev) => {
      return {
        ...prev,
        projects: [...prev.projects, newProject],
      };
    });
  }

  let content;

  if (projectState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAdd={handleStartAddProject} />;
  } else if (projectState.selectedProject === null) {
    content = <NewProject onAdd={handleAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAdd={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
