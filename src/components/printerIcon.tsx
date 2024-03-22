import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PrinterIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 18h-.8c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874C3 16.48 3 15.92 3 14.8v-4.6c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C4.52 7 5.08 7 6.2 7H7m10 11h.8c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C21 16.48 21 15.92 21 14.8v-4.6c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C19.48 7 18.92 7 17.8 7H17M7 11h.01M17 7V4.6c0-.56 0-.84-.109-1.054a1 1 0 00-.437-.437C16.24 3 15.96 3 15.4 3H8.6c-.56 0-.84 0-1.054.109a1 1 0 00-.437.437C7 3.76 7 4.04 7 4.6V7m10 0H7m1.6 14h6.8c.56 0 .84 0 1.054-.109a1 1 0 00.437-.437C17 20.24 17 19.96 17 19.4v-2.8c0-.56 0-.84-.109-1.054a1 1 0 00-.437-.437C16.24 15 15.96 15 15.4 15H8.6c-.56 0-.84 0-1.054.109a1 1 0 00-.437.437C7 15.76 7 16.04 7 16.6v2.8c0 .56 0 .84.109 1.054a1 1 0 00.437.437C7.76 21 8.04 21 8.6 21z"
        stroke="#808080"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default PrinterIcon;