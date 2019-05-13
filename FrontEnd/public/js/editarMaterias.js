var Materias = [];


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
    $('#listMaterias').append('<li class="collection-item" value="'+i+'"><div class="input-field"><input placeholder="'+name+'"id="materia" type="text"></input><a href="#!" class="secondary-content" id="deleteIcon"><i class="material-icons red-text text-darken-4" onclick="editElement(this)">edit</i></a></div></li>');
  }


  //Agregar Materia
function editElement(element){
    let nombre = $(element).parent().parent().find('#materia').val()
    
    if(nombre == ""){
        M.toast({html: 'Ups, no hiciste ningún cambio.'})
        return
    }

    let mKey = Materias[$(element).parent().parent().parent().val()];
    
    json_to_send = {
      "name" : nombre
    };
  
    json_to_send = JSON.stringify(json_to_send);
  
    $.ajax({
      url: 'https://preparatemas.herokuapp.com/subjects/'+mKey,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        loadSubjects();
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }
