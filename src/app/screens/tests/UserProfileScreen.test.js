import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import UserProfileScreen from "../UserProfileScreen";


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

const route = {
    params: {
      user: {
        val: jest.fn().mockReturnThis(),
      },
    },
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

test("Check UserProfileScreen working correctly", () => {
  render(<UserProfileScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByTestId("pressableIcon"))
  expect(navigation.goBack).toHaveBeenCalledTimes(1)
  const domTree = renderer
    .create(<UserProfileScreen route={route} />)
    .toJSON();
  expect(domTree).toMatchSnapshot();
});
