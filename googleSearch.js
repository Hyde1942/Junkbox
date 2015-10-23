// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
function OnLoadCallback() {
      gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
  // This API key is intended for use only in this lesson.
  // See http://goo.gl/PdPA1 to get a key for your own applications.
  gapi.client.setApiKey('AIzaSyDEAEbhaBo9ee3qt55ASImwBd7w3SW_968');
}

var reactiveSearch = {
	init: function(){
		var _self = this;
		var $input = $('#search');
		/* Only get the value from each key up */

		var keyups = Rx.Observable.fromEvent($input, 'keyup')
			.map(function (e) {
				return e.target.value;
			});
		
		var notValid = keyups.throttle(1000 /* ms */).filter(function (text) {
			return text.length <= 2;
		});

		notValid.subscribe(function (){
			Session.set('searchResult', []);
		});

		var filtered = keyups.filter(function (text) {
			return text.length > 2;
		});

		/* Now throttle/debounce the input for 500ms */
		var throttled = filtered
			.throttle(500 /* ms */);

		/* Now get only distinct values, so we eliminate the arrows and other control characters */
		var distinct = throttled
			           .distinctUntilChanged();

		distinct.subscribe( function (data) {
			var request = gapi.client.youtube.search.list({
		        part: 'snippet',
		        category: 'music',
		        format: 5,
		        q: data
		    });
		    
		    // Send the request to the API server,
		    // and invoke onSearchRepsonse() with the response.
		    request.execute(_self.onSearchResponse);
		});
	},
	
	onSearchResponse : function (response){
    	Session.set('searchResult', response.items);
    }
};


