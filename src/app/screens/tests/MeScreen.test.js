import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import { configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16";
import MeScreen from "../MeScreen";

configure({ adapter: new Adapter() });

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

test("Check MeScreen loading correctly", () => {
  render(<MeScreen navigation={navigation} />);

  const domTree = renderer.create(<MeScreen />).toJSON();
  expect(domTree).toMatchSnapshot();
});

// cant fin d row items as pic not changed state
// test("Check MeScreen change uname correctly", () => {
//     const meUname = shallow(<MeScreen navigation={navigation}/>);

//     meUname.find(RowItem).at(0).simulate('press')
//     // fireEvent.press(getByText("Change my username"))
//     // fireEvent.changeText(getByPlaceholderText("username"),"123")
//     // fireEvent.press(getByText("Change Username"))
// });
