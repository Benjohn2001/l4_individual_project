import AppButtonRed from '../AppButtonRed';
import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";


test('Check AppButtonRed renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <AppButtonRed 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <AppButtonRed 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})