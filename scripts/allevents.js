//On page load: Hämta nuvarande stad > Async request om musikevent i nuvarande stad
//Await funktion som loopar igenom response array
//Varje iteration av loop, skickar array till buildhtml
let selectedCity = sessionStorage.getItem('selectedCity')

async function getAllMusicEvents(size, selectedCity){
  try{
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${selectedCity}&size=${size}&apikey=shAFCoGqhSmV3TIVDxbtWuL4Cjm6KF8N`)
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

const createEvents = (event) => {
    document.querySelector(`.event-${iteration}`).style.display = "inline"
    document.querySelector(`.image-${iteration}`).setAttribute("src", `${event.images[1].url}`)
    document.querySelector(`.name-${iteration}`).innerHTML=`<b>Event:</b> ${event.name}`
    document.querySelector(`.date-${iteration}`).innerHTML=`<b>Datum:</b> ${event.dates.start.localDate}`
    document.querySelector(`.description-${iteration}`).innerHTML=`<b>Beskrivning:</b> ${event.classifications[0].subGenre['name']}`
    document.querySelector(`.category-${iteration}`).innerHTML=`<b>Kategori:</b> ${event.classifications[0].segment['name']}`
    let selectedEvent = event.id
    document.querySelector(`.event-${iteration}`).addEventListener('click', () => {
      sessionStorage.setItem('selectedEvent', selectedEvent)
      window.open('./eventdetails.html', '_self')
    })
}

let iteration = 0;
addEventListener('DOMContentLoaded', () => {
  if(selectedCity){
    document.querySelector('#city').innerText=selectedCity
    getAllMusicEvents(12, selectedCity).then(data => {
      const eventArray = data._embedded.events
      for(let event of eventArray){
        iteration++
        createEvents(event)
      }
    })
  }
  else{
    getAllMusicEvents(12, 'Stockholm').then(data => {
      const eventArray = data._embedded.events
      for(let event of eventArray){
        iteration++
        createEvents(event)
      }
    })
  }
});
