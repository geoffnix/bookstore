import { StyleSheet } from "react-native";

export const ContainerStyles = StyleSheet.create({
    hContainer: {
        flexDirection: 'row'
    },
    vContainer: {
        flexDirection: 'column'
    }
})

export const TextStyles = StyleSheet.create({
    centered: {
        textAlign: "center",
    },
    body: {
        fontSize: 14
    },
    h1: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})