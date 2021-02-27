import Statusbar from '@ngevent/components/BaseComponent/Statusbar';
import theme from '@ngevent/styles/theme';
import * as React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Button, LoadingBlock} from '@ngevent/components/BaseComponent';
import {RegisterInput, sendRegister} from '@ngevent/api/auth';
import {useMutation} from 'react-query';
import {useUserContext} from '@ngevent/provider/UserProvider';
import {ScrollView} from 'react-native-gesture-handler';

const Register: React.FC = () => {
  const navigation = useNavigation();
  const {setUser} = useUserContext();

  const {mutate, isLoading} = useMutation(sendRegister, {
    onSuccess: (response) => {
      setUser(response.data);
      Alert.alert('Success', 'Register succesfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Login'}],
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

  const [dataForm, setDataForm] = React.useState({
    ...({} as RegisterInput),
    role: 'user',
  });

  const onChange = (name: string, value: any) => {
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

    if (!dataForm.email) {
      showAlert({message: 'Email cant be empty'});
      return false;
    }

    if (!dataForm.password) {
      showAlert({message: 'Password cant be empty'});
      return false;
    }

    if (!dataForm.fullname) {
      showAlert({message: 'Full Name cant be empty'});
      return false;
    }

    return true;
  };

  const showAlert = ({title = 'Warning', message = ''}) => {
    Alert.alert(title, message);
  };

  const onSubmit = () => {
    if (isDataValid()) {
      Alert.alert('Confirmation', 'Are you sure to register?', [
        {text: 'No', onPress: () => null},
        {text: 'Yes', onPress: () => mutate(dataForm)},
      ]);
    }
  };

  return (
    <>
      <Statusbar type="secondary" />
      {isLoading && <LoadingBlock />}
      <ScrollView style={styles.screen}>
        <View style={{marginTop: 120, marginBottom: 24}}>
          <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 40}}>
            Register
          </Text>
          <TextInput
            mode="outlined"
            label="Full Name"
            value={dataForm.fullname}
            onChangeText={(text) => onChange('fullname', text)}
            style={{marginBottom: 16}}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={dataForm.email}
            autoCapitalize={'none'}
            onChangeText={(text) => onChange('email', text)}
            style={{marginBottom: 16}}
            keyboardType="email-address"
          />
          <TextInput
            mode="outlined"
            label="Username"
            value={dataForm.username}
            onChangeText={(text) =>
              onChange('username', text.split(' ').join(''))
            }
            autoCapitalize="none"
            style={{marginBottom: 16}}
          />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry={true}
            value={dataForm.password}
            onChangeText={(text) => onChange('password', text)}
            style={{marginBottom: 16}}
          />

          <Button mode="contained" onPress={onSubmit}>
            Register
          </Button>
        </View>
        <Button mode="text" onPress={() => navigation.navigate('Login')}>
          Login
        </Button>
      </ScrollView>
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

export default Register;
