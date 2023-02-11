import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import KeyboardContainer from '../../components/KeyboardContainer/KeyboardContainer';
import { useState } from 'react';
import Btn from '../../components/Btn/Btn';
import { useFont } from '../../hooks/useFont';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';

const initValues = { email: '', password: '' };
const initFocus = { email: false, password: false };

export default function LoginScreen() {
  const [values, setValues] = useState(initValues);
  const [hasFocus, setHasFocus] = useState(initFocus);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useKeyboardShow();

  const onChangeText = (value, name) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const onInputFocus = name => {
    setIsShowKeyboard(true);
    setHasFocus(p => ({ ...p, [name]: true }));
  };

  const onInputBlur = name => {
    setHasFocus(p => ({ ...p, [name]: false }));
  };

  return (
    <KeyboardContainer>
      <ImageBackground
        style={s.bg}
        source={require('../../assets/images/bg.jpg')}
      >
        <View style={[s.inner, { paddingBottom: isShowKeyboard ? 32 : 144 }]}>
          <Text style={s.title}>Войти</Text>
          <View
            style={[
              s.inputWrapper,
              hasFocus.email && s.inputWrapperFocus,
              { marginBottom: 16 },
            ]}
          >
            <TextInput
              style={s.input}
              placeholder="Адрес электронной почты"
              onChangeText={v => onChangeText(v, 'email')}
              onFocus={() => onInputFocus('email')}
              onBlur={() => onInputBlur('email')}
            />
          </View>
          <View
            style={[
              s.inputWrapper,
              hasFocus.password && s.inputWrapperFocus,
              { marginBottom: 32 },
            ]}
          >
            <View style={{ flex: 4 }}>
              <TextInput
                style={s.input}
                placeholder="Пароль"
                secureTextEntry={!isShowPassword}
                onChangeText={v => onChangeText(v, 'password')}
                onFocus={() => onInputFocus('password')}
                onBlur={() => onInputBlur('password')}
              />
            </View>
            <View>
              <TouchableOpacity
                style={s.btnInput}
                onPress={() => setIsShowPassword(p => !p)}
              >
                <Text style={s.btnInputText}>Показать</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Btn
              onPress={() => {
                console.log(values);
              }}
              text="Войти"
            />
          </View>

          <Text style={s.text}>Нет аккаунта? Зарегистрироваться</Text>
        </View>
      </ImageBackground>
    </KeyboardContainer>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  inner: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 144,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    padding: 16,
  },
  title: {
    paddingBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },
  inputWrapperFocus: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
  },
  btnInput: {
    padding: 10,
    paddingRight: 16,
  },
  btnInputText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});
