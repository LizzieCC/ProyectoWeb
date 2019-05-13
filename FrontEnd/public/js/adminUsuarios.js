var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

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
    Usuarios = [];
    $('#listUsuarios').empty();
    $("#checkEliminar").prop( "checked", false );

    $.ajax({
      url: 'https://preparatemas.herokuapp.com/users',
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
    let uKey = Usuarios[$(element).parent().parent().parent().val()];
    
    console.log(uKey);
    
    $.ajax({
      url: 'https://preparatemas.herokuapp.com/users/' + uKey,
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
        alert((error_msg['error']));
      }
    });
  }

  //Agregar usuario
  $('#agregarUsuario').on('click',function(){
    var name = $("#name").val();
    var password = $("#password").val();
    var email = $("#email").val();
    console.log('si llego aqui ')
    json_to_send = {
      "name":name,
      "email": email,
      "password" : password
    };
    
    json_to_send = JSON.stringify(json_to_send);
    console.log(json_to_send);
    
    $.ajax({
      url: 'https://preparatemas.herokuapp.com/users',
      //url: 'https://examenfinallizzie.herokuapp.com/users/login',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        $("#name").val('')
        $("#email").val('')
        $("#password").val('')
        loadUsers()
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]));
      }
    });

  })