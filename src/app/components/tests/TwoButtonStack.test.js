import { render, screen, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import TwoButtonStack from "../TwoButtonStack";

test("Check TwoButtonStack renders correctly and onpress works", () => {
  const onPressMock1 = jest.fn();
  const onPressMock2 = jest.fn();
  render(
    <TwoButtonStack
      title1="press1"
      onPress1={() => {
        onPressMock1();
      }}
      title2="press2"
      onPress2={() => {
        onPressMock2();
      }}
    />
  );
  fireEvent.press(screen.getByText("press1"));
  expect(onPressMock1);
  fireEvent.press(screen.getByText("press2"));
  expect(onPressMock2);
  const domTree = renderer
    .create(
      <TwoButtonStack
        title1="press1"
        onPress1={() => {
          onPressMock1();
        }}
        title2="press2"
        onPress2={() => {
          onPressMock2();
        }}
      />
    )
    .toJSON();
  expect(domTree).toMatchSnapshot();
});
