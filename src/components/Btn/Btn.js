import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Btn({ onPress, text }) {
  return (
    <TouchableOpacity style={s.btn} onPress={onPress}>
      <Text style={s.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    alignItems: 'center',
    color: '#ffffff',
  },
});

