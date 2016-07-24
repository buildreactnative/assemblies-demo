import Config from 'react-native-config';

export const DEV = true;

export const API = 'http://localhost:2403';

export const GooglePlacesCityConfig = {
  key: Config.GOOGLE_PLACES_API_KEY,
  language: 'en',
  types: '(cities)',
};

export const GooglePlacesStreetConfig = {
  key:  Config.GOOGLE_PLACES_API_KEY,
  language: 'en'
}
