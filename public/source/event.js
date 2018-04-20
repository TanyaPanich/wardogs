$(document).ready(function() {
  'use strict';

  // eslint-disable-next-line max-statements
  $('#joinButton').click((event) => {
    event.preventDefault();
    let eventUser = {}

    if (!window.document.cookie) {
      window.location.href = "/login"
      return
    }

    const eventId = window.location.pathname.match(/[0-9]+/)[0]
    const userToken = window.document.cookie.slice(6)

    eventUser = {
      "eventId": eventId,
      "userToken": userToken,
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(eventUser),
      dataType: 'json',
      type: 'POST',
      url: `/events/${eventId}`
    }

    $.ajax(options)
      .done(function(registered) {
        if (registered === true) {
          $('#joinButton').text("Join Event")
          $('#joinButton').addClass('btn-success')
          $('#joinButton').removeClass('btn-danger')
        } else {
          $('#joinButton').text("Leave Event")
          $('#joinButton').addClass('btn-danger')
          $('#joinButton').removeClass('btn-success')
        }
      })
      .fail(($xhr) => {
        $('#joinButton').innerText = "Join Event"
        alert($xhr.responseText)
      })
  })
})
