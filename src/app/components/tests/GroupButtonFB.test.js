import { render, screen, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";
import GroupButtonFB from '../GroupButtonFB';

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn().mockReturnThis(),
  }));

jest.mock('firebase/storage', () => ({
      getStorage: jest.fn().mockReturnThis(),
    }));
  

jest.mock('firebase/app', () => ({
      auth: jest.fn().mockReturnThis(),
      initializeApp: jest.fn().mockReturnThis(),
    }));

jest.mock('firebase/auth', () => ({
      getAuth: jest.fn().mockReturnThis(),
    }));

test('Check GroupButtonFB renders correctly and onpress works',()=>{
    const onPressMock = jest.fn();
    render(
        <GroupButtonFB 
            groupName="press"
            onPress={()=>{
                onPressMock()
            }}
            membRef="aaaaa"
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
            membRef="aaaaa"
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})