import * as React from "react";
import Svg, { Path } from "react-native-svg";
const RedLight = (props) => (
  <Svg
    width={140}
    height={70}
    viewBox="0 0 140 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M70 45L0 0V45V70H140V45V0L70 45Z"
      fill="#E10707"
    />
  </Svg>
);
export default RedLight;