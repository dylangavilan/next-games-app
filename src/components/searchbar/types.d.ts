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
    platforms: Array<number>
    cover: Cover
}
