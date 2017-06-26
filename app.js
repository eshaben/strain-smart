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
        $('.strain-image').attr('src', data.data[0].image)
        $('.card-text').text(data.data[0].genetics.names)

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
            $('#test4').append('<h5 class="results-para">'+this.key+': '+this.value+'</h5>')
            $('#test4').append('<div class="progress result-data"><div class="determinate" style="width:'+this.value+'"></div></div>')
          })
          $.each(flavors, function(key, value){
            $('#test5').append('<h5 class="results-para">'+this.key+': '+this.value+'</h5>')
            $('#test5').append('<div class="progress result-data"><div class="determinate" style="width:'+this.value+'"></div></div>')
          })
          //for search bar on bottom of page
          //  $('.results').append('<form class="search-form"><div class="input-field"><input id="search" class="search-field" type="search" value="" placeholder="e.g. Jack Herer" required><label class="label-icon" for="search"><i class="material-icons small">search</i></label><i class="material-icons close-icon inline">close</i><button class="submit-button" type="submit" name="button">Go!</button></div></form>')

           $('.hide').removeClass()

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
