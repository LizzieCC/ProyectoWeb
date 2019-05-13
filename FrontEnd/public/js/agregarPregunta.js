loadSubjects();
//Load Materias
function loadSubjects() {
    var token = localStorage.getItem('token');
    $('#listMaterias').empty();
    $("#checkEliminar").prop( "checked", false );

    $.ajax({
      url: 'https://preparatemas.herokuapp.com/subjects',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        setMaterias(data);
        
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

//Pone las materias disponibles en el Selector
function setMaterias(data){
    Object.keys(data).forEach(function(key) {
      // get reference to select element
      var sel = document.getElementById('selectMateria');
      // create new option element
      var opt = document.createElement('option');
      // create text node to add to option element (opt)
      opt.appendChild( document.createTextNode(data[key].name) );
      // set value property of opt
      opt.value = data[key].name;
      // add opt to end of select box (sel)
      sel.appendChild(opt);
    });
  
    //Initialize Selector
    $(document).ready(function(){
      $('select').formSelect();
    });
}

//Agregar Pregunta
function add(){
    event.preventDefault();
  
    let materia = $('#selectMateria').val()
    let tema = $('#tema').val()
    let subtema = $('#subtema').val()
    let pregunta = $('#pregunta').val()
    let pregunta_img = $('#pregunta_img').val()
    let exp_img = $('#exp_img').val()
    let exp_text = $('#exp_text').val()
    let op_a = $('#opcionA').val()
    let op_b = $('#opcionB').val()
    let op_c = $('#opcionC').val()
    let resp = $("input[name='respuesta']:checked").val()
  
    //Para que en Unity Funcionen los URLs de Google Drive, es necesario cambiar "open" por "cu"
    pregunta_img = pregunta_img.replace("open?id", "uc?id");
    exp_img = exp_img.replace("open?id", "uc?id");
  
    //Cambiar los campos opcionales vacios a false
    //Esto porque en Unity si tiene False no vamos a cargar el objeto para desplegarlo, si tiene otra cosa si lo desplegamos.
    if(subtema == ""){
      subtema = false
    }
  
    if(pregunta_img == ""){
      pregunta_img = false
    }
  
    if(exp_img == ""){
      exp_img = false
    }
  
    if(exp_text == ""){
      exp_text = false
    }
    
     var json_to_send = {
        pregunta: pregunta,
        imagenDeApoyo: pregunta_img,
        opcionA: op_a,
        opcionB: op_b,
        opcionC: op_c,
        respuesta: resp,
        explicacion: exp_text,
        imagenExplicativa: exp_img,
        tema: tema,
        materia: materia
    };

    json_to_send = JSON.stringify(json_to_send);
     
    console.log(json_to_send)
     $.ajax({
        url: 'https://preparatemas.herokuapp.com/createQuestion',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        dataType: 'json',
        data: json_to_send,
        success: function(data){
            $('#addQuestion').trigger("reset");
            scroll(0,0);
            M.toast({html: 'Pregunta guardada'})
        },
        error: function(error_msg) {
        //   alert((error_msg['responseText']));
          M.toast({html: 'Ups, algo salió mal. Intenta más tarde.'})
        }
      });
  
  }

