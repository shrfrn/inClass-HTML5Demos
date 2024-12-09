'use strict'

var gZoomLevel = 10
var gMap

function mapReady() {
	console.log('Map is ready')
}

function getPosition() {
	if (!navigator.geolocation) {
		alert('HTML5 Geolocation is not supported in your browser')
		return
	}

	// One shot position retrieval...
	navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)

	// ...or continous watch
	// navigator.geolocation.watchPosition(showLocation, handleLocationError)
}

function showLocation(position) {
	console.log(position)
	const { latitude: lat, longitude: lng, accuracy } = position.coords

	document.getElementById('latitude').innerText = lat
	document.getElementById('longitude').innerText = lng
	document.getElementById('accuracy').innerText = accuracy

	var date = new Date(position.timestamp)
	document.getElementById('timestamp').innerText = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

	initMap(lat, lng)
}

function initMap(lat = 31, lng = 31) {
	const elMap = document.querySelector('.map')
	const mapOptions = {
		center: { lat, lng },
		zoom: gZoomLevel,
	}
	gMap = new google.maps.Map(elMap, mapOptions)

	const markerOptions = {
		position: { lat, lng },
		map: gMap,
		title: 'Hello World!',
	}
	const marker = new google.maps.Marker(markerOptions)
	setupMap(gMap)
}

function setupMap() {
	gMap.addListener('click', ev => {
		console.log(ev.latLng.lat(), ev.latLng.lng())
	})
}

function zoom(diff) {
	gZoomLevel += diff
	gMap.setZoom(gZoomLevel)
}

function pan() {
	const strLatLng = prompt('Enter lat, lng')
	const latLng = strLatLng.split(',')

	gMap.setCenter({ lat: +latLng[0], lng: +latLng[1] })
}

function handleLocationError(error) {
	var elLocationError = document.getElementById('locationError')

	switch (error.code) {
		case 0:
			elLocationError.innerHTML = 'There was an error while retrieving your location: ' + error.message
			break
		case 1:
			elLocationError.innerHTML = "The user didn't allow this page to retrieve a location."
			break
		case 2:
			elLocationError.innerHTML = 'The browser was unable to determine your location: ' + error.message
			break
		case 3:
			elLocationError.innerHTML = 'The browser timed out before retrieving the location.'
			break
	}
}
