import { Options } from "react-select";
import { useDebouncedCallback } from "use-debounce";

import autoCompletitionRequestBuilder from "../helpers/autocompletitionRequestHelper";
import { AutocompletionRequest } from "../types";

type CBType = (options: Options<any>) => void;

type UseFetchSuggestionsArg = {
  autocompletionRequest: AutocompletionRequest;
  debounce: number;
  minLengthAutocomplete: number;
  placesService?: google.maps.places.AutocompleteService;
  sessionToken?: google.maps.places.AutocompleteSessionToken;
  withSessionToken: boolean;
};

const useFetchSuggestions = (
  arg: UseFetchSuggestionsArg
): ((value: string, cb: CBType) => void) => {
  const {
    autocompletionRequest,
    debounce,
    minLengthAutocomplete,
    placesService,
    sessionToken,
    withSessionToken,
  } = arg;

  const val: any = useDebouncedCallback((value: string, cb: CBType): void => {
    if (!placesService) return cb([]);
    if (value.length < minLengthAutocomplete) return cb([]);

    const autocompletionReq: AutocompletionRequest = {
      ...autocompletionRequest,
    };

    placesService.getPlacePredictions(
      autoCompletitionRequestBuilder(
        autocompletionReq,
        value,
        withSessionToken && sessionToken
      ),
      (suggestions) => {
        cb(
          (suggestions || []).map((suggestion) => ({
            label: suggestion.description,
            value: suggestion,
          }))
        );
      }
    );
  }, debounce);

  return val;
};

export default useFetchSuggestions;
