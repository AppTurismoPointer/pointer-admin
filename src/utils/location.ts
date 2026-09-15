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

export type ReverseGeocodeAddress = {
  street: string;
  number: string;
  neighborhood: string;
  postalCode: string;
};

export const getAddressByCoordinates = async (
  latitude: number,
  longitude: number
): Promise<ReverseGeocodeAddress> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=pt-BR`
  );

  if (!response.ok) {
    throw Error("Não foi possível buscar o endereço para essa localização.");
  }

  const data = await response.json();
  const address = data?.address ?? {};

  const postalCodeDigits = String(address.postcode ?? "").replace(/\D/g, "");

  return {
    street: address.road ?? "",
    number: address.house_number ?? "",
    neighborhood: address.suburb ?? address.neighbourhood ?? "",
    postalCode:
      postalCodeDigits.length === 8
        ? `${postalCodeDigits.slice(0, 5)}-${postalCodeDigits.slice(5)}`
        : "",
  };
};
