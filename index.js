$(document).ready(function () {
  console.log('dom ready');

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
      var taskList = response.tasks.forEach(function (task) {
        task = task.content;

        
        $('#todo-list').append('<p><input type="checkbox" value="completed">' + task + '<button type="button" class="btn btn-danger">Remove</button></p>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});

