import React, { createContext, useCallback, useMemo, useReducer } from "react";
import { appReducer, initialState } from "./appReducer";
import type { AppAction, AppState, Counts } from "./appTypes";
import {
  downloadVotesCsv,
  fetchCounts,
  fetchImages,
  postVote,
  type VoteType,
} from "../api/api";

type AppContextValue = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  loadInitial: () => Promise<void>;
  vote: (imageId: string, type: VoteType) => Promise<void>;
  exportCsv: () => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

function toCountsMap(
  items: Array<{ imageId: string; likes: number; dislikes: number }>,
): Counts {
  const map: Counts = {};
  for (const it of items) {
    map[it.imageId] = { likes: it.likes, dislikes: it.dislikes };
  }
  return map;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadInitial = useCallback(async () => {
    dispatch({ type: "LOAD_START" });
    try {
      const images = await fetchImages();
      dispatch({ type: "LOAD_SUCCESS", payload: { images } });

      const ids = images.map((i) => i.id);
      const countsItems = await fetchCounts(ids);
      dispatch({
        type: "SET_COUNTS",
        payload: { counts: toCountsMap(countsItems) },
      });
    } catch (e: any) {
      dispatch({
        type: "LOAD_ERROR",
        payload: { error: e?.message ?? "Failed to load" },
      });
    }
  }, []);

  const vote = useCallback(async (imageId: string, type: VoteType) => {
    dispatch({ type: "VOTE_START", payload: { imageId } });

    // optimistic UI
    dispatch({ type: "VOTE_OPTIMISTIC", payload: { imageId, voteType: type } });

    try {
      await postVote(imageId, type);
      // optionally re-fetch counts for stronger consistency (not required)
    } catch (e: any) {
      // We keep it simple: show error (no rollback).
      dispatch({
        type: "VOTE_ERROR",
        payload: { imageId, error: e?.message ?? "Vote failed" },
      });
      return;
    } finally {
      dispatch({ type: "VOTE_END", payload: { imageId } });
    }
  }, []);

  const exportCsv = useCallback(() => {
    downloadVotesCsv();
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({ state, dispatch, loadInitial, vote, exportCsv }),
    [state, loadInitial, vote, exportCsv],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
