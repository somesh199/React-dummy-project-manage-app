// import React from 'react';
import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from './components/SelectedProject';

function App() {

  const[projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[]
  });

  function handleAddTask(text) {
    setProjectsState(prevState => {
      console.log(prevState);
      const taskId = Math.random();
      const newTask = {
        text:text,
        projectId:prevState.selectedProjectId,
        id: taskId
      };

      return{
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id) {
    console.log("task",projectsState.projects);
    console.log("id",id);
  
    setProjectsState((prevState) => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });
  }

  function handleProjectSelect(id) {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDelete() {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        )
      };
    });
  }

  let selectedProject = projectsState.projects.find(project => project.id == projectsState.selectedProjectId);
  console.log("hello",selectedProject);

  let content = <SelectedProject 
    project = {selectedProject} 
    onDelete = {handleDelete}
    onAddTask = {handleAddTask}
    onDeleteTask = {handleDeleteTask}
    tasks = {projectsState.tasks}
  />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject 
      onAdd={handleAddProject} 
      onCancel={handleCancelAddProject}
    />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected 
      onStartAddProject={handleStartAddProject}
    />;
  }

  return (
    <main className=" h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject}
        project={projectsState.projects}
        onSelectProject = {handleProjectSelect}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
