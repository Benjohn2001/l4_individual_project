import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeScreen from "../HomeScreen";
import PressableIcon from "../../components/PressableIcon";


configure({ adapter: new Adapter() });

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
    addListener: jest.fn().mockImplementation((event, callback) => {
      if (event === "beforeRemove") {
        callback({ preventDefault: jest.fn() });
      }
    }),
};

jest.mock("firebase/app", () => ({
  auth: jest.fn().mockReturnThis(),
  initializeApp: jest.fn().mockReturnThis(),
}));

  jest.mock("@react-navigation/native", () => ({
    useIsFocused: jest.fn(),
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

test("Check HomeScreen search page correctly", () => {
      
    const wrapper = shallow(<HomeScreen navigation={navigation} />);
  const icon = wrapper.find(PressableIcon);
    icon.simulate('press');
  expect(wrapper).toMatchSnapshot();
});

test("Check HomeScreen loading correctly", () => {
    render(
      <HomeScreen navigation={navigation} />
    );
    const domTree = renderer.create(<HomeScreen />).toJSON();
    expect(domTree).toMatchSnapshot();

  });

  test("Check HomeScreen search correctly", () => {
    render(
      <HomeScreen navigation={navigation} />
    )
    fireEvent.press(screen.getByTestId("pressableIcon"));
    const searchInput=screen.getByPlaceholderText("Search for a group")

    fireEvent.changeText(searchInput,"group")
    fireEvent.changeText(searchInput,"")

  });

  test("Check HomeScreen add group correctly", () => {
    render(
      <HomeScreen navigation={navigation} />
    );
    fireEvent.press(screen.getByText("Add a Group"))
    fireEvent.press(screen.getByText("Create New Group"))
    expect(navigation.push).toBeCalledWith("CreateNewGroupScreen");

  });


