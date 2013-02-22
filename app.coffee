submitMailForm = ()->
	errors = checkForm()
	if errors.length == 0
		disableForm()
		sendEmail()
	else
		displayErrors(errors)

window.submitMailForm = submitMailForm


###
------------------------------------------------------
MANDRILL COMMUNICATION
------------------------------------------------------
###


sendEmail = ()->
	to =
		email: $("#to-email").val()

	message =
		 text: $("#message-area").val()
		 subject: $("#subject").val()
		 from_email: $("#from-email").val()
		 to: [to]

	data =
		key: $("#mandrill-api-key").val()
		message: message

	params =
		method: "POST"
		url: "https://mandrillapp.com/api/1.0/messages/send.json"
		contentType: "application/json; charset=utf-8"
		dataType: "json"
		data: JSON.stringify(data)
	$.ajax(params).done(success).fail(failure)

success = ()->
	displaySuccess()
	emptyForm()
	enableForm()

failure = (data, status, xhr)->
	displayErrors(["(From Mandrill) "+$.parseJSON(data.responseText).message])
	enableForm()

###
------------------------------------------------------
RESULTS METHODS
------------------------------------------------------
###

displaySuccess = ()->
	html = """<div class="alert alert-success">"""
	html += """<button type="button" class="close" data-dismiss="alert">&times;</button>"""
	html += "Your email was sent!</div>"
	$("#results").prepend(html)

displayErrors = (errors)->
	html = """<div class="alert alert-error">"""
	html += """<button type="button" class="close" data-dismiss="alert">&times;</button>"""
	html += "Ooops! We've got a problem.<ul>"
	for error in errors
		html += "<li>"+error+"</li>"
	html += "</ul></div>"
	$("#results").prepend(html)

###
------------------------------------------------------
FORM METHODS
------------------------------------------------------
###

# Disables all the inputs and the button
disableForm = ()->
	$("#mandrill-api-key").addClass("disabled").attr("disabled", "disabled")
	$("#from-email").addClass("disabled").attr("disabled", "disabled")
	$("#to-email").addClass("disabled").attr("disabled", "disabled")
	$("#subject").addClass("disabled").attr("disabled", "disabled")
	$("#message-area").addClass("disabled").attr("disabled", "disabled")
	$("#submit-button").addClass("disabled").attr("disabled", "disabled")
			.removeClass("btn-primary").html("Sending...")

# Enables all the inputs and the button
enableForm = ()->
	$("#mandrill-api-key").removeClass("disabled").removeAttr("disabled")
	$("#subject").removeClass("disabled").removeAttr("disabled")
	$("#from-email").removeClass("disabled").removeAttr("disabled")
	$("#to-email").removeClass("disabled").removeAttr("disabled")
	$("#message-area").removeClass("disabled").removeAttr("disabled")
	$("#submit-button").removeClass("disabled").removeAttr("disabled")
			.addClass("btn-primary").html("Send")

# Removes the recipient's email, the subject and the message
emptyForm = ()->
	$("#to-email").val("")
	$("#subject").val("")
	$("#message-area").val("")

# Check if any required field is missing
checkForm = ()->
	errors = []
	if $("#mandrill-api-key").val() == ""
		errors.push("You have to give an API key")
	if $("#from-email").val() == ""
		errors.push("You have to type your email address")
	if $("#to-email").val() == ""
		errors.push("You have to type a recipient's email address")
	if $("#subject").val() == ""
		errors.push("You have to type a subject")
	if $("#message-area").val() == ""
		errors.push("You have to type a message")
	return errors