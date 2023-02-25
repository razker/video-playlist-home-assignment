import * as Redux from "react-redux";
import Playlist from "./Playlist";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const mockedPlaylist = [
  {
    videoId: "kYl0JBHIInQ",
    title: "These Towers Just Got Some Nice Buffs",
    thumbnail: {
      url: "https://i.ytimg.com/vi/kYl0JBHIInQ/mqdefault.jpg",
      width: 320,
      height: 180,
    },
    id: "cf74a4f3-1790-4c40-addc-a842365da7cc",
  },
];

describe("Playlist Component", () => {
  it("should render", () => {
    render(
      <Provider store={store}>
        {<Playlist playlist={mockedPlaylist} />}
      </Provider>
    );
    expect(screen.getAllByTestId("playlist-outer-container")).toBeDefined();
  });
});
