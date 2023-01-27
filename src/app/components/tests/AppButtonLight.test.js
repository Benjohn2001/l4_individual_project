import AppButtonLight from "../AppButtonLight"
import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";

test('Check AppButtonLight renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <AppButtonLight 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <AppButtonLight 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})