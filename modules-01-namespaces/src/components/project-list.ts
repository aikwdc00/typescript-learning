/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

/*
在TypeScript中，namespace是用來將相關的代碼組織在一起的一種方式，並且可以避免命名衝突。你可以將類、接口、函數和變量放在一個namespace中，然後通過namespace的名稱來訪問它們。

注意，如果你想在namespace外部訪問其中的成員，你需要使用export關鍵字。

然而，現在TypeScript更推薦使用模塊（module）來組織代碼，因為模塊有更好的封裝性和更強的靜態檢查能力。namespace主要用於在全局範疇內組織代碼，或者在沒有模塊加載器的環境中使用。
*/ 
namespace App {
  // ProjectList Class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];

      // 這裡的 this.element 是在 modules-01-namespaces/src/components/base-component.ts 中的 this.element = importedNode.firstElementChild as U;
      this.configure();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
      }
    }

    @autobind
    dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        prjId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);

      // 這裡的 projectState 是在 modules-01-namespaces/src/state/project-state.ts 中的 const projectState = ProjectState.getInstance();
      /*
      新的监听器被添加到系统中。这通常通过一个名为addListener、subscribe或类似的方法完成，该方法接受一个监听器并将其添加到this.listeners中。

      当观察的状态或事件发生变化时，所有的监听器都会被通知（或“刷新”）。这通常通过一个名为notifyListeners、updateListeners或类似的方法完成，该方法遍历this.listeners中的所有监听器，并调用它们。
      */
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter(prj => {
          if (this.type === 'active') {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        // 這裡的 this.assignedProjects 是在 modules-01-namespaces/src/components/project-list.ts 中的 assignedProjects: Project[];
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = '';
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
      }
    }
  }
}
