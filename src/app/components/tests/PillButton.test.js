import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";
import PillButton from '../PillButton';


test('Check PillButton renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <PillButton 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            icon="users"
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <PillButton 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            icon="users"
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})