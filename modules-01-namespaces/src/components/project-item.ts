/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

/*
在TypeScript中，namespace是用來將相關的代碼組織在一起的一種方式，並且可以避免命名衝突。你可以將類、接口、函數和變量放在一個namespace中，然後通過namespace的名稱來訪問它們。

注意，如果你想在namespace外部訪問其中的成員，你需要使用export關鍵字。

然而，現在TypeScript更推薦使用模塊（module）來組織代碼，因為模塊有更好的封裝性和更強的靜態檢查能力。namespace主要用於在全局範疇內組織代碼，或者在沒有模塊加載器的環境中使用。
*/ 
namespace App {
  // ProjectItem Class
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;

    get persons() {
      if (this.project.people === 1) {
        return '1 person';
      } else {
        return `${this.project.people} persons`;
      }
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
      console.log('DragEnd');
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent =
        this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }

}