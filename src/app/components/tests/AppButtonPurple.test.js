import AppButtonPurple from '../AppButtonPurple';
import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";

test('Check AppButtonPurple renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <AppButtonPurple 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <AppButtonPurple 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})