var Usuarios = [];

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

loadUsers();

//Load Users
function loadUsers() {
    var token = localStorage.getItem('token');
    $('#listUsuarios').empty();
    $("#checkEliminar").prop( "checked", false );

    $.ajax({
      url: 'http://localhost:3000/users',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
  
        for( let i = 0; i < data.length; i++) {
          console.log(data[i].name)
          
          displayUser(data[i]._id, i, data[i].name)
        }
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

  function displayUser(id, i, name) {
    Usuarios.push(id);
    $('#listUsuarios').append('<li class="collection-item" value="'+i+'"><div>'+name+'<a href="#!" class="secondary-content hidden" id="deleteIcon"><i class="material-icons red-text text-darken-4" onclick="deleteElement(this)">delete</i></a></div></li>');
  }

  function deleteElement(element){
    var token = localStorage.getItem('token');
    let uKey = Usuarios[$(element).parent().parent().parent().val()];
    
    console.log(uKey);
    
    $.ajax({
      url: 'http://localhost:3000/users/' + uKey,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      dataType: 'json',
      success: function(){
        loadUsers();
      },
      error: function(error_msg) {
        alert((error_msg['este error meco']));
      }
    });
  }