import React from 'react';
import {
  TouchableOpacity,
  type ButtonProps,
  Text,
  StyleSheet,
} from 'react-native';
type Props = ButtonProps;
export default function Button({ onPress, title }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[style.refreshBtn]}>
      <Text style={[style.verticalMiddle, style.font]}>{title}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  connectionBtn: {
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'lightblue',
    paddingHorizontal: '8%',
    paddingVertical: '2%',
    marginBottom: '1%',
    display: 'flex',
    alignItems: 'center',
  },
  verticalMiddle: {
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  font: {
    color: 'black',
    fontSize: 24,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
    width: '50%',
  },
  refreshBtn: {
    backgroundColor: 'lightblue',
    paddingVertical: '2%',
    marginBottom: '1%',
    flex: 1,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  listContainer: { width: '100%', display: 'flex', flexDirection: 'column' },
});
