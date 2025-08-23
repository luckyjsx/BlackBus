import React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedText } from '../themed/ThemedText'
import { ThemedView } from '../themed/ThemedView'

let busdata = {
    "_id": "687f808f5ceda81e7c266644",
    "name": "Shatabdi Deluxe",
    "busNumber": "DL1234",
    "routeId": {
      "_id": "687e19b6572bf8397c30fa5c",
      "routeNumber": "100",
      "routeName": "Airport Shuttle",
      "startLocation": "Main Terminal",
      "endLocation": "City Center",
      "distance": 18.4,
      "estimatedTime": 45,
      "stops": [
        {
          "coordinates": {
            "lat": 40.7128,
            "lng": -74.006
          },
          "_id": "687e1809894e5aa5a8f89223",
          "stop_name": "Balotra Depo",
          "arrival_time": "2025-07-21T08:00:00.000Z",
          "departure_time": "2025-07-21T08:05:00.000Z",
          "__v": 0
        },
        {
          "coordinates": {
            "lat": 40.7128,
            "lng": -74.006
          },
          "_id": "687e17e0894e5aa5a8f89221",
          "stop_name": "Central Station",
          "arrival_time": "2025-07-21T08:00:00.000Z",
          "departure_time": "2025-07-21T08:05:00.000Z",
          "__v": 0
        }
      ],
      "status": "active",
      "createdAt": "2025-07-21T10:43:02.066Z",
      "updatedAt": "2025-07-21T10:43:02.066Z",
      "__v": 0
    },
    "from": "Delhi",
    "to": "Jaipur",
    "departureTime": "08:30",
    "arrivalTime": "13:00",
    "date": "2025-08-24T00:00:00.000Z",
    "price": 450,
    "seatsAvailable": 30,
    "createdAt": "2025-07-22T12:14:07.334Z",
    "updatedAt": "2025-07-22T12:14:07.334Z",
    "__v": 0
  }

  const convertHoursToHM = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const BusCard = () => {
    return (
        <ThemedView>
            <ThemedView>
                <ThemedText>{busdata.arrivalTime} - {busdata.departureTime}</ThemedText>
                <ThemedText>{convertHoursToHM(busdata.routeId.estimatedTime)}</ThemedText>
                
            </ThemedView>
        </ThemedView>
    )
}

export default BusCard

const styles = StyleSheet.create({})