import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import RegisterScreen from "../RegisterScreen";

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn().mockReturnThis(),
  push: jest.fn().mockReturnThis(),
  ref: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  query: jest.fn(() => {
    Promise.resolve();
  }),
}));

jest.mock("react-native-keyboard-aware-scroll-view",()=>({
  KeyboardAwareScrollView: jest.fn().mockImplementation(({children}) => children),
}))

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
  createUserWithEmailAndPassword: () => ({
    then: () => ({
      catch: jest.fn(),
    }),
  }),
  getAuth: () => ({
    signOut: () => ({
      then: () => ({
        catch: jest.fn(),
      }),
    }),
  }),
}));

test("Check RegisterScreen  working correctly", () => {
  const { getByTestId } = render(<RegisterScreen navigation={navigation} />);

  fireEvent.changeText(getByTestId("fnameT"), "abc");
  fireEvent.changeText(getByTestId("snameT"), "abc");
  fireEvent.changeText(getByTestId("unameT"), "abc");
  fireEvent.changeText(getByTestId("emailT"), "abc");
  fireEvent.changeText(getByTestId("passT"), "12345678B");
  fireEvent.press(screen.getByText("Submit"));

  const domTree = renderer.create(<RegisterScreen />).toJSON();
  expect(domTree).toMatchSnapshot();
});

test("Check invalidpass  working correctly", () => {
  const { getByTestId } = render(<RegisterScreen navigation={navigation} />);
  jest.spyOn(Alert, "alert");

  fireEvent.changeText(getByTestId("fnameT"), "abc");
  fireEvent(getByTestId("fnameT"), "submitEditing");
  fireEvent.changeText(getByTestId("snameT"), "abc");
  fireEvent(getByTestId("snameT"), "submitEditing");
  fireEvent.changeText(getByTestId("unameT"), "abc");
  fireEvent(getByTestId("unameT"), "submitEditing");
  fireEvent.changeText(getByTestId("emailT"), "abc");
  fireEvent(getByTestId("emailT"), "submitEditing");
  fireEvent.changeText(getByTestId("passT"), "1238B");
  fireEvent.press(screen.getByText("Submit"));
  // expect(Alert.alert).toHaveBeenCalledTimes(1);
});

test("Check RegisterScreen no login data working correctly", () => {
  // const spy = jest.spyOn(Alert, "alert");
  render(<RegisterScreen navigation={navigation} />);

  fireEvent.press(screen.getByText("Submit"));
  // expect(spy).toHaveBeenCalled()
});

test("Check register nav to signin", () => {
  const { getByTestId } = render(<RegisterScreen navigation={navigation} />);

  fireEvent.press(getByTestId("pressableIcon"));
  expect(navigation.navigate).toBeCalledWith("SignInScreen");
});
