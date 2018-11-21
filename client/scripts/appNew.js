
var app = {
  server: 'http://parse.rbk.hackreactor.com/chatterbox/classes/messages',
  messages: [],
  username: "myName",
  roomname: "thisLab",
  message: {
    username: 'Issa',
    text: '',
    roomname: 'RBK5',
    createdAt: new Date()
  },

	init : function () {
    app.fetch();		
	},

  //get server messages
  fetch : function () {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: {order: "-createdAt"}, //last 100 messages
      success: function (data) {
        //if there is no data just escape out of this function
        if (!data.results || !data.results.length) { return; }
        //get the data outside of this function
        app.messages = data;
        app.renderMessages() 
        app.renderRoom();
      },
      
      error: function (data) {
        console.error('cant fetch, change url');
      }
    })
  },

  //hack exit
  escapeHTML: function(string) {
    if (!string) {return;}
    return string.replace(/[&<>"'=\/]/g, '');
  },

  //show me messages on browser
  renderMessages : function () {
    //this just to insure there is nothing originally
    app.clearMessages()

    //this loop to put each message into a
    //single chat box on the DOM
    for (var i = 0; i < app.messages.results.length; i++) {
      $(".chats").append(
        `<div class ="chat">
          <div style="font-size: 13px"> 
            Username:<a class='username' href="#">${window.app.escapeHTML(app.messages.results[i].username)}</a>
            <p> 
              Roomname: ${app.escapeHTML(window.app.messages.results[i].roomname)} 
            </p>
          </div>
          <div class="message">
            <p> 
              Message: ${app.escapeHTML(window.app.messages.results[i].text)} 
            </p>
          </div>
          <p class="createdAt"> 
            createdAt: ${app.escapeHTML(window.app.messages.results[i].createdAt)} 
          </p>
        </div>`)
    }
  },

  //remove any message on the DOM
  clearMessages : function () {
    $(".chats").html([])
  },

  //if you want specific room to be shown on browser
  renderRoom : function (roomName) {
    //room list obj (obj to remove the duplication)
    var obj = {}; 
    //put the roomNames into the list
    for (var i = 0; i < app.messages.results.length; i++) {
      obj[app.messages.results[i].roomname] = true
    }
    //append all object's roomNames into the option list (in chrome, JUST in the list!)
    for (var key in obj) {
      $("#browsers").append(`<option value=${key}>`)
    }
  },

  //send a new message to the server using the text input
	send : function (messages) {
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://parse.rbk.hackreactor.com/chatterbox/classes/messages',
		  type: 'POST',
		  data: JSON.stringify(window.app.message),
		  contentType: 'application/json',
		  success: function (data) {
        app.init() //fetch and see the server messages
		  },
		  error: function (data) {
		    console.error('chatterbox: Failed to send message', data);
			}
		})
	},


  handleUsernameClick : function(event) {
    var use = event.target.innerText//.slice(1,-1);

    $('.username').each(function() {
      var txt = this.innerText;
      console.log(txt, txt.length)
      if ( txt === use ) {
        $(this).toggleClass('friend');
      }
    })
  }
};

app.init()

//clicking functions:
$(document).ready(function () {

  $('.chats').on('click', '.username',window.app.handleUsernameClick) 
  
  //this function for the rooms filtering
  $('#roomBTN').on('click', function(event) {
    event.preventDefault() //dont refresh

    window.app.clearMessages() //remove all the messages on the page

    //now let's add our roomName messages
    for (var i = 0; i < window.app.messages.results.length; i++) {
      if (window.app.messages.results[i].roomname === $('#list').val()) {
        $(".chats").append(
          `<div class ="chat">
            <div style="font-size: 13px"> 
              Username:<a class='username' href="#">${window.app.escapeHTML(app.messages.results[i].username)}</a>
              <p> 
                Roomname: ${app.escapeHTML(window.app.messages.results[i].roomname)} 
              </p>
            </div>
            <div class="message">
              <p> 
                Message: ${app.escapeHTML(window.app.messages.results[i].text)} 
              </p>
            </div>
            <p class="createdAt"> 
              createdAt: ${app.escapeHTML(window.app.messages.results[i].createdAt)} 
            </p>
          </div>`
        )
      }
    }
    //roomName list will get back the original value
    $('#list').val("")
  });


  //this function for the input(submit) of the message
  $('#txtBTN').on('click', function(event) {
    event.preventDefault() //no page refresh

    window.app.message.username = "Issa";
    if ($('#list').val()) {
      window.app.message.roomname = $('#list').val()
    }
    window.app.message.text = $('#txt').val();
    window.app.send();

    //remove the value written in the input box after submitting
    $('#txt').val('');
    $('#list').val("") 
  });


  //this function for the friend click

});


