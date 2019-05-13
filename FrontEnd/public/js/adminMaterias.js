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

    console.log(token);
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
        console.log(data)
  
        for( let i = 0; i < data.length; i++) {
          console.log(data[i].name)
          
          addSubject(data[i]._id, data[i].name)
        }
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  function addSubject(id, name) {
    $('#listMaterias').append('<li class="collection-item" value='+id+'><div>'+name+'<a href="#!" class="secondary-content hidden" id="deleteIcon"><i class="material-icons red-text text-darken-4" onclick="deleteElement(this)">delete</i></a></div></li>');
  }
  