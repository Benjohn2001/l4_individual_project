import FriendsRowSearch from '../FriendsRowSearch';
import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";

test('Check FriendsRowSearch renders correctly and onpress works',()=>{
    const data1 = {
        "bio": "Add a bio!",
        "email": "ts@gmail.com",
        "firstName": "Tara",
        "lastName": "Smith",
        "userName": "tdawg123"
      }
    const snap1 = { val: () => data1 };
    const onPressMock = jest.fn();
    render(
        <FriendsRowSearch 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            data={snap1}
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <FriendsRowSearch 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            data={snap1}
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})