import type { AppAction, AppState } from "./appTypes";

export const initialState: AppState = {
  images: [],
  counts: {},
  loading: false,
  error: null,
  voting: {},
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, images: action.payload.images };

    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload.error };

    case "SET_COUNTS":
      return { ...state, counts: action.payload.counts };

    case "VOTE_START":
      return {
        ...state,
        voting: { ...state.voting, [action.payload.imageId]: true },
      };

    case "VOTE_OPTIMISTIC": {
      const { imageId, voteType } = action.payload;
      const prev = state.counts[imageId] ?? { likes: 0, dislikes: 0 };
      const next =
        voteType === "LIKE"
          ? { ...prev, likes: prev.likes + 1 }
          : { ...prev, dislikes: prev.dislikes + 1 };

      return {
        ...state,
        counts: { ...state.counts, [imageId]: next },
      };
    }

    case "VOTE_END":
      return {
        ...state,
        voting: { ...state.voting, [action.payload.imageId]: false },
      };

    case "VOTE_ERROR":
      return {
        ...state,
        voting: { ...state.voting, [action.payload.imageId]: false },
        error: action.payload.error,
      };

    default:
      return state;
  }
}
