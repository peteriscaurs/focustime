import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import colors from './src/utils/colors';
import { FocusHistory } from './src/features/FocusHistory';
import WhiteDot from './assets/white_dot..png';

export default function App() {
  const [subject, setSubject] = useState(null);
  const [history, setHistory] = useState([
    { id: uuid.v4(), text: 'React Native' },
    { id: uuid.v4(), text: 'Fingerstyle guitar' },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      {!subject ? (
        <>
          <View style={styles.logoContainer}>
            <Image source={WhiteDot} style={styles.logo} />
          </View>
          <Focus addSubject={setSubject} />
          <FocusHistory history={history} onPress={setSubject} />
        </>
      ) : (
        <Timer
          setFocusSubject={setSubject}
          focusSubject={subject}
          onTimerEnd={(subject) => {
            console.log('subject', subject)
            const subjectExists = history.some(item => item.text === subject.text)
            if (!subjectExists) {
            setHistory([...history, subject]);
            }
          }}
          clearSubject={() => {}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.black,
  },
  logoContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
  },
});
