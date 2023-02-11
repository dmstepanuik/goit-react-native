import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import Btn from '../../components/Btn/Btn';
import Avatar from '../../components/Avatar/Avatar';
import { useKeyboardShow } from '../../hooks/useKeyboardShow';
import KeyboardContainer from '../../components/KeyboardContainer/KeyboardContainer';

const initValues = { email: '', password: '', nickname: '' };
const initFocus = { email: false, password: false, nickname: false };

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useKeyboardShow();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [values, setValues] = useState(initValues);
  const [hasFocus, setHasFocus] = useState(initFocus);
  const [isEmptyAvatar, setIsEmptyAvatar] = useState(true);

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
        <View
          style={[
            s.inner,
            { paddingBottom: isShowKeyboard ? 32 : 78, paddingTop: 92 },
          ]}
        >
          <View style={s.avatarWrapper}>
            <View style={s.avatar}>
              <Avatar isEmpty={isEmptyAvatar} onClickBtn={setIsEmptyAvatar} />
            </View>
          </View>

          <Text style={s.title}>Registration</Text>
          <View
            style={[
              s.inputWrapper,
              hasFocus.nickname && s.inputWrapperFocus,
              { marginBottom: 16 },
            ]}
          >
            <TextInput
              style={s.input}
              placeholder="Login"
              onChangeText={v => onChangeText(v, 'nickname')}
              onFocus={() => onInputFocus('nickname')}
              onBlur={() => onInputBlur('nickname')}
            />
          </View>
          <View
            style={[
              s.inputWrapper,
              hasFocus.email && s.inputWrapperFocus,
              { marginBottom: 16 },
            ]}
          >
            <TextInput
              style={s.input}
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Email Address"
              onChangeText={v => onChangeText(v, 'email')}
              onFocus={() => onInputFocus('email')}
              onBlur={() => onInputBlur('email')}
            />
          </View>
          <View
            style={[
              s.inputWrapper,
              hasFocus.password && s.inputWrapperFocus,
              { marginBottom: isShowKeyboard ? 0 : 43 },
            ]}
          >
            <View style={{ flex: 4 }}>
              <TextInput
                style={s.input}
                secureTextEntry={!isShowPassword}
                placeholder="Password"
                onChangeText={v => onChangeText(v, 'password')}
                onFocus={() => onInputFocus('password')}
                onBlur={() => onInputBlur('password')}
              />
            </View>
            <View>
              <TouchableOpacity style={s.btnInput}>
                <Text
                  style={s.btnInputText}
                  onPress={() => setIsShowPassword(p => !p)}
                >
                  show
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {!isShowKeyboard && (
            <>
              <View style={{ marginBottom: 16 }}>
                <Btn
                  onPress={() => {
                    console.log(values);
                  }}
                  text="sign in"
                />
              </View>

              <Text style={s.text}> Have you an account? Sign in</Text>
            </>
          )}
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
    position: 'relative',
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
  },
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
