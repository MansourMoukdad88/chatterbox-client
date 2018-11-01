var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};

var app = {
	init : function () {
		return
	},
	send : function (messages) {
		return $.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://parse.rbk.hackreactor.com/chatterbox/classes/messages',
		  type: 'POST',
		  data: JSON.stringify(window.message),
		  contentType: 'application/json',
		  success: function (data) {
		  	console.log('chatterbox: Message sent');
		  },

		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to send message', data);
			}
		})
	},
  fetch : function () {
    return $.ajax({
      url: 'http://parse.rbk.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: {order: "-createdAt"},

      success: function (data) {
        console.log(data.results)
        for (var i = 0; i < data.results.length; i++) {
          $('#chats').append(data.results[i].text)
        }
        //console.log(data.results);
      },
      error: function (data) {
        console.error('cant fetch, change url');
      }
    })
  },
  clearMessages : function () {
    return $('#chats').html([])
  },
  renderMessage : function () {
    // return $.ajax({
    //   // This is the url you should use to communicate with the parse API server.
    //   url: 'http://parse.rbk.hackreactor.com/chatterbox/classes/messages',
    //   type: 'PUT',
    //   data: JSON.stringify(window.message),
    //   contentType: 'application/json',
    //   success: function (data) {
    //     console.log('Message renderd');
    //   },

    //   error: function (data) {
    //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    //     console.error('not rendered', data);
    //   }
    // })
    return $('#chats').append(JSON.stringify(window.message))
  },
  renderRoom : function () {
    return $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: undefined,
      type: 'PUT',
      data: JSON.stringify(window.room),
      contentType: 'application/json',
      success: function (data) {
        console.log('room rendered');
      },

      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('not rendered', data);
      }
    })
  }
};








