import React, { useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SharedStyles } from "../../shared/styles";
import { useGame } from "../useGame";
import { ScoreScreenProps } from "../../shared/navigator";
import { Question } from "../data";

const QuestionAndAnswer: React.FC<{
  item: Question;
  answer: boolean | undefined;
}> = ({ item, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <TouchableOpacity
      style={Styles.item}
      onPress={() => setShowAnswer(!showAnswer)}
    >
      <Text>{answer === item.correctAnswer ? "✅" : "❌"}</Text>
      <View style={Styles.itemText}>
        <Text>{item.question}</Text>
        {showAnswer && (
          <Text>
            Correct answer: "{`${item.correctAnswer}`}" | Your answer: "
            {`${answer}`}"
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const Score = ({ navigation }: ScoreScreenProps) => {
  const { score, questions, answers, reset } = useGame();
  const handlePlayAgainPress = () => {
    reset();
    navigation.replace("Home");
  };

  return (
    <SafeAreaView style={SharedStyles.container}>
      <Text
        style={[
          Styles.header,
          SharedStyles.headerText,
          SharedStyles.centeredText,
        ]}
      >
        You scored {"\n"}
        {score}/{questions.length}
      </Text>
      <View style={Styles.listContainer}>
        <FlatList
          data={questions}
          style={Styles.list}
          renderItem={({ item, index }) => {
            const answer = answers[index];
            return (
              <QuestionAndAnswer
                key={`score_question_list_item_${item.question}`}
                answer={answer}
                item={item}
              />
            );
          }}
        />
      </View>
      <View style={Styles.bottomAction}>
        <Button onPress={handlePlayAgainPress} title="PLAY AGAIN?" />
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  header: { flex: 0.1, justifyContent: "center" },
  listContainer: { flex: 0.8 },
  item: {
    flexDirection: "row",
    paddingBottom: 10,
    alignItems: "center",
  },
  list: {
    paddingLeft: 25,
    marginRight: 25,
  },
  itemText: {
    paddingLeft: 10,
  },
  bottomAction: { flex: 0.1, justifyContent: "center" },
});
