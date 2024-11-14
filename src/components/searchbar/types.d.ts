type Screenshots = {
    id: number,
    image_id: string
}
type Cover = {
    id: number,
    image_id: string
}
interface Game {
    screenshots: Array<Screenshots>
    id: number
    category: number
    name: string
    cover: Cover
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
interface GameDetail extends Game {
    screenshots: Screenshots[],
    similar_games: SimilarGame[],
    platforms: Array<Platform>,
    rating: number,
    first_release_date: number
    summary: string
    genres: Array<Genre>
}
interface GameWithTimestamp extends GameDetail {
    timestamp: number;
}