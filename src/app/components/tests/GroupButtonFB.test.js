import GroupButtonFB from '../GroupButtonFB';
import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";

test('Check GroupButtonFB renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <GroupButtonFB 
            groupName="press"
            onPress={()=>{
                onPressMock()
            }}
            membRef={"aaaaa"}
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <GroupButtonFB 
            groupName="press"
            onPress={()=>{
                onPressMock()
            }}
            membRef={"aaaaa"}
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})