export interface SearchResult {
    key: string,
    title: string,
    cover_i: string,
    author_name: [string],
    first_publish_year: string,
    subject: [string]
}

export enum CoverSize {
    Large = "L",
    Medium = "M",
    Small = "S"
}

export function getCoverUrl(result: SearchResult, size: CoverSize) {
    return `https://covers.openlibrary.org/b/id/${result.cover_i}-${size}.jpg`
}

export enum SearchType {
    Author = "Author",
    Title = "Title",
    Search = "Search"
}