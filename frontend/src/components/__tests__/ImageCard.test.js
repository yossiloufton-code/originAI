import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageCard from "../ImageCard";
import { AppContext } from "../../state/AppProvider";
import { vi } from "vitest";
function renderWithCtx(ui) {
  return render(
    _jsx(AppContext.Provider, {
      value: {
        state: {
          images: [],
          counts: { 1: { likes: 3, dislikes: 2 } },
          loading: false,
          error: null,
          voting: {},
        },
        dispatch: () => {},
        loadInitial: async () => {},
        vote: async () => {},
        exportCsv: () => {},
      },
      children: ui,
    }),
  );
}
describe("ImageCard", () => {
  it("renders counts", () => {
    renderWithCtx(_jsx(ImageCard, { imageId: "1", url: "x" }));
    expect(screen.getByText(/Likes: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Dislikes: 2/i)).toBeInTheDocument();
  });
  it("click like calls vote", async () => {
    const user = userEvent.setup();
    const vote = vi.fn(async () => {});
    render(
      _jsx(AppContext.Provider, {
        value: {
          state: {
            images: [],
            counts: { 1: { likes: 0, dislikes: 0 } },
            loading: false,
            error: null,
            voting: {},
          },
          dispatch: () => {},
          loadInitial: async () => {},
          vote,
          exportCsv: () => {},
        },
        children: _jsx(ImageCard, { imageId: "1", url: "x" }),
      }),
    );
    await user.click(screen.getByText(/^like$/i));
    expect(vote).toHaveBeenCalledWith("1", "LIKE");
  });
});
