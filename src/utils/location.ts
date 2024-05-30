export const getLocation = async () => {
  if (navigator.geolocation) {
    const position: { coords: { latitude: number; longitude: number } } =
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } else {
    throw Error(
      "A geolocalização não é suportada por este navegador ou não foi permitida."
    );
  }
};
