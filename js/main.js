function orgSearch(usernameString) {
  var settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://api.github.com/users/'+ encodeURI(usernameString)+ '/orgs',
    'method': 'GET',
    'processData': false,
    'data': '{}'
  };

$.ajax(settings).done(function (response) {
    var orgInfoList = response.map(function(object){
      return new OrgInfo(object);
    });
    // OrgInfoList is an array of instances of the OrgInfo constructor
    orgInfoList.forEach(function(instance){
      instance.buildDisplay();
    });
    console.log(orgInfoList);
  });
}

// Submit Button
$('form').submit(function() {
  event.preventDefault();
  var usernameString = $('#githubUser').val();
  clearDisplay();
  orgSearch(usernameString);
});

// Organization Details constructor
function OrgInfo(orgObject) {
  this.name = orgObject.login;
  this.icon = orgObject.avatar_url;
}

// Method on prototype
OrgInfo.prototype.buildDisplay = function() {
  var container = $('<div>').attr('class', 'organization-container');
  var image = $('<img>').attr('src', this.icon).prependTo(container);
  var label = $('<h2>').html(this.name).appendTo(container);
  $(container).prependTo('.content');
};
function clearDisplay() {
  $('.content').empty();
}
