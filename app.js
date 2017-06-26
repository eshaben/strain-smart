$(document).ready(function() {
  window.onload = function() {
    $('#entrance-button').click(function() {
      $('#modal').hide()
    })
    $('#exit-button').click(function() {
      $('.modal-text').text("Sorry, you must be a valid Medical Marijuana patient or at least 21 years old.")
      $('.open-buttons').hide()
    })
  };

  $(".button-collapse").sideNav({
    closeOnClick: true,
    draggable: true,
    onOpen: function(el) {
      $('.blur-me').addClass("blurred")
    },
    onClose: function(el) {
      $('.blur-me').removeClass("blurred")
    }
  });

  var userInput = ''
  var baseURL = 'https://cors-anywhere.herokuapp.com/https://www.cannabisreports.com/api/v1.0/strains/'

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
        $('.results').prepend('<img class="leaf-border scroll-here" src="PotLeafBorder.png">')
        $('.main-results-title').text(data.data[0].name)

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
            var effectsFlavors = []
            var effects = []
            var flavors = []

            $.each(data.data, function(key, value){
              key = (key[0].toUpperCase() + key.slice(1)).replace(/_/g, " ")
              value = ((value/10)*100).toFixed(1) + '%'
              effectsFlavors.push(key = {key, value})
            })
            for (var i =0; i<= 5; i++){
              effects.push(effectsFlavors[i])
            }
            effects.push(effectsFlavors[12])
            for (var i=6; i <= 11; i++){
              flavors.push(effectsFlavors[i])
            }
          console.log(effects);
          console.log(flavors);
          $.each(effects, function(key, value){
            $('.results').append('<h5 class="results-para">'+this.key+': '+this.value+'</h5>')
            $('.results').append('<div class="progress result-data"><div class="determinate" style="width:'+this.value+'"></div></div>')
          })
            console.log(data.data);
          }
        });
      }
    });
    $('html, body').animate({
      scrollTop: $('.results').offset().top
    }, 2000)
  })
})
