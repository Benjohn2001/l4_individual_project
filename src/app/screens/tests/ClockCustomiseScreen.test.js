import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import ClockCustomiseScreen from "../ClockCustomiseScreen";


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
      locations: jest.fn(),
      membersRef: jest.fn()
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

test("Check ClockCustomiseScreen correctly", () => {
  render(<ClockCustomiseScreen navigation={navigation} route={route} />);
  fireEvent.press(screen.getByTestId("pressableIcon"))
  expect(navigation.goBack).toHaveBeenCalledTimes(1)
  const domTree = renderer
    .create(<ClockCustomiseScreen route={route} />)
    .toJSON();
  expect(domTree).toMatchSnapshot();
});

test("Check ClockCustomiseScreen clock pic correctly", () => {
    render(<ClockCustomiseScreen navigation={navigation} route={route} />);
    fireEvent.press(screen.getByText("Clock Face"))
    fireEvent.press(screen.getByText("Image"))
    fireEvent.press(screen.getByText("Upload new picture"))
    fireEvent.press(screen.getByText("Save picture"))
  });

  test("Check ClockCustomiseScreen clock colour correctly", () => {
    render(<ClockCustomiseScreen navigation={navigation} route={route} />);
    fireEvent.press(screen.getByText("Clock Face"))
    fireEvent.press(screen.getByText("Colour"))
    fireEvent.press(screen.getByText("Change Colour"))
  });

  test("Check ClockCustomiseScreen locations correctly", () => {
    render(<ClockCustomiseScreen navigation={navigation} route={route} />);
    fireEvent.press(screen.getByText("Locations"))
    fireEvent.press(screen.getByText("Select a location"))
    // fireEvent.changeText(screen.getByPlaceholderText("New location"),"abc")
    // fireEvent.press(screen.getByText("Change Location"))
  });

  test("Check ClockCustomiseScreen hand colour correctly", () => {
    render(<ClockCustomiseScreen navigation={navigation} route={route} />);
    fireEvent.press(screen.getByText("Hand Colour"))
    fireEvent.press(screen.getAllByText("Change Hand Colour").at(1))
  });
  
