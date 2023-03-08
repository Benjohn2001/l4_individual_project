import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import GroupSettingsScreen from "../GroupSettingsScreen";

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn().mockReturnThis(),
  push: jest.fn().mockReturnThis(),
  ref: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  query: jest.fn().mockReturnThis(),
  onValue: jest.fn().mockReturnThis(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn().mockReturnThis(),
}));

const navigation = {
  navigate: jest.fn(),
  push: jest.fn(),
  goBack: jest.fn(),
};

jest.mock("firebase/app", () => ({
  auth: jest.fn().mockReturnThis(),
  initializeApp: jest.fn().mockReturnThis(),
}));

jest.mock("firebase/auth", () => ({
  auth: jest.fn().mockReturnThis(),
  getAuth: () => ({
    currentUser: jest.fn().mockReturnThis(),
    signOut: () => ({
      then: () => ({
        catch: jest.fn(),
      }),
    }),
  }),
}));

const route = {
  params: {
    item: {
      val: jest.fn().mockReturnThis(),
    },
  },
};

test("Check GroupSettingsScreen loading correctly", async () => {
  render(<GroupSettingsScreen navigation={navigation} route={route} />);

  const domTree = renderer
    .create(<GroupSettingsScreen route={route} />)
    .toJSON();
  expect(domTree).toMatchSnapshot();
});

test("Check GroupSettingsScreen navigating correctly", async () => {
  render(<GroupSettingsScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByTestId("pressableIcon"));
  expect(navigation.goBack).toHaveBeenCalledTimes(1);
});

test("Check from friends", async () => {
  render(<GroupSettingsScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByText("From Friends"));
});
test("Check invite friends", async () => {
  render(<GroupSettingsScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByText("Invite Friends"));
});

test("Check leave group cancel", async () => {
  render(<GroupSettingsScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByText("Leave Group"));
  fireEvent.press(screen.getByText("Cancel"));
});

test("Check leave group leave", async () => {
  render(<GroupSettingsScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByText("Leave Group"));
  fireEvent.press(screen.getByText("Leave"));
});

test("Check change group name", async () => {
  render(<GroupSettingsScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByText("Change Group Name"));
  fireEvent.changeText(screen.getByPlaceholderText("group name"), "abc");
  fireEvent.press(screen.getByText("Change Name"));
});
