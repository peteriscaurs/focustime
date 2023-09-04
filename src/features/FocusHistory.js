import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

export const FocusHistory = ({ history, onPress }) => {
  if (!history || !history.length) return null;


  const handleItemPress = (item) => {
    onPress(item)
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
    <View style={styles.itemWrapper}>
    <Text style={styles.item}>{item.text}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Target of <Text style={{ color: colors.white }}>Laser Focus</Text></Text>
      <FlatList data={history} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.md,
    flex:0.5,
  },
  itemWrapper: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: spacing.sm,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.black,
    paddingLeft: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm
  },
  title: {
    marginBottom: spacing.sm,
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
});