import {LoginInput, sendLogin} from '@ngevent/api/auth';
import {Button, LoadingBlock} from '@ngevent/components/BaseComponent';
import Statusbar from '@ngevent/components/BaseComponent/Statusbar';
import {useUserContext} from '@ngevent/provider/UserProvider';
import theme from '@ngevent/styles/theme';
import {CommonActions, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {useMutation} from 'react-query';

const Login: React.FC = () => {
  const {setUser} = useUserContext();
  const navigation = useNavigation();

  const [dataForm, setDataForm] = React.useState({...({} as LoginInput)});

  const {mutate, isLoading} = useMutation(sendLogin, {
    onSuccess: (response) => {
      setUser(response.data);
      Alert.alert('Success', 'Login succesfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Dashboard'}],
              }),
            );
          },
        },
      ]);
    },
    onError: (err) => {
      Alert.alert('Error', err?.message || 'Something error occured');
    },
  });

  const onChange = (name: 'username' | 'password', value: any) => {
    setDataForm((old) => {
      const newData = {...old};
      newData[name] = value;
      return newData;
    });
  };

  const isDataValid = () => {
    if (!dataForm.username) {
      showAlert({message: 'Username cant be empty'});
      return false;
    }

    if (!dataForm.password) {
      showAlert({message: 'Password cant be empty'});
      return false;
    }

    return true;
  };

  const showAlert = ({title = 'Warning', message = ''}) => {
    Alert.alert(title, message);
  };

  const onSubmit = () => {
    if (isDataValid()) {
      mutate(dataForm);
    }
  };

  return (
    <>
      <Statusbar type="secondary" />
      {isLoading && <LoadingBlock />}
      <View style={styles.screen}>
        <View style={{marginTop: 120, marginBottom: 24}}>
          <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 40}}>
            Login
          </Text>
          <TextInput
            mode="outlined"
            label="Username"
            autoCapitalize="none"
            value={dataForm.username}
            onChangeText={(text) => onChange('username', text)}
            style={{marginBottom: 16}}
          />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            value={dataForm.password}
            onChangeText={(text) => onChange('password', text)}
            style={{marginBottom: 16}}
          />
          <Button mode="contained" onPress={onSubmit}>
            Login
          </Button>
        </View>
        <Button mode="text" onPress={() => navigation.navigate('Register')}>
          Register
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
  },
});

export default Login;
