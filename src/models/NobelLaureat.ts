interface Name {
  en: string;
  se: string;
}

interface City {
  en: string;
  no: string;
  se: string;
}

interface Country {
  en: string;
  no: string;
  se: string;
}

interface Location {
  city: City;
  country: Country;
  cityNow: {
    en: string;
    no: string;
    se: string;
    sameas: string[];
  };
  countryNow: {
    en: string;
    no: string;
    se: string;
    sameas: string[];
  };
  continent: Name;
  locationString: Name;
}

interface Affiliation {
  name: Name;
  nameNow?: Name;
  city: Name;
  country: Name;
  cityNow: {
    en: string;
    no: string;
    se: string;
    sameas: string[];
  };
  countryNow: {
    en: string;
    no: string;
    se: string;
    sameas: string[];
  };
  continent?: Name;
  locationString: Name;
}

interface Category {
  en: string;
  no: string;
  se: string;
}

interface Prize {
  awardYear: string;
  category: Category;
  categoryFullName: Category;
  sortOrder: string;
  portion: string;
  dateAwarded: string;
  prizeStatus: string;
  motivation: Name;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  affiliations: Affiliation[];
  links: {
    rel: string;
    href: string;
    action: string;
    types: string;
  };
}

export interface NobelLaureate {
  id: string;
  knownName: Name;
  givenName: Name;
  familyName: Name;
  fullName: Name;
  fileName: string;
  gender: string;
  birth: {
    date: string;
    place: {
      city: City;
      country: Country;
      cityNow: {
        en: string;
        no: string;
        se: string;
        sameas: string[];
      };
      countryNow: {
        en: string;
        no: string;
        se: string;
        sameas: string[];
      };
      continent: Name;
      locationString: Name;
    };
  };
  wikipedia: {
    slug: string;
    english: string;
  };
  wikidata: {
    id: string;
    url: string;
  };
  sameas: string[];
  links: {
    rel: string;
    href: string;
    action: string;
    types: string;
  };
  nobelPrizes: Prize[];
}
