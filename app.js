$(document).ready(function() {
  window.onload = function () {
  document.getElementById('entrance-button').onclick = function () {
      document.getElementById('modal').style.display = "none"
  };
};

  $(".button-collapse").sideNav({
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpen: function(el) {
      $('.blur-me').addClass("blurred")
    },
    onClose: function(el) {
      $('.blur-me').removeClass("blurred")
    }
  });

  var userInput = ''
  var baseURL= 'https://cors-anywhere.herokuapp.com/https://www.cannabisreports.com/api/v1.0/strains/'

  $('.submit-button').click(function() {
      event.preventDefault()
      var getSearchQuery = $('.search-field')
      userInput = 'search/' + (getSearchQuery.val()).replace(/ /g, "_")
      console.log(userInput);

      $.ajax({
          url: baseURL + userInput,
          type: "GET",
          dataType: "json",
          headers: {
            "x-api-key": "a1d66090af7e5d15f41a6007df11f4567ee91f3a"
          },
          success: function(data) {

            var ucpc = data.data[0].ucpc
            console.log(data.data[0]);
            var ucpcURL = ucpc + "/effectsFlavors"

            $.ajax({
              url: baseURL + ucpcURL,
              type: "GET",
              dataType: "json",
              headers: {
                "x-api-key": "a1d66090af7e5d15f41a6007df11f4567ee91f3a"
              },
              success: function(data) {
                $.each(data.data, function(key,value){
                  console.log(key + ":" + value)
                })
                console.log(data.data);
              }
            });

          }
      });
  })
})


// $.get(url)
// .then(function(data){
//   console.log(data);
// })
