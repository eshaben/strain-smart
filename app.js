

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

  var userInput = ''
  var baseURL = 'https://cors-anywhere.herokuapp.com/https://www.cannabisreports.com/api/v1.0/strains/'

  // $(function autoComplete(){
  //   var strains = ['Good Medicine', 'Agent Orange', 'Critical Mass', 'Critical Kush',
  //     'LSD', 'Durango OG', 'Blue Dream', 'Girl Scout Cookies', 'Jack Herer',
  //     'Lemon Skunk', 'Harlequin', 'OG Kush', 'Gorilla Glue #4', 'XJ-13', 'Amnesia Haze',
  //     'Durban Poison', 'Bruce Banner', 'Sour Amnesia'
  //   ]
  //
  //   $('#search').autocomplete({
  //     source: strains
  //   })
  // })


  $('.submit-button').click(function() {
    event.preventDefault()
    var getSearchQuery = $('.search-field')
    userInput = 'search/' + (getSearchQuery.val()).replace(/ /g, "_")
    console.log(userInput);
    $('#test4').empty()
    $('#test5').empty()
    $('.error-message').empty()

    $.ajax({
      url: baseURL + userInput,
      type: "GET",
      dataType: "json",
      headers: {
        "x-api-key": "a1d66090af7e5d15f41a6007df11f4567ee91f3a"
      },
      success: function(data) {
        console.log(data.data);
        if (data.data.length === 0) {
          $('.error-message').text("Sorry, we currently do not have information available for this strain")
        } else {
          $('.main-results-title').text(data.data[0].name)
          $('.strain-image').attr('src', data.data[0].image)

          if (data.data[0].genetics.names === false) {
            $('.card-text').text("Not Currently Available")
          } else {
            $('.card-text').text(data.data[0].genetics.names)
          }

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

                if (data.data === false) {
                  $('.error-message').text("Currently No Information Available")
                } else {
                  var effectsFlavors = []
                  var effects = []
                  var flavors = []

                  $.each(data.data, function(key, value) {
                    key = (key[0].toUpperCase() + key.slice(1)).replace(/_/g, " ")
                    value = ((value / 10) * 100).toFixed(1) + '%'
                    effectsFlavors.push(key = {
                      key,
                      value
                    })
                  })
                  for (var i = 0; i <= 5; i++) {
                    effects.push(effectsFlavors[i])
                  }
                  effects.push(effectsFlavors[12])
                  for (var i = 6; i <= 11; i++) {
                    flavors.push(effectsFlavors[i])
                  }

                  $.each(effects, function(key, value) {
                    $('#test4').append('<h5 class="results-para">' + this.key + ': ' + this.value + '</h5>')
                    $('#test4').append('<div class="progress result-data"><div class="determinate" style="width:' + this.value + '"></div></div>')
                  })
                  $.each(flavors, function(key, value) {
                    $('#test5').append('<h5 class="results-para">' + this.key + ': ' + this.value + '</h5>')
                    $('#test5').append('<div class="progress result-data"><div class="determinate" style="width:' + this.value + '"></div></div>')
                  })
                  $('.search-again').click(function() {
                    $(window).scrollTop(0)
                  })
                  $('.hide').removeClass()
                }
              }
            })
            .then(function() {
              var container = $('body')
              var scrollTo = $('.leaf-border')
              $('body').scrollTop(
                scrollTo.offset().top - container.offset().top + container.scrollTop()
              )
            })
        }
      }, error: function(error){
        $('.error-message').text("Error occurred in loading data. Please try again.")
      }
    });
  })
})
