import React, { forwardRef, useImperativeHandle } from "react";
import AsyncSelect from "react-select/async";

import useFetchSuggestions from "./hooks/useFetchSuggestions";
import usePlacesService from "./hooks/usePlacesService";
import GooglePlacesAutocompleteProps, {
  GooglePlacesAutocompleteHandle,
} from "./types";

const GooglePlacesAutocomplete: React.ForwardRefRenderFunction<
  GooglePlacesAutocompleteHandle,
  GooglePlacesAutocompleteProps
> = (args: GooglePlacesAutocompleteProps, ref): React.ReactElement => {
  const { placesService, sessionToken, setSessionToken } = usePlacesService({
    apiKey: args.apiKey ?? "",
    apiOptions: args.apiOptions ?? {},
    onLoadFailed: args.onLoadFailed ?? console.error,
  });

  const fetchSuggestions = useFetchSuggestions({
    autocompletionRequest: args.autocompletionRequest ?? {},
    debounce: args.debounce ?? 300,
    minLengthAutocomplete: args.minLengthAutocomplete ?? 0,
    placesService,
    sessionToken,
    withSessionToken: args.withSessionToken ?? false,
  });

  useImperativeHandle(
    ref,
    () => ({
      getSessionToken: () => {
        return sessionToken;
      },
      refreshSessionToken: () => {
        setSessionToken(new google.maps.places.AutocompleteSessionToken());
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionToken]
  );

  console.log("setup", { apiKey: args.apiKey });

  return (
    <AsyncSelect
      {...(args.selectProps ?? {})}
      loadOptions={fetchSuggestions}
      getOptionValue={({ value }) => {
        return value.place_id;
      }}
    />
  );
};

export default forwardRef(GooglePlacesAutocomplete);
