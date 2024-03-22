import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function WifiIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19a1 1 0 100 2v-2zm.01 2a1 1 0 100-2v2zm2.68-3.96a1 1 0 001.347-1.48l-1.346 1.48zm3.364-3.7a1 1 0 001.346-1.48l-1.346 1.48zm-10.09 2.22a1 1 0 001.346 1.48l-1.346-1.48zM4.6 11.86a1 1 0 101.345 1.48l-1.345-1.48zM12 21h.01v-2H12v2zm0-5c1.036 0 1.979.393 2.69 1.04l1.345-1.48A5.982 5.982 0 0012 14v2zm0-5c2.331 0 4.454.886 6.053 2.34l1.346-1.48A10.964 10.964 0 0012 9v2zM9.31 17.04A3.982 3.982 0 0112 16v-2a5.982 5.982 0 00-4.036 1.56l1.346 1.48zm-3.364-3.7A8.964 8.964 0 0112 11V9a10.964 10.964 0 00-7.4 2.86l1.346 1.48z"
        fill="#808080"
      />
    </Svg>
  );
}

export default WifiIcon;