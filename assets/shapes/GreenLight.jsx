import * as React from "react";
import Svg, { Path } from "react-native-svg";
const GreenLight = (props) => (
  <Svg
    width={"100%"}
    height={70}
    viewBox="0 0 140 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 45L70 0L140 45V70H0V45Z"
      fill="#03CA03"
    />
  </Svg>
);
export default GreenLight;
