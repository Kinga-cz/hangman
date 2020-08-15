var myArray = ["The rest is silence", "To be or not to be that is the question", "Listen to many speak to a few", "Time is waste of money"];
var myArray2 = ["The rest is silence", "To be or not to be that is the question", "Listen to many speak to a few", "Time is waste of money"];
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var game_over = new Audio("oh-my-god-2.wav");
var winner = new Audio("nice-work.wav");

var bad_shot;
var password;
var password2;
var length;
var randomItem;

function display_password() {
	document.getElementById("password").innerText = password2;
}

function getRemoveArray(array) {
	if (array.length == 0) {
		document.getElementById("alphabet").innerHTML = 'End of passwords <br /><br /><span class="reset" onclick="start()">Play again</span>';
		for (var i = 0; i < myArray.length; i++) {
			array.push(myArray[i]);
		}
	}

	return array.splice(Math.floor(Math.random() * array.length), 1);
};

function setSign(string, place, sign) {
	if (place > string.length - 1) return string.toString();
	else return string.substr(0, place) + sign + string.substr(place + 1);
}

function verify(nr) {
	var strike = false;
	var element = "lit" + nr;
	document.getElementById(element).style.border = "0px";
	document.getElementById(element).style.cursor = "default";
	document.getElementById(element).setAttribute("onclick", ";");

	for (var i = 0; i < length; i++) {
		if (password.charAt(i) == letters[nr]) {
			password2 = setSign(password2, i, letters[nr]);
			strike = true;
		}
	}

	if (strike == true) {
		yes.play();
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		display_password();
	} else {
		no.play();
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		bad_shot++;
		var image = "img/s" + bad_shot + ".jpg";
		document.getElementById("image").innerHTML = '<img src="' + image + '" class="img-fluid" alt="Responsive image">';

	}

	if (password2 == password) {
		winner.play();
		document.getElementById("alphabet").innerHTML = "Well done! Correct password is: " + password + '<br /><br /><span class="reset" onclick="start()">Play again</span>';
	}

	if (bad_shot >= 9) {
		game_over.play();
		document.getElementById("alphabet").innerHTML = "You lose! Correct password is: " + password + '<br /><br /><span class="reset" onclick="start()">Play again</span>';
	}


}

window.onload = start;

var letters = ["A", "B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function start() {
	password = getRemoveArray(myArray2).toString();
	password = password.toUpperCase();
	length = password.length;
	bad_shot = 0;
	var image = "img/s" + bad_shot + ".jpg";

	document.getElementById("image").innerHTML = '<img src="' + image + '" class="img-fluid" alt="Responsive image">';

	var text = "";

	for (i = 0; i <= letters.length - 1; i++) {
		var element = "lit" + i;
		text = text + '<div class="letter" onclick="verify(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
		if ((i + 1) % 7 == 0) text = text + '<div style="clear:both;"></div>';
	}

	document.getElementById("alphabet").innerHTML = text;

	password2 = "";
	for (i = 0; i < length; i++) {
		if (password.charAt(i) == " ") password2 = password2 + " ";
		else password2 = password2 + "-";
	}

	display_password();

}