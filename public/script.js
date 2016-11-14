$(document).ready( function() {

	$( '#addJoke' ).on( 'submit', function( event ) {

		// Prevent the form from submitting.
		event.preventDefault();

		// Build the object
		var formInputs = {

			whoseJoke: $("#whoseJoke").val(),
			jokeQuestion: $("#jokeQuestion").val(),
			punchLine: $("#punchLine").val()

		};

		// Check to be sure each field has something.
		for( var item in formInputs ) {
			if ( formInputs[item] === "" ) {

				alert( "A joke needs all fields completed!" );

				return false;

			}
		}

		$.ajax({
			url: '/jokes',
			type: 'POST',
			dataType: 'json',
			data: formInputs,
		})
		.done(function( data ) {


			// Clear the form
			$( '#addJoke' ).children( '[type="text"]' ).each( function() {

				$( this ).val( '' );

			});

			$(".container-jokes").empty();

			for ( var i = 0; i < data.length; i++ ) {

				var li = $("<li />").addClass("joke").addClass("flip-container");
				var card = $("<div />").addClass("flipper card");
				var front = $("<div />").addClass("joke-question").addClass("front").text( data[i].jokeQuestion );
				var back = $("<div />").addClass("back");
				var punchline = $("<div />").addClass("joke-punchline").text( data[i].punchLine );
				var author = $("<div />").addClass("joke-author").text( data[i].whoseJoke );

					li.append( card.append( front ).append( back.append( punchline ).append( author ) ) );

					$(".container-jokes").append( li );

			}

		});


	});

		$.ajax({
			url: '/jokes',
			type: 'GET',
			dataType: 'json',
			data: {},
		})
		.done(function( data ) {


			$(".container-jokes").empty();

			for ( var i = 0; i < data.length; i++ ) {

				var li = $("<li />").addClass("joke").addClass("flip-container");
				var card = $("<div />").addClass("flipper").addClass("card");
				var front = $("<div />").addClass("joke-question").addClass("front").text( data[i].jokeQuestion );
				var back = $("<div />").addClass("back");
				var punchline = $("<div />").addClass("joke-punchline").text( data[i].punchLine );
				var author = $("<div />").addClass("joke-author").text( data[i].whoseJoke );

					li.append( card.append( front ).append( back.append( punchline ).append( author ) ) );

					$(".container-jokes").append( li );

			}

		});

});
