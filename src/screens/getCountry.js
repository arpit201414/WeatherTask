import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, Alert } from "react-native";
import countryAxios from "../api/countryAxios";

const GetCountry = ({ navigation }) => {
    const [data, setData] = useState([])
    const [country, SetCountry] = useState("")



    //useEffect(() => { callApi() }, [])

    const callApi = async () => {
        try {
            const response = await countryAxios.get(`/name/${country}`, {
                params: {
                    access_key: "a02a41422de510ba95710eeaef94417f",
                    FullText: true
                }
            });
            // console.log("response====", response.data);
            let countryData = []
            let array = response.data
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element.name === country) {
                    countryData.push(element)
                }

            }
            setData(countryData)
            // setData(response.data);
            filterData();

        } catch (error) {
            Alert.alert("Something went wrong", "Data not found")
            console.log("error", error);
        }

    }

    useEffect(() => {
        if (data && data.length > 0) {
            navigation.navigate("countryDetails", { data: data })
        }
    }, [data])
    const filterData = () => {
        let array = []
        for (let i = 0; i < data.length; i++) {
            let element = data[i]
            if (element.name === country) {
                console.log("element.name", element.name);
                array.push(data[i]);
                // setData(data[i])
            }
            setData(array)
        }

        // console.log("array-->>", data)
        // navigation.navigate("countryDetails", { data: data })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <TextInput
                    style={styles.input}

                    placeholder="Enter country"
                    value={country}
                    onChangeText={(text) => SetCountry(text)}
                />
                <Button
                    title="Submit"
                    disabled={country == ""}
                    onPress={() => { callApi() }}
                />
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
        marginHorizontal: 15
    },
    input: {
        borderWidth: 1,
        padding: 5,
        height: 30,
        marginBottom: 15
    }
})

export default GetCountry;