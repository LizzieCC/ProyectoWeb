$('#login_button').on('click', function(){
    // cargar email y password
    var password = $("#password").val();
    var email = $("#email").val();
    
    json_to_send = {
      "email": email,
      "password" : password
    };
    
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://preparatemas.herokuapp.com/users/login',
      //url: 'https://examenfinallizzie.herokuapp.com/users/login',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        // guardar token en localstorage o cookie
        localStorage.setItem('token', data.token)
        window.location = './administrarMaterias.html'
        
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]));
      }
    });
  })