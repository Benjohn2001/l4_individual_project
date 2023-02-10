import { render, screen, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import TwoButtonsSide from "../TwoButtonsSide";

test("Check TwoButtonsSide renders correctly and onpress works", () => {
  const onPressMock1 = jest.fn();
  const onPressMock2 = jest.fn();
  render(
    <TwoButtonsSide
      title1="press1"
      onPress1={() => {
        onPressMock1();
      }}
      icon1="users"
      color1="red"
      fontColor1="black"
      title2="press2"
      onPress2={() => {
        onPressMock2();
      }}
      icon2="activity"
      color2="white"
      fontColor2="black"
    />
  );
  fireEvent.press(screen.getByText("press1"));
  expect(onPressMock1);
  fireEvent.press(screen.getByText("press2"));
  expect(onPressMock2);
  const domTree = renderer
    .create(
      <TwoButtonsSide
        title1="press1"
        onPress1={() => {
          onPressMock1();
        }}
        icon1="users"
        color1="red"
        fontColor1="black"
        title2="press2"
        onPress2={() => {
          onPressMock2();
        }}
        icon2="activity"
        color2="white"
        fontColor2="black"
      />
    )
    .toJSON();
  expect(domTree).toMatchSnapshot();
});
