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
            if(i===0) return name
            if (i === genres.length - 1 && genres.length > 1) return `& ${name}`;
            return i === genres.length - 2 ? `${name} ` : `${name}, `;
        }).join('');
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

const parseCompanies = (companies: Company[]) => (companies.map(({company}) => (company.name) ).join(', '))

export { getDate , parseGenres, parsePlatforms, parseCompanies }