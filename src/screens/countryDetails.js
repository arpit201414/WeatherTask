import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button, Image } from "react-native";
import { useState } from "react/cjs/react.development";
import weatherAxios from "../api/weatherAxios";

const CountryDetails = ({ route }) => {
    const receivedData = route.params.data
    const [weatherData, setWeatherData] = useState({})
    console.log("receivedData--->>.", receivedData)

    const callWeatherApi = async (capital) => {
        const response = await weatherAxios.get("/current", {
            params: {
                access_key: "c46ec2dd8994e16c15407fc31ab1c5e4",
                query: capital
            }
        })
        console.log("response", response.data.current)
        setWeatherData(response.data.current)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <FlatList
                    data={receivedData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.itemStyle}>
                                <Text>{item.name}</Text>
                                <Text>{item.capital}</Text>
                                <Text>{item.region}</Text>
                                <Button
                                    title="Capital Weather"
                                    onPress={() => callWeatherApi(item.capital)}
                                />
                            </View>
                        )
                    }}
                />
                {weatherData && <View style={styles.weather}>
                    <Text>Temperature:-{weatherData.temperature}</Text>
                    <Image style={{ height: 120, width: 150 }} source={{ uri: String(weatherData.weather_icons) }} />
                    <Text>Wind_speed:-{weatherData.wind_speed}</Text>
                    <Text>Precip:-{weatherData.precip}</Text>
                </View>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    view: {
        flex: 2,
        marginHorizontal: 15,
    },
    itemStyle: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        height: 130,
        justifyContent: "center"
    },
    weather: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        justifyContent: "center"
    }
})

export default CountryDetails;