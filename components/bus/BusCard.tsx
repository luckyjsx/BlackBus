import { useTheme } from "@/lib/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";

let busdata = {
  _id: "687f808f5ceda81e7c266644",
  name: "Shatabdi Deluxe",
  busNumber: "DL1234",
  routeId: {
    _id: "687e19b6572bf8397c30fa5c",
    routeNumber: "100",
    routeName: "Airport Shuttle",
    startLocation: "Main Terminal",
    endLocation: "City Center",
    distance: 18.4,
    estimatedTime: 165, // example: in minutes
    stops: [],
    status: "active",
  },
  from: "Delhi",
  to: "Jaipur",
  departureTime: "08:30",
  arrivalTime: "13:00",
  date: "2025-08-24T00:00:00.000Z",
  price: 450,
  seatsAvailable: 30,
};

const convertHoursToHM = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const BusCard = () => {
  const theme = useTheme();
  return (
    <ThemedView style={[styles.card, { backgroundColor: "#030000", borderColor:theme.lightSilver }]}>
      
      <View style={styles.leftCol}>
        <ThemedText style={[styles.busName,{color:theme.text}]}>{busdata.name}</ThemedText>
        <ThemedText style={styles.time}>
          {busdata.departureTime} → {busdata.arrivalTime}
        </ThemedText>
        <ThemedText style={styles.subText}>
          Duration: {convertHoursToHM(busdata.routeId.estimatedTime)}
        </ThemedText>
        <ThemedText style={styles.subText}>
          Seats: {busdata.seatsAvailable}
        </ThemedText>
      </View>

      {/* Right Column */}
      <View style={styles.rightCol}>
        <ThemedText style={styles.price}>₹{busdata.price}</ThemedText>
        <ThemedText style={styles.onward}>Onward</ThemedText>
        <ThemedText style={styles.rating}>⭐ 4.5</ThemedText>
      </View>
    </ThemedView>
  );
};

export default BusCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
  },
  leftCol: {
    flex: 2,
  },
  rightCol: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  busName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  time: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    color: "#666",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e91e63",
  },
  onward: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: "#ff9800",
    marginTop: 8,
  },
});
