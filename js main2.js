// Class responsible for managing the UI and handling events
class UIManager {
    // Existing code...
  
    handleEditTodo(id) {
      const todo = this.todoManager.todos.find((t) => t.id === id);
      if (todo) {
        this.taskInput.value = todo.task;
  
        const handleUpdate = () => {
          if (this.taskInput.value.trim() !== "") {
            this.todoManager.editTodo(id, this.taskInput.value);
            this.showAlertMessage("Todo updated successfully", "success");
            this.showAllTodos();
            this.taskInput.value = "";
            this.addBtn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
            this.addBtn.removeEventListener("click", handleUpdate);
          } else {
            this.showAlertMessage("Task cannot be empty", "error");
          }
        };
  
        this.addBtn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
        this.addBtn.addEventListener("click", handleUpdate);
      }
    }
  
    // Existing code...
  }
  
  // Class responsible for managing the theme switcher
  class ThemeSwitcher {
    constructor(themes, html) {
      this.themes = themes;
      this.html = html;
      this.init();
    }
  
    init() {
      const theme = this.getThemeFromLocalStorage();
      if (theme) {
        this.setTheme(theme);
      }
  
      this.addThemeEventListeners();
    }
  
    addThemeEventListeners() {
      this.themes.forEach((theme) => {
        theme.addEventListener("click", () => {
          const themeName = theme.getAttribute("theme");
          this.setTheme(themeName);
          this.saveThemeToLocalStorage(themeName);
        });
      });
    }
  
    setTheme(themeName) {
      this.html.setAttribute("data-theme", themeName);
    }
  
    saveThemeToLocalStorage(themeName) {
      localStorage.setItem("theme", themeName);
    }
  
    getThemeFromLocalStorage() {
      return localStorage.getItem("theme");
    }
  }
  
  // Instantiating the classes
  const todoItemFormatter = new TodoItemFormatter();
  const todoManager = new TodoManager(todoItemFormatter);
  const themes = document.querySelectorAll(".theme-item");
  const html = document.querySelector("html");
  const themeSwitcher = new ThemeSwitcher(themes, html);
  const uiManager = new UIManager(todoManager, todoItemFormatter);
  