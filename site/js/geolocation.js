// Keep most of geolocation.js as is, but modify the findNearbyPlaces function
// to work with rakutenData when available

function findNearbyPlaces(lat, lng) {
    if (!placesService) {
      showGeoError("Places service not available");
      return;
    }

    const location = new google.maps.LatLng(lat, lng);
    const request = {
      location: location,
      radius: '500',
      type: ['store']
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
        // Use first result
        const place = results[0];
        document.getElementById("storeSearchInput").value = place.name;

        // Try to match with Rakuten stores if data is loaded
        if (window.rakutenData) {
          const matches = Object.entries(window.rakutenData.stores)
            .filter(([key, store]) =>
              store.name.toLowerCase().includes(place.name.toLowerCase())
            )
            .map(([key, store]) => ({
              id: key,
              name: store.name
            }));

          if (matches.length > 0) {
            recommendStoreCard(matches[0].id);
            return;
          }
        }

        // Use general category recommendation
        recommendCardFromType('general');
      } else {
        showGeoError("No stores found nearby");
      }
    });
  }