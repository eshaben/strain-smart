$(document).ready(function() {
  window.onload = loadModal;

  var userInput = ''
  var baseURL = 'https://cors-anywhere.herokuapp.com/https://www.cannabisreports.com/api/v1.0/strains/'

  $('.submit-button').click(function() {
    event.preventDefault()
    getInput();
    emptyResults();
    showLoader();

    $.ajax({
      url: baseURL + userInput,
      type: "GET",
      dataType: "json",
      headers: {
        "x-api-key": "a1d66090af7e5d15f41a6007df11f4567ee91f3a"
      },
      success: function(data) {
        if (data.data.length === 0) {
          noStrainError(data)
        } else {
          appendName(data);
          appendImage(data);
          checkGenetics(data);

          var ucpc = data.data[0].ucpc
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
                  hideLoader(data);
                  noStrainError(data);
                } else {
                  renderData(data)
                }
              }
            })
            .then(function() {
              scrollToResults()
            })
        }
      },
      error: function(error) {
        var err = error.responseJSON.message
        hideLoader(data);
        $('.error-message').text(err)
      }
    });
    emptySearchField();
  })



  function hideModal() {
    $('#modal').hide()
  }

  function modalNoResponse() {
    $('.modal-text').text("Sorry, you must be a valid Medical Marijuana patient or at least 21 years old.")
    $('.open-buttons').hide()
  }

  function loadModal() {
    $('#entrance-button').click(hideModal)
    $('#exit-button').click(modalNoResponse)
  }

  function getInput() {
    var getSearchQuery = $('.search-field')
    userInput = 'search/' + (getSearchQuery.val()).replace(/ /g, "_")
  }

  function emptyResults() {
    $('#test4').empty()
    $('#test5').empty()
    $('.error-message').empty()
  }

  function showLoader() {
    $('.loader').removeClass('loader-hide')
  }

  function checkGenetics(data) {
    if (data.data[0].genetics.names === false) {
      $('.card-text').text("Not Currently Available")
    } else {
      $('.card-text').text(data.data[0].genetics.names)
    }
  }

  function appendName(data) {
    $('.main-results-title').text(data.data[0].name)
  }

  function appendImage(data) {
    $('.strain-image').attr('src', data.data[0].image)
  }

  function noStrainError(data) {
    $('.error-message').text("Sorry, we currently do not have information available for this strain")
  }

  function hideLoader(data) {
    $('.loader').addClass('loader-hide')
  }

  function scrollToResults() {
    var container = $('body')
    var scrollTo = $('.leaf-border')
    $('.loader').addClass('loader-hide')
    $('body').scrollTop(
      scrollTo.offset().top - container.offset().top + container.scrollTop()
    )
  }

  function emptySearchField() {
    $('.search-field').val('');
  }

  function renderData(data) {
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
})
