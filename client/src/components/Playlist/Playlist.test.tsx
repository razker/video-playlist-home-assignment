import Playlist from "./Playlist";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store/store";

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
  {
    videoId: "Mkl0JBHIInQ",
    title: "Hey Bro",
    thumbnail: {
      url: "https://i.ytimg.com/vi/kYl0JBHIInQ/mqdefault.jpg",
      width: 320,
      height: 180,
    },
    id: "sd45a4f3-1790-4c40-addc-a842365da2ee",
  },
];

describe("Playlist Component Test Suit", () => {
  it("should render playlist with 2 items", () => {
    render(
      <Provider store={store}>
        {<Playlist playlist={mockedPlaylist} />}
      </Provider>
    );
    expect(screen.getAllByTestId("list-item").length).toBe(2);
  });

  it("should render with empty playlist", () => {
    render(<Provider store={store}>{<Playlist playlist={[]} />}</Provider>);
    expect(screen.queryByTestId("list-item")).toBe(null);
  });

  it("should show playlist with selected item", () => {
    render(
      <Provider store={store}>
        {<Playlist playlist={mockedPlaylist} />}
      </Provider>
    );

    const listItems = screen.getAllByTestId("list-item");

    expect(
      listItems.some((item) => item.className.includes("Mui-selected"))
    ).toBe(true);
  });

  it("should show placeholder", () => {
    render(
      <Provider store={store}>
        {<Playlist playlist={mockedPlaylist} />}
      </Provider>
    );

    const placeholder = screen.getAllByText(/Search video/i);

    expect(placeholder[0]).toBeDefined();
  });

  it("add button should be disabled on click", () => {
    render(
      <Provider store={store}>
        {<Playlist playlist={mockedPlaylist} />}
      </Provider>
    );

    const addButton = screen.getByTestId("add-button");

    userEvent.click(addButton);
    expect(addButton).toBeDisabled();
  });
});
