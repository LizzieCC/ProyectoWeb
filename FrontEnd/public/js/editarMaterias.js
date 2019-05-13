var Materias = [];

$("#checkEditar").prop( "checked", false );

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

function editElement(element){

    M.toast({html: 'Ups, algo salió mal. Intenta más tarde.'})
}

loadSubjects();

//Load Materias
function loadSubjects() {
    var token = localStorage.getItem('token');
    Materias = [];
    $('#listMaterias').empty();
    $("#checkEliminar").prop( "checked", false );

    $.ajax({
      url: 'https://preparatemas.herokuapp.com/subjects',
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
    $('#listMaterias').append('<li class="collection-item" value="'+i+'"><div>'+name+'<a href="#!" class="secondary-content hidden" id="deleteIcon"><i class="material-icons red-text text-darken-4" onclick="editElement(this)">edit</i></a></div></li>');
  }
