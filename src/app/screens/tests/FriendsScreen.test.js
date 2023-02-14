import { render, screen, fireEvent } from "@testing-library/react-native";
import FriendsScreen from "../FriendsScreen";


jest.mock("firebase/database", () => ({
  getDatabase: jest.fn().mockReturnThis(),
  push: jest.fn().mockReturnThis(),
  ref: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  query: jest.fn().mockReturnThis(),
  onValue: jest.fn().mockReturnThis(),
  orderByChild: jest.fn().mockReturnThis(),
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

jest.mock("@react-navigation/native", () => ({
    useIsFocused: jest.fn(),
  }));

test("Check FriendsScreen search correctly", () => {
  render(<FriendsScreen navigation={navigation} />);
  fireEvent.press(screen.getAllByTestId("pressableIcon").at((1)))
  fireEvent.press(screen.getAllByTestId("pressableIcon").at((0)))
  fireEvent.press(screen.getAllByTestId("pressableIcon").at((1)))
  fireEvent.changeText(screen.getByPlaceholderText("Search for a username"),"abc")
  fireEvent.changeText(screen.getByPlaceholderText("Search for a username"),"")
});
