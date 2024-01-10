// autobind decorator
/**
 * autobind是一種裝飾器(decorator)，在TypeScript或JavaScript ES6中使用。它的主要作用是自動將方法的this綁定到當前的實例上。這在React等框架中非常有用，因為在事件處理器中，this的上下文可能會改變。

當你在一個方法上使用@autobind裝飾器時，這個方法會在實例化時自動綁定到該實例上。這意味著你可以將該方法作為回調函數傳遞，而不需要手動綁定this。

原理上，autobind裝飾器會創建一個新的函數，該函數固定了this的值並返回原函數的調用結果。這個新函數會替換原來的方法。
 * */ 
function autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }


  // 當你在一個方法上使用@autobind裝飾器時，這個方法會在實例化時自動綁定到該實例上。這意味著你可以將該方法作為回調函數傳遞，而不需要手動綁定this。
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
