/*
在TypeScript中，/// <reference path="..." />是一種特殊的指令，被称为三斜线指令（Triple-Slash Directives）。它用于告诉TypeScript编译器引入（或引用）其他的文件。

这两行代码告诉TypeScript编译器，app.ts文件依赖于project-input.ts和project-list.ts这两个文件。编译器在处理app.ts文件时，会先处理这两个被引用的文件。

然而，现在这种方式已经不再推荐使用，因为在大多数情况下，TypeScript的模块系统（使用import和export）可以更好地处理文件和依赖关系。三斜线指令主要用于在没有模块加载器的环境中，或者在使用全局命名空间的代码中。
*/ 
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

/*
在TypeScript中，namespace是用來將相關的代碼組織在一起的一種方式，並且可以避免命名衝突。你可以將類、接口、函數和變量放在一個namespace中，然後通過namespace的名稱來訪問它們。

注意，如果你想在namespace外部訪問其中的成員，你需要使用export關鍵字。

然而，現在TypeScript更推薦使用模塊（module）來組織代碼，因為模塊有更好的封裝性和更強的靜態檢查能力。namespace主要用於在全局範疇內組織代碼，或者在沒有模塊加載器的環境中使用。
*/ 
namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
