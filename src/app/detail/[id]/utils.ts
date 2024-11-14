const parsePlatforms = (platforms: Platform[]) => {
    if(platforms) {
      const names = platforms.map((platform) => platform.name)
      return names.join(', ')
    } 
    return 'Platforms not availables'
   }
 
   const parseGenres = (genres: Genre[]) => {
     if(genres) {
       const names = genres.map((genre) => genre.name)
       return names.length > 1 ? names.slice(0, -1).join(', ') + ' & ' + names.slice(-1) : names.join('')
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