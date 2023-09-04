import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import colors from '../utils/colors';
import { RoundedButton } from '../components/RoundedButton';
import { spacing, fontSizes } from '../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter New Focus Target</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="gray"
          onChangeText={setSubject}
          placeholder="Mindfulness practice"
        />
        <View style={styles.button}>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject({id: uuid.v4(), text: subject});
            }}
            disabled={!subject}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
  },
  button: {
    justifyContent: 'center',
  },
  label: {
    // borderWidth: 1,
    color: colors.white,
    paddingLeft: spacing.sm,
    marginLeft: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
  textInput: {
    // borderWidth: 1,
    flex: 1,
    height: 40,
    marginLeft: spacing.sm,
    marginRight: spacing.md,
    borderRadius: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.white,
    // fontWeight: 500,
  },
  inputContainer: {
    // borderWidth: 1,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    justifyContent: 'top',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
