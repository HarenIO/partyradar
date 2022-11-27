let selectedEvent = sessionStorage.getItem('selectedEvent')



async function getVenueInfo(id){
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


getVenueInfo(selectedEvent).then(data => {
  document.querySelector('.event-name').innerText = data.name
  document.querySelector('.event-date').innerHTML = `<b>Datum: </b> ${data.dates.start.localDate} ${data.dates.start.localTime}`
  document.querySelector('.event-venue').innerHTML = `<b>Plats: </b>${data._embedded.venues[0].name}`
  document.querySelector('.event-genre').innerHTML = `<b>Genre: </b>${data.classifications[0].subGenre.name}`
  document.querySelector('.event-cost').innerHTML = `<b>Biljettpriser: </b> ${data.priceRanges[0].min} - ${data.priceRanges[0].max} ${data.priceRanges[0].currency}`
  document.querySelector('.event-link').setAttribute("href", `${data.url}`)
  document.querySelector('.event-link').innerHTML = `<b>Köp biljetter här </b>`
  document.querySelector(`.img-1`).setAttribute("src", `${data.images[1].url}`)
  document.querySelector(`.img-2`).setAttribute("src", `${data.images[3].url}`)
  document.querySelector(`.img-3`).setAttribute("src", `${data.images[5].url}`)
  document.querySelector(`.img-4`).setAttribute("src", `${data.images[7].url}`)
})

