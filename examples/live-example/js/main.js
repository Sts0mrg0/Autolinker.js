/*global $, Autolinker, CheckboxOption, RadioOption, TextOption */
/*jshint browser:true */

$( document ).ready( function() {
	var $inputEl = $( '#input' ),
	    $outputEl = $( '#output' ),

	    urlsSchemeOption,
	    urlsWwwOption,
	    urlsTldOption,
	    emailOption,
	    phoneOption,
	    twitterOption,
	    hashtagOption,

	    newWindowOption,
	    stripPrefixOption,
	    truncateLengthOption,
	    truncationLocationOption,
	    classNameOption;

	init();


	function init() {
		urlsSchemeOption = new CheckboxOption( { name: 'urls.schemeMatches', description: 'Scheme:// URLs', defaultValue: true } ).onChange( autolink );
		urlsWwwOption = new CheckboxOption( { name: 'urls.wwwMatches', description: '\'www\' URLS', defaultValue: true } ).onChange( autolink );
		urlsTldOption = new CheckboxOption( { name: 'urls.tldMatches', description: 'TLD URLs', defaultValue: true } ).onChange( autolink );
		emailOption = new CheckboxOption( { name: 'email', description: 'Email Addresses', defaultValue: true } ).onChange( autolink );
		phoneOption = new CheckboxOption( { name: 'phone', description: 'Phone Numbers', defaultValue: true } ).onChange( autolink );
		twitterOption = new CheckboxOption( { name: 'twitter', description: 'Twitter Handles', defaultValue: true } ).onChange( autolink );
		hashtagOption = new RadioOption( { name: 'hashtag', description: 'Hashtags', options: [ false, 'twitter', 'facebook', 'instagram' ], defaultValue: 'twitter' } ).onChange( autolink );

		newWindowOption = new CheckboxOption( { name: 'newWindow', description: 'Open in new window', defaultValue: true } ).onChange( autolink );
		stripPrefixOption = new CheckboxOption( { name: 'stripPrefix', description: 'Strip prefix', defaultValue: true } ).onChange( autolink );
		truncateLengthOption = new TextOption( { name: 'truncate.length', description: 'Truncate Length', size: 2, defaultValue: '0' } ).onChange( autolink );
		truncationLocationOption = new RadioOption( { name: 'truncate.location', description: 'Truncate Location', options: [ 'end', 'middle', 'smart' ], defaultValue: 'end' } ).onChange( autolink );

		classNameOption = new TextOption( { name: 'className', description: 'CSS class(es)', size: 10 } ).onChange( autolink );

		$inputEl.on( 'keyup change', autolink );

		// Perform initial autolinking
		autolink();
	}


	function autolink() {
		var inputText = $inputEl.val().replace( /\n/g, '<br>' ),
		    linkedHtml = Autolinker.link( inputText, createAutolinkerOptionsObj() );

		console.log( createAutolinkerOptionsObj() );
		$outputEl.html( linkedHtml );
	}


	function createAutolinkerOptionsObj() {
		return {
			urls : {
				schemeMatches : urlsSchemeOption.getValue(),
				wwwMatches    : urlsWwwOption.getValue(),
				tldMatches    : urlsTldOption.getValue()
			},
			email       : emailOption.getValue(),
			phone       : phoneOption.getValue(),
			twitter     : twitterOption.getValue(),
			hashtag     : hashtagOption.getValue(),

			newWindow   : newWindowOption.getValue(),
			stripPrefix : stripPrefixOption.getValue(),
			className   : classNameOption.getValue(),
			truncate    : {
				length   : +truncateLengthOption.getValue(),
				location : truncationLocationOption.getValue()
			}
		};
	}

} );