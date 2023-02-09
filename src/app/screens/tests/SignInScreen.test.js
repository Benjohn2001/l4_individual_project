import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Alert } from "react-native";
import SignInScreen from "../SignInScreen";

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn().mockReturnThis(),
    push: jest.fn().mockReturnThis(),
    ref: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
  }));

jest.mock('firebase/storage', () => ({
      getStorage: jest.fn().mockReturnThis(),
    }));

const navigation={
    navigate: jest.fn(),
    push: jest.fn()
}
  
jest.mock('firebase/app', () => ({
      auth:  jest.fn().mockReturnThis(),
      initializeApp: jest.fn().mockReturnThis(),
    }));

jest.mock('firebase/auth', () => ({
    auth:  jest.fn().mockReturnThis(),
    signInWithEmailAndPassword:  () => ({
        then: () => ({
            catch: jest.fn()
        })
    }),
    sendPasswordResetEmail:  () => ({
        then: jest.fn()
    }),
      getAuth:  () => ({
          signOut:  () => ({
            then: () => ({
                catch: jest.fn()
            })
            
          }),
        }),
    }));



    

test('Check SignInScreen login working correctly',()=>{

    const {getByTestId } = render(
        <SignInScreen navigation={navigation}/>
    );

    fireEvent.changeText(getByTestId("unameT"), "abc")
    fireEvent.changeText(getByTestId("passT"), "12345678B")
    fireEvent.press(screen.getByText("Sign In"));

    const domTree = renderer.create(
        <SignInScreen/>
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})


test('Check SignInScreen no login data working correctly',()=>{
    jest.spyOn(Alert, 'alert');
    render(
        <SignInScreen navigation={navigation}/>
    );

    fireEvent.press(screen.getByText("Sign In"));
    expect(Alert.alert).toHaveBeenCalledTimes(1)

})

test('Check SignInScreen forgotPass working correctly',()=>{
    jest.spyOn(Alert, 'alert');
    const {getByTestId } = render(
        <SignInScreen navigation={navigation}/>
    );

    fireEvent.press(screen.getByText("Forgotten Password"));
    fireEvent.changeText(getByTestId("forgotP"), "abc")
    fireEvent.press(screen.getByText("Send Email"));
    expect(Alert.alert).toHaveBeenCalledTimes(1)
})

test('Check SignInScreen nav to register',()=>{
    render(
        <SignInScreen navigation={navigation}/>
    );

    fireEvent.press(screen.getByText("Register"));
    expect(navigation.navigate).toBeCalledWith('RegisterScreen')
   
})





