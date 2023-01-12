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
        return randInterval(5, 55);
      case 1:
        return randInterval(65, 115);
      case 2:
        return randInterval(125, 175);
      case 3:
        return randInterval(185, 235);
      case 4:
        return randInterval(245, 295);
      case 5:
        return randInterval(305, 355);
      default:
        return 0;
    }
  }

  const clockHands = members.map((member, index) => {
    if (member[2] === undefined) {
      <></>;
    } else {
      const angle = getAngle(member[2]);
      const point = polar2cart(center, center, radius - 40, angle);
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
