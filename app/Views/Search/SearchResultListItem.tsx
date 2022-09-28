import React from "react";
import { Image, Text, View } from "react-native";
import { CoverSize, getCoverUrl, SearchResult } from "../../Models/SearchResult";
import { ContainerStyles, TextStyles } from "../../Styles/SharedStyles";


const SearchResultListItem: React.FC<
    {
      result: SearchResult;
    }
  > = ({result}) => {
    return (
      <View style={[ContainerStyles.hContainer, {alignItems: 'stretch'}]}>
        <Image
            style={{width: 60, height: 60, resizeMode: 'contain', margin: 6}}
            source={{
            uri: getCoverUrl(result, CoverSize.Small),
          }}
        />
        <View style={[ContainerStyles.vContainer, {flex: 1, margin: 6}]}>
            <View style={ContainerStyles.hContainer}>
                <Text style={TextStyles.h1} numberOfLines={1}>{result.title}</Text>
            </View>
            <View style={ContainerStyles.hContainer}>
                <Text numberOfLines={1} style={[TextStyles.body, {flex: 1}]}>by {result.author_name?.join(", ") ?? ""}</Text>
            </View>
        </View>
      </View>
    );
  };

  export default SearchResultListItem