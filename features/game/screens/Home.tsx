import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useGame } from "../useGame";
import type { HomeScreenProps } from "../../shared/navigator";
import { SharedStyles } from "../../shared/styles";

export const Home = ({ navigation }: HomeScreenProps) => {
  const { start, errorLoadingQuestions, isLoadingQuestions } = useGame();
  const handleBeginGamePress = () => {
    start().then(() => {
      navigation.replace("Play");
    });
  };

  return (
    <SafeAreaView style={SharedStyles.container}>
      <Text
        style={[
          SharedStyles.centeredText,
          SharedStyles.headerText,
          SharedStyles.flex,
        ]}
      >
        Welcome to the {"\n"}
        Trivia Challenge!
      </Text>
      <View style={SharedStyles.flex}>
        <Text style={SharedStyles.centeredText}>
          You will be presented with 10 True or False Questions.
        </Text>
        <Text style={SharedStyles.centeredText}>Can you score 100%?</Text>
        {errorLoadingQuestions && (
          <Text style={SharedStyles.centeredText}>
            Something went wrong. Here's what we know: "{errorLoadingQuestions}"
          </Text>
        )}
      </View>
      <Button
        disabled={isLoadingQuestions}
        onPress={handleBeginGamePress}
        title={isLoadingQuestions ? "BEGINNING..." : "BEGIN"}
      />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({});
