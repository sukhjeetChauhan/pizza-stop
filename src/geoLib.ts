import { getDistance, convertDistance } from 'geolib'

interface Location {
  latitude: number
  longitude: number
}

export default function calculateAddressDistance(location: Location) {
  // Your location coordinates
  const myLocation = {
    latitude: -36.295798694239416,
    longitude: 174.52367212522643,
  } //  Pizza Stop coordinates

  // User's location coordinates
  const userLocation = location

  // Calculate distance in meters
  const distanceInMeters = getDistance(myLocation, userLocation)

  // Convert distance to kilometers
  const distanceInKm = convertDistance(distanceInMeters, 'km')

  return distanceInKm
}
