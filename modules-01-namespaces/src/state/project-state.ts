namespace App {
  // Project State Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    // listeners 是在 modules-01-namespaces/src/state/project-state.ts 中的 projectState.addListener((projects: Project[]) => { ... }) 中的 addListener
    protected listeners: Listener<T>[] = [];

    // addListener 是在 modules-01-namespaces/src/state/project-state.ts 中的 projectState.addListener((projects: Project[]) => { ... }) 中的 addListener
    addListener(listenerFn: Listener<T>) {
      // listeners 是在 modules-01-namespaces/src/state/project-state.ts 中的 projectState.addListener((projects: Project[]) => { ... }) 中的 addListener
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
