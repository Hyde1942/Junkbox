//MongoDB Playlist Collection.

var playList = new Mongo.Collection("playList");


if (Meteor.isClient) {

  Template.body.helpers({
    songs: function () {
      return Session.get('searchResult');
    },
    getSongList: function () {
      return playList.find({},{sort: {createdAt: 1}});
    },
    removeSong: function () {
    }
  });

  Template.body.events({
    'click .list-group-item a' : function (event) {//Adds Video to the PlayList
      event.preventDefault();
      var videoId = event.target.href.split('=')[1],
          name    =  event.target.textContent;
      playList.insert({ songName: name, songID: videoId, played: false, createdAt: new Date() });
      event.target.offsetParent.remove();
    }
  });

  

}

if (Meteor.isServer) {
  
}


