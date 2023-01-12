import React from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import { getStorage, getDownloadURL, ref as stref } from "firebase/storage";
import Svg, { Circle, Defs, Image, ClipPath } from "react-native-svg";
import { query, get, ref, getDatabase } from "firebase/database";
import Labels from "./Labels";
import ClockHand from "./ClockHand";

function Clock(props) {
  const { locations, face, membs } = props;

  const [members, setMembers] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  const fetchData = async () => {
    setFetched(false);
    setMembers([]);
    for (const i in membs) {
      const userRef = query(
        ref(getDatabase(), `/users/${membs[i].val().member}`)
      );
      const data = await get(userRef);
      setMembers((a) => [
        ...a,
        [data, membs[i].val().colour, membs[i].val().status],
      ]);
    }
    setFetched(true);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const windowWidth = Dimensions.get("window").width;

  const [pic, setPic] = React.useState("");

  const diameter = windowWidth - 40;
  const center = windowWidth / 2;
  const radius = diameter / 2;

  if (face.length === 7) {
    return (
      <Svg height={windowWidth} width={windowWidth}>
        <Circle
          cx={center}
          cy={center}
          r={radius + 15}
          stroke="black"
          strokeWidth={2}
          fill="#6B4EFF"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius - 15}
          stroke="black"
          strokeWidth={2}
          fill={face}
        />
        <Circle
          cx={center}
          cy={center}
          r={radius - 15}
          stroke="black"
          strokeWidth={2}
        />
        <Labels radius={radius} center={center} locations={locations} />
        {fetched ? (
          <ClockHand radius={radius} center={center} members={members} />
        ) : (
          <></>
        )}
      </Svg>
    );
  }
  getDownloadURL(stref(getStorage(), face)).then((url) => {
    setPic(url);
  });
  return (
    <Svg height={windowWidth} width={windowWidth}>
      <Defs>
        <ClipPath id="clip">
          <Circle
            cx={center}
            cy={center}
            r={radius - 15}
            stroke="black"
            strokeWidth={2}
          />
        </ClipPath>
      </Defs>
      <Circle
        cx={center}
        cy={center}
        r={radius + 15}
        stroke="black"
        strokeWidth={2}
        fill="#6B4EFF"
      />

      <Image
        width={windowWidth}
        height={windowWidth}
        preserveAspectRatio="none"
        href={{ uri: pic }}
        clipPath="url(#clip)"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius - 15}
        stroke="black"
        strokeWidth={2}
      />

      <Labels radius={radius} center={center} locations={locations} />

      {fetched ? (
        <ClockHand radius={radius} center={center} members={members} />
      ) : (
        <></>
      )}
    </Svg>
  );
}

Clock.propTypes = {
  locations: PropTypes.array.isRequired,
  face: PropTypes.string.isRequired,
  membs: PropTypes.array.isRequired,
};

export default Clock;
