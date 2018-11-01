
var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};


var app = {
  server: 'http://parse.rbk.hackreactor.com/chatterbox/classes/messages',
  messages: [],
  username: "myName",
  roomname: "thisLab",

	init : function () {
		app.fetch() 
	},
	send : function (messages) {
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://parse.rbk.hackreactor.com/chatterbox/classes/messages',
		  type: 'POST',
		  data: JSON.stringify(window.message),
		  contentType: 'application/json',
		  success: function (data) {
        app.fetch() //see your new message
		  },

		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to send message', data);
			}
		})
	},
  handleUsernameClick : function() {
    console.log("issa")
    $('#main').css("background-color", "red")

  },
  fetch : function () {
    var that = this;
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {order: "-createdAt"}, //last 100 messages

      success: function (data) {
        //if there is no data just escape out of this function
        if (!data.results || !data.results.length) { return; }
        //get the data outside of this function
        app.messages = data;

        //calling some functions to have fun on Chrome
        app.renderRoom()
        app.renderMessages()
        
        
      },
      error: function (data) {
        console.error('cant fetch, change url');
      }
    })
  },
  clearMessages : function () {
    $("#container").html([])
  },
  renderMessages : function () {
    //this just to insure there is nothing originally
    app.clearMessages()

    //now show me the data on my chrome

    $("#main").append(`<div id="container"></div>`)
    //this loop to put each message into a
    //single chat box on the DOM
    for (var i = 0; i < app.messages.results.length; i++) {
      var user = app.messages.results[i].username
      $("#container").append(`<div class ="chats" id="chats${i}"></div>`)
      //append the userName
      $("#chats"+i).append(`<div class = 'username'> username: <a href='#'> ${user} </a><div><br>`)
      //append the text
      $("#chats"+i).append("message: " + app.messages.results[i].text)
      $("#chats"+i).append("<br>")
      //append the roomName
      $("#chats"+i).append("roomname: " + app.messages.results[i].roomname)
    }
  },
  renderRoom : function (roomName) {
    //you can use app.messages instead of data and then you can remove the ajax function and just keep the JS section
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {order: "-createdAt"},
      success: function (data) {
        //room list obj (obj to remove the duplication)
        var obj = {}; 
        //put the roomNames into the list
        for (var i = 0; i < data.results.length; i++) {
          obj[data.results[i].roomname] = true
        }
        //append all object's roomNames into the option list (in chrome, JUST in the list!)
        for (var key in obj) {
          $("#browsers").append(`<option class='option${i}' value=${key}>`)
        }
      }
    })
  }
};

$(document).ready(function () {
  //this function is not working
  $('.username a').click(function(){
    window.app.handleUsernameClick()
  })

  //this function for the rooms filtering
  $('#roomBTN').on('click', function(event) {
    event.preventDefault()

    $("#container").html([]) //remove all the messages on the page
    //now let's add our roomName messages
    $("#main").append(`<div id="container"></div>`)
    for (var i = 0; i < app.messages.results.length; i++) {
      if (app.messages.results[i].roomname === $('#list').val()) {
        var user = app.messages.results[i].username
        $("#container").append(`<div class ="chats" id="chats${i}"></div>`)
        $("#chats"+i).append(`<div class = 'username'> username: <a class="user${i}" href='#'> ${user} </a><div><br>`)
        $("#chats"+i).append("message: " + app.messages.results[i].text)
        $("#chats"+i).append("<br>")
        $("#chats"+i).append("roomname: " + app.messages.results[i].roomname)
      }
    }
    $('#list').val("")
  });

  //this function for the input(submit) of the message
  $('#btn').on('click', function(event) {
    event.preventDefault() //no page refresh

    window.message.username = "Issa";
    window.message.roomname = $('#list').val()
    window.message.text = $('#inputtxt').val();
    window.app.send();

    //remove the value written in the input box after submitting
    $('#inputtxt').val('');
    $('#list').val("") 
  });

});

app.init()


