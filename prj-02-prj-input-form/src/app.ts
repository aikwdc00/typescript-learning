class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    // ! 符號被稱為非空斷言運算符。它用於告訴 TypeScript 編譯器，表達式的結果不會是 null 或 undefined。
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    /**
     * otherDocumentElement 是你想從另一個 document 中導入的 Node。
     * deep 是一個布爾值，決定是否進行深度複製。如果為 true，則該 Node 和其整個子樹都會被導入；如果為 false，則只導入該 Node 本身。
     * importNode 方法會返回導入的 Node 的副本，你可以將其插入當前 document 的任何地方。注意，導入的 Node 不會自動添加到當前 document，你需要使用如 appendChild 或 insertBefore 等方法來插入它。
     */
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // firstElementChild 屬性會返回該元素的第一個子元素，如果該元素沒有子節點，則返回 null。
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    /**
     * insertAdjacentElement 是一個 DOM 方法，用於在 DOM 中的指定位置插入一個元素。這個方法提供了一種更靈活的方式來插入元素，而不僅僅是在父元素的末尾或開頭。
     * targetElement.insertAdjacentElement(position, element);
     * targetElement 是你想在其旁邊插入新元素的元素。
     * position 是一個字符串，表示新元素應該插入的位置。它可以是以下四個值之一
     * beforebegin'：在 targetElement 之前
     * 'afterbegin'：在 targetElement 內部的開頭。
     * 'beforeend'：在 targetElement 內部的末尾。
     * 'afterend'：在 targetElement 之後。
     * element 是你想插入的新元素。
     * */ 
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
