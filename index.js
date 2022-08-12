$(document).ready(function () {
  console.log('dom ready');

  var updateTaskList = function () {
    $.ajax({
      type: 'GET',
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=512",
      //contentType: 'application/json',
      dataType: 'json',
      //data: JSON.stringify({
        //task: {
          //content: 'Go to the gym'
        //}
      //}),
      success: function (response, textStatus) {
        //console.log(response);
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          
          //task = task.content;
          $('#todo-list').append('<div class="row"><input class="mark-complete" type="checkbox" data-id="'+task.id+'"' + (task.completed ? 'checked' : '') +'><p class="col-xs-8">'+task.content+'</p><button class="remove" data-id="'+task.id+'">Remove</button>');
          
          //$('#todo-list').append('<p><input type="checkbox" value="completed">' + task + '<button type="button" class="btn btn-danger remove-button">Remove</button></p>');
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var addItem = function () {
    $.ajax({
      type: 'POST', 
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=512",
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task').val()
        }
      }),
      success: function (response, textStatus) {
        //console.log(response);
        $('#new-task').val('');
        updateTaskList();
      },
      error: function (request, textStatus, errorMessages) {
        console.log(errorMessage);
      }
    });
  }
  
  $('#todo-input').on('submit', function (e) {
    e.preventDefault();
    addItem();
  });

  var removeItem = function (id) {
    $.ajax({
      type: 'DELETE', 
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'?api_key=512',
      success: function (response, textStatus) {
        console.log(response);
        updateTaskList();
      },
      error: function (request, textStatus, errorMessages) {
        console.log(errorMessage);
      }
    });
  }
  
  $(document).on('click', '.remove', function () {
    removeItem($(this).data('id'))
  });
  
  var markCompleted = function (id) {
    $.ajax ({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'/mark_complete?api_key=512',
      dataType: 'json',
      success: function (response, textStatus) {
        console.log(response);
        updateTaskList();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markActive = function (id) {
    $.ajax ({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'/mark_active?api_key=512',
      dataType: 'json',
      sucess: function (response, textStatus) {
        updateTaskList();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $(document).on('click', '.mark-complete', function () {
    if (this.checked) {
      markCompleted($(this).data('id'))
    } else {
      markActive($(this).data('id'));
    }
  });

  updateTaskList();
});



