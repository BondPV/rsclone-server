interface IFilters {
  [key: string]: string | number;
}

function getFilter(query: IFilters, fields: string[]): IFilters {
  const filters:IFilters = {};
  fields.forEach(element => {
    if (query[element] !== undefined) {
      filters[element] = query[element];
    }
  });

  return filters;
}

export default getFilter;