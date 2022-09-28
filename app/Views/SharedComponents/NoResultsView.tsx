import React from "react";
import { Text, View } from "react-native";
import { TextStyles } from "../../Styles/SharedStyles";

const NoResultsView = () => {
    return (
        <Text style={[TextStyles.centered, TextStyles.h1, {margin: 20}]}>No results found.</Text>
    );
}

export default NoResultsView;