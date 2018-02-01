//global variable notation
var i=1;

// fetching data from json
$.getJSON("data.json", function(obj) {
	
	// ordering data from the file
	$.each(obj, function(key, value) {
		var id = 'obj' + i;  // constucting id for the DOM elements
		$("#demo").append("<button id=" + id + " class='btn-success'>" + value.firstName + "</button>");  // placing buttons on the DOM
		$( "#obj" + i + "" ).click(function() { // asigning functions when a click happens on a certain button
			// defining variables used to handle information gatherd from the json file
			var frOfr = [];
			var fof = [];
			var theFriends = [];
			var numFriends = 0;
			var numFoF = 0;
			var clickedID = value.id;
			var mutual = [];  // holder for the number of mutual friends
			var k=1; // counter for mutual friends
			numFriends = parseInt(value.friends.length)-1; // number of friends
			theFriends = value.friends; // array of friends (id numbers)
			$("#username").html(value.firstName); // printing out selected user
			while (numFriends >= 0) { // looping through all friends of the array
				if (typeof value.friends[numFriends] != 'string') { // check if the returning friends are in id number form (not a string)
					var indexHelper = parseInt(value.friends[numFriends])-1; // index for the given user id
					theFriends[numFriends] = obj[indexHelper].firstName + ' ' +obj[indexHelper].surname;  // asigning of the names to the array
					frOfr = frOfr.concat( obj[indexHelper].friends ); // array of "friends of friends" by id
					fof = frOfr.concat( obj[indexHelper].friends ); // same array used for recheck
			}
				else { // if they are strings...
					for ( var l=0; l<i-1; l++) {
					  
					 if ( (value.friends[numFriends]).split(" ")[0] == obj[l].firstName ) {
						 frOfr = frOfr.concat(obj[l].friends);
					 }
					}
					theFriends[numFriends] = value.friends[numFriends]; // array of "friends of friends" by id
				}
				numFriends--; // decrementing
			}
			// printing out friend list
			$("#friends").html('These are the friends of the user: ' + "<i>" + theFriends + "</i>");
			
			// filtering out same users
			for (var j = 0; j<frOfr.length; j++) {
				k=1;  // reseting mutual friends on different id check
				if ( frOfr[j] == clickedID || frOfr[j] == (value.firstName + " " + value.surname) ) {
					frOfr.splice(j, 1); // cutting out clicked user
				}
				for(n = 1 + j; n<frOfr.length; n++) {
					if ( frOfr[n] == frOfr[j]){
						frOfr.splice(n, 1); //cutting out repeating friends 
						k++; // catching the number of mutual friends
					}
				}
					mutual[j] = k; // mutual friends asigned
			}
			// number of "friends of friends"
			numFoF = parseInt(frOfr.length)-1;
			// counter rearranged (used for mutual friends)
			n=numFoF;
			while (numFoF >= 0) { // looping trough all "friends of friends" from the array
				if (typeof frOfr[numFoF] != 'string') { // check if not string
					var helperIndex = parseInt(frOfr[numFoF])-1;
					frOfr[numFoF] = obj[helperIndex].firstName + ' ' +obj[helperIndex].surname + ' <b>(' + mutual[n] + 'sf)</b> ';  // array of "friends of friends"
					
				}
				else { // if string...
					frOfr[numFoF] = frOfr[numFoF] + ' <b>(' + mutual[n] + 'sf)</b> ';
				}
				numFoF--; n--;
			}
			// printing out "friends of friends"
			$("#frOfr").html('And these are friends of his friends: ' + "<i>" + frOfr + "</i>");
			
			$("#frOfr").css("background-color", "rgba(220, 220, 220, 0.4)");
		});
		i++; // incrementation
	});
});
$("#friends").css("background-color", "rgba(220, 220, 220, 0.4)");

