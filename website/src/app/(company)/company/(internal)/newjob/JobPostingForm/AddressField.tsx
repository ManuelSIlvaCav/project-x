import GooglePlacesAutocomplete from "@/components/GoogleAddressAutocomplete";

export default function AddressField() {
  return (
    <GooglePlacesAutocomplete apiKey={`${process.env.GOOGLE_MAPS_API_KEY}`} />
  );
}
