// Component Base Class
namespace App {
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    // templateElement 是 <template id="project-input">...</template>, 也就是 ProjectInput.ts 中的 <template id="project-input">...</template>
    templateElement: HTMLTemplateElement;
    hostElement: T;
    // element 是 <form id="user-input">...</form>, 也就是 ProjectInput.ts 中的 <form id="user-input">...</form>
    element: U;

    // 'project-input', 'app', true, 'user-input' 這些參數是在new ProjectInput()時傳入的
    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      // templateId 是 'project-input', hostElementId 是 'app'
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      const importedNode = document.importNode(
        // content 屬性返回一個 DocumentFragment，它包含了與節點的所有子孫節點。
        // 這個屬性只能在包含的節點類型是元素，文檔或者節點類型是 document 的 DocumentFragment 上使用。
        this.templateElement.content,
        true
      );
      // importedNode.firstElementChild 是 <form id="user-input">...</form>, 也就是 ProjectInput.ts 中的 <form id="user-input">...</form>
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        // newElementId 是 'user-input'
        this.element.id = newElementId;
      }

      this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
      // insertAtBeginning 是 true
      // insertAdjacentElement 方法將一個元素插入到指定元素的指定位置。這個方法不會重新解析它插入的元素，並且它不會將它插入到 DOM 中。
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? 'afterbegin' : 'beforeend',
        this.element
      );
    }

    // abstract method 必須在衍生類中實現 (implement) 。
    // abstract method 不能在抽象類中實現 (implement) 。
    // abstract method 只能包含在抽象類中。
    abstract configure(): void;
    abstract renderContent(): void;
  }
}
