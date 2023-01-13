/* eslint-disable no-else-return */
import { G } from "react-native-svg";
import React from "react";
import PropTypes from "prop-types";
import polar2cart from "./polar2cart";
import Hand from "./Hand";

function ClockHand(props) {
  const { radius, center, members } = props;

  function randInterval(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  function getAngle(i) {
    switch (i) {
      case 0:
        return randInterval(10, 50);
      case 1:
        return randInterval(70, 110);
      case 2:
        return randInterval(130, 170);
      case 3:
        return randInterval(190, 230);
      case 4:
        return randInterval(250, 290);
      case 5:
        return randInterval(310, 350);
      default:
        return 0;
    }
  }

  const a = [];

  const clockHands = members.map((member, index) => {
    if (member[2] === undefined) {
      <></>;
    } else {
      const angle = getAngle(member[2]);
      const radHand = radius - 30;
      const len = a.includes(member[2])
        ? radHand -
          (radius / (members.length + 1)) *
            a.filter((stat) => stat === member[2]).length
        : radHand - 10;
      const point = polar2cart(center, center, len, angle);
      // const point = polar2cart(center, center, radius-40, angle);
      a.push(member[2]);
      return (
        <Hand index={index} center={center} point={point} member={member} />
      );
    }

    return true;
  });

  return <G>{clockHands}</G>;
}

ClockHand.propTypes = {
  radius: PropTypes.number.isRequired,
  center: PropTypes.number.isRequired,
  members: PropTypes.array.isRequired,
};

export default ClockHand;
