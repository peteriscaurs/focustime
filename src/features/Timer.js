import { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { spacing } from '../utils/sizes';
import colors from '../utils/colors';
import { Countdown } from '../components/Countdown';
import { ProgressBar } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({
  focusSubject,
  setFocusSubject,
  onTimerEnd,
  clearSubject,
}) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(25);

  const onEnd = () => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setMinutes(0.1);
    setProgress(1);
    onTimerEnd(focusSubject)
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focus Target</Text>
        <Text style={styles.task}>{focusSubject.text}</Text>
      </View>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={(progress) => {
            setProgress(progress);
          }}
          onEnd={onEnd}
        />
        <ProgressBar
          progress={progress}
          color={colors.primary}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.controls}>
        <RoundedButton
          title="-5"
          onPress={() => setMinutes(minutes - 5)}
          textStyle={{ fontSize: 24 }}
          size={80}
          style={styles.controlItem}
          disabled={minutes <= 5}
        />
        <RoundedButton
          title="+5"
          onPress={() => setMinutes(minutes + 5)}
          textStyle={{ fontSize: 24 }}
          size={80}
          style={styles.controlItem}
          disabled={minutes >= 55}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'pause' : 'start'}
          onPress={() => setIsStarted(!isStarted)}
          textStyle={{ fontSize: 32 }}
        />
      </View>
      <View style={styles.buttonWrapper2}>
        <RoundedButton
          title="go back"
          onPress={() => {
            setFocusSubject(null);
          }}
          textStyle={{ fontSize: 18 }}
          size={80}
          disabled={minutes >= 55}
          style={{ borderWidth: 0 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    // borderWidth: 1,
    flex: 0.5,
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper2: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.primary,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 800,
    textTransform: 'uppercase',
  },
  controls: {
    // borderWidth: 1
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  controlItem: {
    margin: spacing.sm,
  },
});
