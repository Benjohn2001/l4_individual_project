import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";
import RowItem from '../RowItem';

test('Check RowItem renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <RowItem 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            icon="activity"
            color="blue"
        />,
      );
      fireEvent.press(screen.getByText('press'));
      expect(onPressMock)
      const domTree = renderer.create(
        <RowItem 
            title="press"
            onPress={()=>{
                onPressMock()
            }}
            icon="activity"
            color="blue"
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})