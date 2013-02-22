// Generated by CoffeeScript 1.4.0
(function() {
  var checkForm, disableForm, displayErrors, displaySuccess, emptyForm, enableForm, failure, sendEmail, submitMailForm, success;

  submitMailForm = function() {
    var errors;
    errors = checkForm();
    if (errors.length === 0) {
      disableForm();
      return sendEmail();
    } else {
      return displayErrors(errors);
    }
  };

  window.submitMailForm = submitMailForm;

  /*
  ------------------------------------------------------
  MANDRILL COMMUNICATION
  ------------------------------------------------------
  */


  sendEmail = function() {
    var data, message, params, to;
    to = {
      email: $("#to-email").val()
    };
    message = {
      text: $("#message-area").val(),
      subject: $("#subject").val(),
      from_email: $("#from-email").val(),
      to: [to]
    };
    data = {
      key: $("#mandrill-api-key").val(),
      message: message
    };
    params = {
      method: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    };
    return $.ajax(params).done(success).fail(failure);
  };

  success = function() {
    displaySuccess();
    emptyForm();
    return enableForm();
  };

  failure = function(data, status, xhr) {
    displayErrors(["(From Mandrill) " + $.parseJSON(data.responseText).message]);
    return enableForm();
  };

  /*
  ------------------------------------------------------
  RESULTS METHODS
  ------------------------------------------------------
  */


  displaySuccess = function() {
    var html;
    html = "<div class=\"alert alert-success\">";
    html += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>";
    html += "Your email was sent!</div>";
    return $("#results").prepend(html);
  };

  displayErrors = function(errors) {
    var error, html, _i, _len;
    html = "<div class=\"alert alert-error\">";
    html += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>";
    html += "Ooops! We've got a problem.<ul>";
    for (_i = 0, _len = errors.length; _i < _len; _i++) {
      error = errors[_i];
      html += "<li>" + error + "</li>";
    }
    html += "</ul></div>";
    return $("#results").prepend(html);
  };

  /*
  ------------------------------------------------------
  FORM METHODS
  ------------------------------------------------------
  */


  disableForm = function() {
    $("#mandrill-api-key").addClass("disabled").attr("disabled", "disabled");
    $("#from-email").addClass("disabled").attr("disabled", "disabled");
    $("#to-email").addClass("disabled").attr("disabled", "disabled");
    $("#subject").addClass("disabled").attr("disabled", "disabled");
    $("#message-area").addClass("disabled").attr("disabled", "disabled");
    return $("#submit-button").addClass("disabled").attr("disabled", "disabled").removeClass("btn-primary").html("Sending...");
  };

  enableForm = function() {
    $("#mandrill-api-key").removeClass("disabled").removeAttr("disabled");
    $("#subject").removeClass("disabled").removeAttr("disabled");
    $("#from-email").removeClass("disabled").removeAttr("disabled");
    $("#to-email").removeClass("disabled").removeAttr("disabled");
    $("#message-area").removeClass("disabled").removeAttr("disabled");
    return $("#submit-button").removeClass("disabled").removeAttr("disabled").addClass("btn-primary").html("Send");
  };

  emptyForm = function() {
    $("#to-email").val("");
    $("#subject").val("");
    return $("#message-area").val("");
  };

  checkForm = function() {
    var errors;
    errors = [];
    if ($("#mandrill-api-key").val() === "") {
      errors.push("You have to give an API key");
    }
    if ($("#from-email").val() === "") {
      errors.push("You have to type your email address");
    }
    if ($("#to-email").val() === "") {
      errors.push("You have to type a recipient's email address");
    }
    if ($("#subject").val() === "") {
      errors.push("You have to type a subject");
    }
    if ($("#message-area").val() === "") {
      errors.push("You have to type a message");
    }
    return errors;
  };

}).call(this);