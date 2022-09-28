import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CoverSize, getCoverUrl } from "../../Models/SearchResult";
import { TextStyles } from "../../Styles/SharedStyles";
import { SearchStackParamList } from "../Navigation";


const SearchDetailView: React.FC<NativeStackScreenProps<SearchStackParamList, 'Detail'>> = ({route, navigation}) => {
    const { result } = route.params;

    return (
      <View>
        <View style={styles.imageContainer}>
          <Image
              style={styles.coverImage}
              source={{
              uri: getCoverUrl(result, CoverSize.Large),
            }}
          />
        </View>
        <View style={[styles.textContainer]}>
          <Text style={TextStyles.h1}>{result.title}</Text>
          <Text style={TextStyles.body}>by {result.author_name?.join(", ") ?? ""}</Text>
          <Text style={[TextStyles.body,{paddingTop: 10}]}>First Published: {result.first_publish_year} </Text>
          <Text style={[TextStyles.body,{paddingTop: 10}]}>Subjects:{"\n" + result.subject?.slice(0, 8).join("\n") ?? ""}</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  textContainer: {
    margin: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  coverImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
});

export default SearchDetailView