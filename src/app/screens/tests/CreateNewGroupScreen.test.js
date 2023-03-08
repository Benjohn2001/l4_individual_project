import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import CreateNewGroupScreen from "../CreateNewGroupScreen";

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn().mockReturnThis(),
  push: jest.fn().mockReturnThis(),
  ref: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn().mockReturnThis(),
}));

const navigation = {
  navigate: jest.fn(),
  push: jest.fn(),
};

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

test("Check CreateNewGroupScreen working correctly", () => {
  const { getByTestId } = render(
    <CreateNewGroupScreen navigation={navigation} />
  );

  fireEvent.press(screen.getByTestId("pressableIcon"));
  expect(navigation.navigate).toBeCalledWith("HomeScreen");

  fireEvent.changeText(getByTestId("groupname"), "group");
  fireEvent.press(screen.getByText("Create"));
  // expect(navigation.push).toBeCalledWith('HomeScreen')

  const domTree = renderer.create(<CreateNewGroupScreen />).toJSON();
  expect(domTree).toMatchSnapshot();
});

jest.spyOn(Alert, "alert");
test("Check CreateNewGroupScreen no groupname working correctly", () => {
  render(<CreateNewGroupScreen navigation={navigation} />);

  fireEvent.press(screen.getByTestId("pressableIcon"));
  expect(navigation.navigate).toBeCalledWith("HomeScreen");
  fireEvent.press(screen.getByText("Create"));
  expect(Alert.alert).toHaveBeenCalledTimes(1);
});
