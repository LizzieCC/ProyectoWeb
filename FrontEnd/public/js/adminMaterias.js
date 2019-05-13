var Materias = [];

$("#checkEliminar").prop( "checked", false );

$(".switch").find("input[type=checkbox]").on("change",function() {
    var status = $(this).prop('checked');
    if(!status){
        //If it is checked, show the delete buttons
        $('.secondary-content').addClass("hidden");
    }
    else{
        $('.secondary-content').removeClass("hidden");
    }
});

$('.secondary-content').click(function(){
});

function deleteElement(element){

        M.toast({html: 'Ups, algo salió mal. Intenta más tarde.'})

}

loadSubjects();

//Load Materias
function loadSubjects() {
    var token = localStorage.getItem('token');
    $('#listMaterias').empty();
    $("#checkEliminar").prop( "checked", false );

    $.ajax({
      url: 'http://localhost:3000/subjects',
      //url: 'https://examenfinal818821.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
  
        for( let i = 0; i < data.length; i++) {
          console.log(data[i].name)
          
          displaySubject(data[i]._id, i, data[i].name)
        }
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  function displaySubject(id, i, name) {
    Materias.push(id);
    $('#listMaterias').append('<li class="collection-item" value="'+i+'"><div>'+name+'<a href="#!" class="secondary-content hidden" id="deleteIcon"><i class="material-icons red-text text-darken-4" onclick="deleteElement(this)">delete</i></a></div></li>');
  }
  
  function deleteElement(element){
    var token = localStorage.getItem('token');
    let mKey = Materias[$(element).parent().parent().parent().val()];
    
    $.ajax({
      url: 'http://localhost:3000/subjects/' + mKey,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      dataType: 'json',
      success: function(){
        loadSubjects();
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });

}

//Agregar Materia
function addSubject(){
  let nombre = $("#materia").val()

  json_to_send = {
    "name" : nombre
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'http://localhost:3000/subjects',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      $('#materia').val('')
      loadSubjects();

    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}