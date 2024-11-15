const parsePlatforms = (platforms: Platform[]) => {
    if(platforms) {
      const names = platforms.map((platform) => platform.name)
      return names.join(', ')
    } 
    return 'Platforms not availables'
   }
 
   const parseGenres = (genres: Genre[]) => {

     if(genres) {
        return genres.map(({ name }, i) => {
            if (i === genres.length - 1 && genres.length > 1) return `& ${name}`;
            return i === genres.length - 2 ? `${name} ` : `${name}, `;
        }).join('').trim();
     }
     return 'Not genres'
   }
 
   const getDate = (timestamp: number) => {
     const fecha = new Date(timestamp * 1000); 
     const day = String(fecha.getDate()).padStart(2, '0');
     const month = String(fecha.getMonth() + 1).padStart(2, '0');
     const year = fecha.getFullYear();
     return `${day}/${month}/${year}`;
   }
  
export { getDate , parseGenres, parsePlatforms }