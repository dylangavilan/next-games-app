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
interface GameDetail extends Game {
    screenshots: Screenshots[],
    similar_games: SimilarGame[],
    platforms: Array<number>,
    rating: number,
    first_release_date: number
}
interface GameWithTimestamp extends GameDetail {
    timestamp: number;
}