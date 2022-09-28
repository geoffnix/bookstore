import { SearchType } from "../Models/SearchResult"

function queryKeyForSearchType(type: SearchType) {
    switch(type) {
        case SearchType.Author:
            return 'author';
        case SearchType.Title:
            return 'title';
        case SearchType.Search:
            return 'q';
    }
}

export const fetchBooksWithQuery = async (query: string, perPage: number, pageNumber: number) => {
    const url = `https://openlibrary.org/search.json?${query}&fields=id,title,key,author_name,cover_i,first_publish_year,subject&limit=${perPage}&offset=${perPage * (pageNumber - 1)}`
    // console.log("fetchBooks", url)
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data["docs"]
    } catch (e) {
        console.error(e)
        return []
    }
}

export const fetchBooks = async (type: SearchType, searchText: string, perPage: number, pageNumber: number) => {
    const query = `${queryKeyForSearchType(type)}=${encodeURIComponent(searchText)}`
    return await fetchBooksWithQuery(query, perPage, pageNumber);
}
