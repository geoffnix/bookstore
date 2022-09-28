import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SearchResult, SearchType } from "../../Models/SearchResult";
import { fetchBooks } from "../../Services/BooksApi";
import { ContainerStyles } from "../../Styles/SharedStyles";
import { SearchStackParamList } from "../Navigation";
import LoadingView from "../SharedComponents/LoadingView";
import NoResultsView from "../SharedComponents/NoResultsView";
import SearchBox from "../SharedComponents/SearchBox";
import SeparatorView from "../SharedComponents/SeparatorView";
import SearchResultListItem from "./SearchResultListItem";

function placeholderText(type: SearchType) {
    switch(type) {
        case SearchType.Author:
            return 'Enter author name';
        case SearchType.Title:
            return 'Enter title';
        case SearchType.Search:
            return 'Enter search terms';
    }
}

function searchButtonText(type: SearchType) {
    switch(type) {
        case SearchType.Author:
        case SearchType.Title:
            return 'Browse';
        case SearchType.Search:
            return 'Search';
    }
}

const SearchListView: React.FC<NativeStackScreenProps<SearchStackParamList, 'List'>> = ({route, navigation}) => {
    const pageSize: number = 20
    const { searchType } = route.params;

    const [data, setData] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(0);
    const [loadedAll, setLoadedAll] = useState(false);
   
    // a change of searchText or page should trigger fetching data
    useEffect(() => {
        fetchNextPage()
    }, [searchText, page])

    const fetchNextPage = async () => {
        if (loading || loadedAll) { return; }
        
        setLoading(true);

        if (page == 0) {
            setData([]);
        } else {
            let results = await fetchBooks(searchType, searchText, pageSize, page);
            if (results.length < pageSize) {
                setLoadedAll(true)
            }
            if (page == 1) {
                setData(results);
            } else {
                setData(prevResults => ([...prevResults, ...results]));
            }
        }

        setLoading(false);
    }
 
    const onSelect = (item: SearchResult) => {
        navigation.push("Detail", {result: item}); 
    }

    // Trigger the next page to load
    const onEndReached = () => {
        if (loadedAll) {
            return;
        }
        setPage(prevPage => (prevPage + 1))
    }

    // reset state
    const onSearch = (text: string) => {
        setSearchText(text)
        setPage(1)
        setLoadedAll(false)
    }

    const PaginationInfoView = () => {
        return(
            <Text style={{textAlign: "center", padding: 6}}>Page: {page} - Results Fetched: {data.length} - Loaded all: { loadedAll.toString() }</Text>  
        );
    }

    return (
        <View style={[ContainerStyles.vContainer, {flex: 1}]}>
            <SearchBox 
                placeholder={ placeholderText(searchType) }
                buttonText={ searchButtonText(searchType) }
                onPress={ onSearch }
                />
            <PaginationInfoView/>
            {loading && <LoadingView />}
            {data.length == 0 && loadedAll &&  <NoResultsView /> }
            {data && <FlatList
                data={ data }
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={ () => onSelect(item)}>
                        <SearchResultListItem result={ item } />
                    </TouchableOpacity>
                ) }
                ItemSeparatorComponent={ SeparatorView }
                keyExtractor={ (item) => item.key }
                onEndReached={ onEndReached }
                onEndReachedThreshold={ 0.2 }
                />
            }
        </View>
    );
  };

  export default SearchListView