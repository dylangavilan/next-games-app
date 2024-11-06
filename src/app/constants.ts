type cover_size = 'cover_small' | 'screenshot_med' | 'cover_big' | 'logo_med' | 'screenshot_big' | 'micro'

export const getImage = (size: cover_size, image_id: string): string => {
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.jpg`
}