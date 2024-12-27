type Screenshots = {
    id: number,
    image_id: string
}
type Cover = {
    id: number,
    image_id: string,
    url: string
}
interface Game {
    screenshots: Array<Screenshots>
    id: number
    category: number
    name: string
    cover?: Cover
}
type SimilarGame = {
    name: string,
    cover: Cover,
}
type Platform = {
    id: number, 
    name: string
}
type Genre = {
    id: number,
    name: string,
}
type Company = {
    id: number,
    company: {
        id: number
        name: string
    }
}
interface GameDetail extends Game {
    screenshots: Screenshots[],
    similar_games: SimilarGame[],
    platforms: Platform[],
    rating: number,
    first_release_date: number
    summary: string
    genres: Genre[]
    url?: string
    involved_companies: Company[]
}
interface GameWithTimestamp extends GameDetail {
    timestamp: number;
}