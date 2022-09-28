import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { ContainerStyles } from '../../Styles/SharedStyles';

const SearchBox: React.FC<
  {
    placeholder: string;
    buttonText: string;
    onPress: (searchText: string) => void;
  }
> = ({placeholder, buttonText, onPress}) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={ContainerStyles.hContainer}>
      <TextInput
        style={{flex: 1, borderColor: "grey", borderWidth: 1, margin: 4}}
        placeholder={placeholder}
        onChangeText={ text => setSearchText(text)}
        value={ searchText }
      />
      <Button
        title={ buttonText }
        onPress={ () => onPress(searchText) }
      />
    </View>
  );
};

export default SearchBox