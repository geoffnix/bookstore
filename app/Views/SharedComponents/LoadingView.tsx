import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ContainerStyles } from "../../Styles/SharedStyles";

const LoadingView = () => {
    return (
        <View style={ContainerStyles.hContainer}>
            <Text>Loading</Text>
            <ActivityIndicator size="small"/>
        </View>
    );
}

export default LoadingView;