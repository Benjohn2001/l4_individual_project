import { G, Line, Defs, ClipPath, Circle, Image, Svg } from "react-native-svg";
import React from "react";
import PropTypes from "prop-types";
import { getStorage, getDownloadURL, ref as stref } from "firebase/storage";
import { Image as img } from "react-native";

function Hand(props) {
  const { index, point, center, member } = props;

  const [pic, setPic] = React.useState("");

  const fetchData = () => {
    if (member[0].val().profilePic !== undefined) {
      getDownloadURL(stref(getStorage(), member[0].val().profilePic)).then(
        (url) => {
          setPic(url);
        }
      );
    } else {
      setPic(
        img.resolveAssetSource(require("../assets/defaultProfilePic.png")).uri
      );
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <G key={index}>
      <Line
        stroke={member[1]}
        strokeWidth={5}
        x1={center}
        x2={point.x}
        y1={center}
        strokeLinecap="round"
        y2={point.y}
      />
      <Circle
        cx={point.x}
        cy={point.y}
        r={22}
        stroke={member[1]}
        fill={member[1]}
      />

      <Svg width="50" height="50">
        <Defs>
          <ClipPath id="circleView">
            <Circle cx={point.x} cy={point.y} r="20" />
          </ClipPath>
        </Defs>
        <Image
          width="50"
          height="50"
          x={point.x - 25}
          y={point.y - 25}
          href={{ uri: pic }}
          clipPath="url(#circleView)"
        />
      </Svg>
    </G>
  );
}

Hand.propTypes = {
  index: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
  center: PropTypes.number.isRequired,
  member: PropTypes.array.isRequired,
};

export default Hand;
