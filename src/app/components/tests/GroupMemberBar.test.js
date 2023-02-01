import GroupMemberBar from '../GroupMemberBar';
import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";

test('Check GroupMemberBar renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <GroupMemberBar 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            color="red"
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <GroupMemberBar 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            color="red"
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})