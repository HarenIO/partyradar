//Google AutoComplete
document.querySelector('#autocomplete_search').addEventListener('keydown', initialize);
    function initialize() {
      let input = document.getElementById('autocomplete_search');
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', function () {
      let place = autocomplete.getPlace();
      let selectedCity = place.address_components[0].long_name
      sessionStorage.setItem('selectedCity', selectedCity)
      window.open('./allevents.html', '_self')
      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      /* getMusicEvents(place.name, 10)
        .then(data => {
          console.log(data)
        }) 
        .catch((error) => {
          console.log(`An error has occured: ${error}`)
        }) */
    });
  }

//More info modal
const modal = document.querySelector('.modal')
let closeModal = document.querySelector('.close-button');
  closeModal.addEventListener('click', () => {
    modal.close();
  })


async function getMusicEvents(location , size){
  try{
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${location}&size=${size}&apikey=shAFCoGqhSmV3TIVDxbtWuL4Cjm6KF8N`)
    if(!res.ok){
      throw new Error(res.status)
    }
    const data = await res.json()
    console.log(data)
    return data
    
  }
  catch(error){
    console.error(error)
  }
}

async function getVenue(id){
  try{
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=shAFCoGqhSmV3TIVDxbtWuL4Cjm6KF8N`)
    if(!res.ok){
      throw new Error(res.status)
    }
    const data = await res.json()
    return data
  }
  catch(error){
    console.error(error)
  }
}


let iteration = 0;
const createShowcaseEvents = (event) => {
    document.querySelector(`.image-${iteration}`).setAttribute("src", `${event.images[5].url}`)
    document.querySelector(`.name-${iteration}`).innerHTML=`<b>Artist:</b> ${event.name}`
    document.querySelector(`.date-${iteration}`).innerHTML=`<b>Datum:</b> ${event.dates.start.localDate}`
    document.querySelector(`.venue-${iteration}`).innerHTML=`<b>Genre:</b> ${event.classifications[0].subGenre['name']}`
  

    document.querySelector(`.open-${iteration}`).addEventListener('click', () => {
      modal.showModal()
      document.querySelector('.modal-name').innerText=event.name
      document.querySelector('.modal-date').innerHTML=`<b>Datum:</b> ${event.dates.start.localDate}`
      document.querySelector('.modal-genre').innerHTML=`<b>Genre:</b> ${event.classifications[0].subGenre['name']}`
      document.querySelector('.modal-category').innerHTML=`<b>Kategori:</b> ${event.classifications[0].segment['name']}`
      document.querySelector('.modal-prices').innerHTML=`<b>Biljett:</b> ${event.priceRanges[0].min} ${event.priceRanges[0].currency}`
      getVenue(event.id).then(data => {
        document.querySelector('.modal-address').innerHTML=`<b>Plats:</b> ${venue = data._embedded.venues[0].name}`
      })
      document.querySelector('.modal-tickets').setAttribute("href", `${event.url}`)
    })
}



addEventListener('DOMContentLoaded', () => {
  getMusicEvents('Stockholm', 6).then(data => {
    const eventArray = data._embedded.events
    for(let event of eventArray){
      iteration++
      createShowcaseEvents(event)
    }
  })
});


