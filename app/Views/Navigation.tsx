import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SearchResult, SearchType } from "../Models/SearchResult";
import SearchDetailView from "./Search/SearchDetailView";
import SearchListView from "./Search/SearchListView";

export type TabScreenParamList = {
    Author: undefined;
    Title: undefined;
    Search: undefined;
  };

export type SearchStackParamList = {
    List: { searchType: SearchType };
    Detail: { result: SearchResult };
}

const Tab = createBottomTabNavigator<TabScreenParamList>()
const AuthorStack = createNativeStackNavigator<SearchStackParamList>()
const TitleStack = createNativeStackNavigator<SearchStackParamList>()
const SearchStack = createNativeStackNavigator<SearchStackParamList>()

const AppNavigationContainer = () => {

  const resultBasedTitle = ({ route }) => ({ title: route.params.result.title })

  function SearchStackScreen() {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen 
          name="List" 
          component={SearchListView} 
          initialParams={{searchType: SearchType.Search}}
          options={{title: 'Search by Keyword'}} 
          />
        <SearchStack.Screen name="Detail" component={SearchDetailView} options={ resultBasedTitle }/>
      </SearchStack.Navigator>
    )

  }

  function AuthorStackScreen() {
    return (
      <AuthorStack.Navigator>
        <AuthorStack.Screen 
          name="List" 
          component={SearchListView} 
          initialParams={{searchType: SearchType.Author}}
          options={{title: 'Browse by Author'}} 
          />
        <AuthorStack.Screen name="Detail" component={SearchDetailView} options={ resultBasedTitle }/>
      </AuthorStack.Navigator>
    )
  }

  function TitleStackScreen() {
    return (
      <TitleStack.Navigator>
        <TitleStack.Screen 
          name="List" 
          component={SearchListView} 
          initialParams={{searchType: SearchType.Title}}
          options={{title: 'Browse by Title'}}
          />
        <TitleStack.Screen name="Detail" component={SearchDetailView} options={ resultBasedTitle }/>
      </TitleStack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Author" 
          component={AuthorStackScreen} 
          options={{ 
            headerShown: false, 
            tabBarIcon: ({ color, size }) => (
              <Image style={[styles.tabBarIcon, {tintColor: color}]} source={{uri: "https://openlibrary.org/static/images/icons/avatar_author.png"}}/>
            ), 
          }} />
        <Tab.Screen 
          name="Title" 
          component={TitleStackScreen} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image style={[styles.tabBarIcon, {tintColor: color}]} source={{uri: "https://openlibrary.org/static/images/icons/icon_read-borrow.png"}}/>
            ),
          }} />
        <Tab.Screen 
          name="Search" 
          component={SearchStackScreen} 
          options={{ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image style={[styles.tabBarIcon, {tintColor: color}]} source={{uri: "https://openlibrary.org/static/images/search-lens.png"}}/>
            ), 
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 20,
    resizeMode: 'contain'
  },
});

export default AppNavigationContainer