import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect } from "react";

import { useGame } from "../useGame";
import { SharedStyles } from "../../shared/styles";
import { PlayScreenProps } from "../../shared/navigator";

export const Play = ({ navigation }: PlayScreenProps) => {
  const { currentQuestionIndex, questions, setAnswer, hasEnded } = useGame();
  const question = questions[currentQuestionIndex];

  useEffect(() => {
    if (hasEnded) {
      navigation.replace("Score");
    }
  }, [hasEnded]);

  if (!question) return null;

  return (
    <SafeAreaView style={SharedStyles.container}>
      <View style={SharedStyles.flex}>
        <Text style={[SharedStyles.headerText, SharedStyles.centeredText]}>
          {question.category}
        </Text>
      </View>
      <View style={SharedStyles.flex}>
        <View style={Styles.questionContainer}>
          <Text style={SharedStyles.centeredText}>{question.question}</Text>
        </View>
        <Text style={SharedStyles.centeredText}>
          {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <View style={Styles.answerContainer}>
          <Button title="True" color="green" onPress={() => setAnswer(true)} />
          <Button title="False" color="red" onPress={() => setAnswer(true)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  questionContainer: {
    borderWidth: 1,
    padding: 15,
    borderColor: "#4A4A4A",
    marginBottom: 10,
    marginHorizontal: 30,
  },
  answerContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
    justifyContent: "center",
  },
});
