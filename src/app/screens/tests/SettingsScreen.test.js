import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import SettingsScreen from "../SettingsScreen";

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn().mockReturnThis(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn().mockReturnThis(),
}));

jest.mock("firebase/app", () => ({
  auth: jest.fn().mockReturnThis(),
  initializeApp: jest.fn().mockReturnThis(),
}));

jest.mock("firebase/auth", () => ({
  auth: jest.fn().mockReturnThis(),
  getAuth: () => ({
    signOut: () => ({
      then: () => ({
        catch: jest.fn(),
      }),
    }),
  }),
}));

test("Check SettingsScreen working correctly", () => {
  render(<SettingsScreen />);

  global.alert = jest.fn();
  fireEvent.press(screen.getByText("Account"));
  expect(global.alert).toHaveBeenCalledTimes(1);
  fireEvent.press(screen.getByText("Notifications"));
  expect(global.alert).toHaveBeenCalledTimes(2);
  fireEvent.press(screen.getByText("Send Feedback"));
  expect(global.alert).toHaveBeenCalledTimes(3);
  fireEvent.press(screen.getByText("Report a bug"));
  expect(global.alert).toHaveBeenCalledTimes(4);
  fireEvent.press(screen.getByText("Log Out"));

  const domTree = renderer.create(<SettingsScreen />).toJSON();
  expect(domTree).toMatchSnapshot();
});
