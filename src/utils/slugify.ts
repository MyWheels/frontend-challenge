export function slugify(str?: string | null): string {
  return (str || '')
    .toLowerCase()
    .replaceAll(/[èéêë]/g, 'e')
    .replaceAll(/[àáâä]/g, 'a')
    .replaceAll(/ï/g, 'i')
    .replaceAll(/ü/g, 'u')
    .replaceAll(/[òóö]/g, 'o')
    .replaceAll(/['"?.\\/[\]()]/g, '')
    .replaceAll(/ /g, '-')
}

export default slugify
