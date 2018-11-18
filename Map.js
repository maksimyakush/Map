const str = '“Nashville, TN”, 36.17, -86.78“New York, NY”, 40.71, -74.00“Atlanta, GA”, 33.75, -84.39“Denver, CO”, 39.74, -104.98“Seattle, WA”, 47.61, -122.33“Los Angeles, CA”, 34.05, -118.24“Memphis, TN”, 35.15, -90.05';
class Map {
  constructor(cities) {
    this.cities = cities;
    this.citiesArray = this.citiesStringToArray(this.cities);
  }

  citiesStringToArray() {
    return this.cities
      .replace(/”/g, ', ')
      .replace(/“/g, ', ')
      .split(', ')
      .filter(item => item)
      .map(item => (Number(item) ? Number(item) : item))
      .reduce((acc, item, key, arr) => {
        if ((key + 1) % 4 === 0) {
          return [
            ...acc,
            {
              city: arr[key - 3],
              state: arr[key - 2],
              latitude: arr[key - 1],
              longitude: arr[key],
            },
          ];
        }
        return acc;
      }, []);
  }

  getClosestCity(latitude, longitude) {
    const closestCityData = this.citiesArray.reduce((acc, cityData) => {
      const currentDistance = Math.hypot(cityData.latitude - latitude, cityData.longitude - longitude);
      const closestDistance = Math.hypot(acc.latitude - latitude, acc.longitude - longitude);

      if (currentDistance < closestDistance) return cityData;
      return acc;
    }, this.citiesArray[0]);

    return `${closestCityData.city}, ${closestCityData.state}`;
  }

  getMostExtremeCity(extreme) {
    const sortedDataByLatitude = [...this.citiesArray].sort((a, b) => a.latitude - b.latitude);
    const sortedDataByLongitude = [...this.citiesArray].sort((a, b) => a.longitude - b.longitude);

    const northernmostData = sortedDataByLatitude[sortedDataByLatitude.length - 1];
    const southernmostData = sortedDataByLatitude[0];
    const easternmostData = sortedDataByLongitude[sortedDataByLongitude.length - 1];
    const westernmostData = sortedDataByLongitude[0];

    switch (extreme) {
      case 'northernmost':
        return `${northernmostData.city}, ${northernmostData.state}`;
      case 'southernmost':
        return `${southernmostData.city}, ${southernmostData.state}`;
      case 'easternmost':
        return `${easternmostData.city}, ${easternmostData.state}`;
      case 'westernmost':
        return `${westernmostData.city}, ${westernmostData.state}`;
      default:
        return new Error('enter valid name such as northernmost, southernmost, easternmost, or westernmost');
    }
  }

  getStateAbbreviations() {
    return this.citiesArray
      .reduce((acc, cityData) => [...acc, cityData.state], [])
      .filter((state, i, arr) => arr.indexOf(state) === arr.lastIndexOf(state))
      .join(' ');
  }
}

const map = new Map(str);
