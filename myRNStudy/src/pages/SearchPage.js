import React from "react";
import { StyleSheet, TextInput } from "react-native";

class SearchPage extends React.Component {
    render() {
        return <TextInput style={styles.input} />;
    }
}

const styles = StyleSheet.create({
    input: {
        textAlignVertical: "center",
        paddingLeft: 20,
        paddingRight: 20,
        width: "90%",
        height: 40,
        top: 10,
        left: "5%",
        bottom: 10,
        backgroundColor: "#88888833",
        borderRadius: 25,
    },
});

export default SearchPage;