$(function () {
  const $todoList = $("#todoList");
  const $newTodoText = $("#newTodoText");
  const $todoError = $("#todoError");

  function showError(msg) {
    $todoError.text(msg);
  }

  function clearError() {
    $todoError.text("");
  }

  function renderTodo(item) {
    const li = $(`
      <li class="todo-item" data-id="${item.id}">
        <span></span>
        <div class="todo-actions">
          <button class="btn btn-toggle" type="button">Done</button>
          <button class="btn btn-delete" type="button">Delete</button>
        </div>
      </li>
    `);

    if (item.done == 1 || item.done === true) {
      li.addClass("done");
    }
    li.find("span").text(item.text);
    return li;
  }

  function loadTodos() {
    $.ajax({
      url: "../php/api_todos.php",
      method: "GET",
      dataType: "json"
    })
    .done(function (data) {
      $todoList.empty();
      data.forEach(function (item) {
        $todoList.append(renderTodo(item));
      });
    })
    .fail(function () {
      showError("Failed to load to-dos (maybe not logged in?).");
    });
  }

  function addTodo() {
    const text = $newTodoText.val().trim();
    if (!text) {
      showError("Please enter a task.");
      return;
    }
    clearError();

    $.ajax({
      url: "../php/api_todos.php",
      method: "POST",
      data: JSON.stringify({ text }),
      contentType: "application/json",
      dataType: "json"
    })
    .done(function (item) {
      $todoList.prepend(renderTodo(item));
      $newTodoText.val("").focus();
    })
    .fail(function (xhr) {
      showError("Error adding task: " + xhr.responseText);
    });
  }

  function toggleTodo(id, done) {
    $.ajax({
      url: "../php/api_todos.php?id=" + encodeURIComponent(id),
      method: "PUT",
      data: JSON.stringify({ done }),
      contentType: "application/json",
      dataType: "json"
    })
    .done(loadTodos)
    .fail(function () {
      showError("Failed to update task.");
    });
  }

  function deleteTodo(id) {
    $.ajax({
      url: "../php/api_todos.php?id=" + encodeURIComponent(id),
      method: "DELETE",
      dataType: "json"
    })
    .done(loadTodos)
    .fail(function () {
      showError("Failed to delete task.");
    });
  }

  // Event handlers
  $("#addTodoBtn").on("click", addTodo);
  $newTodoText.on("keyup", function (e) {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  $todoList.on("click", ".btn-toggle", function () {
    const li = $(this).closest(".todo-item");
    const id = li.data("id");
    const isDone = !li.hasClass("done");
    toggleTodo(id, isDone);
  });

  $todoList.on("click", ".btn-delete", function () {
    const li = $(this).closest(".todo-item");
    const id = li.data("id");
    deleteTodo(id);
  });

  // Initial load
  loadTodos();
});
