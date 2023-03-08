import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import GroupScreen from "../GroupScreen";

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

jest.mock("@react-navigation/native", () => ({
    useIsFocused: jest.fn(),
  }));

const route = {
  params: {
    item: {
      val: jest.fn().mockReturnThis(),
    },
  },
};

test("Check GroupScreen loading correctly", async () => {
  render(<GroupScreen navigation={navigation} route={route} />);
  const domTree = renderer
    .create(<GroupScreen route={route} />)
    .toJSON();
  expect(domTree).toMatchSnapshot();
});
