import { ProjectInput } from "./project-tasks/components/project-input";
import { ProjectList } from "./project-tasks/components/project-list";

const dragdrop = () => {
  const project = new ProjectInput();
  const activeProjectList = new ProjectList("active");
  const finishedProjectList = new ProjectList("finished");
};

export default dragdrop;
