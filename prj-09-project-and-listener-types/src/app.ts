// Project Type
/**
 * 這段程式碼定義了一個名為ProjectStatus的枚舉（enum）。枚舉是一種特殊的類型，用於定義一組命名的常數。

在這個ProjectStatus枚舉中，有兩個成員：Active和Finished。在TypeScript中，如果枚舉成員沒有明確的初始化值，那麼它們的值將從0開始自動遞增。所以在這個例子中，Active的值將為0，Finished的值將為1。

你可以使用這個枚舉來表示一個項目的狀態。例如：
let projectStatus: ProjectStatus = ProjectStatus.Active;

// Later in your code...
if (projectStatus === ProjectStatus.Active) {
  // Do something if the project is active
} else if (projectStatus === ProjectStatus.Finished) {
  // Do something if the project is finished
}
這樣可以使你的程式碼更具可讀性和可維護性，因為你可以使用有意義的名稱來表示不同的狀態，而不是使用難以理解的數字或字符串。
 * */ 
enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project State Management
/**
 * 這段程式碼定義了一種新的類型Listener，這是一種函數類型。

在這個定義中，Listener是一種特殊的函數，它接受一個參數items，這個參數是Project[]類型（也就是Project類型的陣列），並且這個函數沒有返回值（即返回void）。

這種類型的定義對於確保函數的參數和返回值符合預期的類型非常有用。例如，你可能有一個函數需要接受一個Listener類型的參數：
function registerListener(listener: Listener) {
  // Now you can be sure that 'listener' is a function that takes an array of Projects and returns nothing
}
 * */ 
type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = []; // 儲存監聽器, active and finished
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
    console.log("addListener inside", this.listeners);
  }

  /*
  在addProject方法中，每次新的專案被添加到this.projects陣列後，就會遍歷this.listeners陣列，並對每一個監聽器（也就是函數）調用listenerFn(this.projects.slice())。這裡的this.projects.slice()創建了this.projects陣列的一個新的副本，並將這個副本作為參數傳遞給listenerFn。
  
  所以，當你在projectState上註冊了一個監聽器：
  projectState.addListener((projects: Project[]) => {
  this.assignedProjects = projects;
  this.renderProjects();
});

這個監聽器就會在每次addProject方法被調用，並且專案列表被更新時被觸發。在這個監聽器中，你將更新後的專案列表賦值給this.assignedProjects，並調用this.renderProjects()方法。
  */
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    console.log("newProject", newProject);
    this.projects.push(newProject);

    /*
    這段程式碼的目的是在每次添加新的專案後，通知所有註冊的監聽器（也就是this.listeners陣列中的函數）專案列表已經更新。

    這樣做的好處是，每當專案列表更新時，所有的監聽器都會得到通知，並且可以根據新的專案列表進行相應的處理。例如，你可能有一個監聽器用於更新用戶界面，顯示新的專案列表。這種模式通常被稱為觀察者模式
    */
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }

    console.log("run this.listeners inside addProject", this.listeners);
    console.log("addProject inside", this.projects);
  }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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

// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    // 這段程式碼是一個監聽器，它會在projectState的專案列表更新時被觸發。具體來說，這是在addProject方法中發生的。當一個新的專案被添加到projectState時，會遍歷listeners陣列中的每一個函數，並將專案列表的一個副本作為參數傳入：
    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      console.log('this.assignedProjects',this.assignedProjects)
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
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

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    console.log('userInput',userInput)
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
// const finishedPrjList = new ProjectList('finished');
