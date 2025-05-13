export interface Lookup {
  id: string,
  en: string,
  fr: string
}

interface ApiLookupRow {
  id: string,
  fields: {
    [key: string]: string;
  }
}

export function mapRowsToLookupStore(rows: Array<ApiLookupRow>) {
  return rows.map((r) => ({
    id: r.fields['ID'],
    en: r.fields['EN'],
    fr: r.fields['FR']
  }));
}  


export function lookupNameInStore(store: Array<Lookup>, id: string, locale: keyof Lookup) {
  let name = undefined;
  const lookup = store.find((row) => row.id === id);
  if (lookup !== undefined) name = lookup[locale];
  return name;
}