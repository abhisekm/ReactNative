import * as React from "react"
import { observer } from "mobx-react"
import { View, StyleSheet } from "react-native"
import { Text } from "../../components/text"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { TextField } from "../../components/text-field"
// @ts-ignore
import { SimpleSurvey } from "react-native-simple-survey"
import { CheckBox } from "react-native-elements"
import styleSheet from "../../theme/styleSheet"
import { navigate } from "../../navigation"
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"

export interface QuestionnareScreenProps extends NavigationStackScreenProps<{}> {
}


export const QuestionnaireScreen: NavigationStackScreenComponent<QuestionnareScreenProps> = observer((props) => {
  // const { someStore } = useStores()

  /**
   * Next button
   *
   * @param onPress Must be called when this component is activiated (tapped, swiped, clicked, etc)
   * @param enabled Boolean indicating if this component should be enabled.
   */
  const renderNext = (onPress, enabled) => {
    return (
      <Button
        preset="raised"
        onPress={onPress}
        disabled={!enabled}
        title={'Next'}
        buttonStyle={{ paddingVertical: 20, minWidth: 100 }}
        containerStyle={{ margin: 4 }}
      />
    );
  }

  /**
   * Previous button
   *
   * @param onPress Must be called when this component is activiated (tapped, swiped, clicked, etc)
   * @param enabled Boolean indicating if this component should be enabled.
   */
  const renderPrevious = (onPress, enabled) => {
    if (!enabled)
      return <View />;

    return (
      <Button
        preset="outline"
        onPress={onPress}
        disabled={!enabled}
        title={'Previous'}
        buttonStyle={{ paddingVertical: 20, minWidth: 100 }}
        containerStyle={{ margin: 4 }}
      />
    );
  }

  /**
   * Next button
   *
   * @param onPress Must be called when this component is activiated (tapped, swiped, clicked, etc)
   * @param enabled Boolean indicating if this component should be enabled.
   */
  const renderFinished = (onPress, enabled) => {
    return (
      <Button
        preset="raised"
        onPress={onPress}
        disabled={!enabled}
        title={'Finished'}
        buttonStyle={{ paddingVertical: 20, minWidth: 100 }}
        containerStyle={{ margin: 4 }}
      />
    );
  }

  /**
   * This is the text shown above above each question.
   *
   * @param questionText Text of the question as specified in the JSON for this question.
   */
  const renderQuestionText = (questionText) => {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text preset="question" text={questionText} />
      </View>
    );
  }


  /**
   * This is the UI element that will be shown for each option of a SelectionGroup and MultipleSelectionGroup,
   * Buttons, radio buttons, sliders, whatever you want, so long as onPress gets called when the user has
   * selected something.
   *
   * @param data A complete copy of the 'value' field defined in the JSON object for this SelectionGroup.
   * @param index Index of this option in the array of options that was passed to the SelectionGroup.
   * @param isSelected Indicates if the user has selected this option.
   * @param onPress Must be called when the user has selected this component as their choice.
   */
  const renderSelector = (data, index, isSelected, onPress) => {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
      >
        <CheckBox
          title={data.optionText}
          onPress={onPress}
          key={`button_${index}`}
          checked={isSelected}
          iconType="material"
          checkedIcon="check"
          uncheckedIcon="check"
          textStyle={{ color: color.text }}
          uncheckedColor={color.transparent}
        />
      </View>
    );
  }

  /**
   * Called after the user activates the component passed in to renderFinished
   *
   * @param answers Array of JSON values of answer the user selected or entered
   */
  const onSurveyFinished = (answers) => {
    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      if (typeof (elem.value) === 'object') {
        if (Array.isArray(elem.value)) {
          const optionArray = [];
          for (const option of elem.value) {
            optionArray.push(option.value);
          }
          answersAsObj[elem.questionId] = optionArray;
        } else {
          const { value } = elem.value;
          answersAsObj[elem.questionId] = value;
        }
      } else {
        answersAsObj[elem.questionId] = elem.value;
      }
    }

    console.log(answersAsObj);
    navigate("Dashboard");
  }

  /**
   * Called after the user activitates the renderNext component.
   *
   * @param answers Of type string or Object of answer the user selected or entered
   */
  const onQuestionAnswered = (answers) => {
    console.log(answers);
  }

  /**
   * Renders input component for questions of type TextInput.
   *
   * @param onChange Must be called for every character input by the user
   * @param placeholder Placeholder text as indicated in the JSON, may be blank if not specified in the JSON
   * @param value Current value of this field
   */
  const renderTextInput = (onChange, placeholder, value) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <TextField
          onChangeText={text => onChange(text)}
          placeholder={placeholder}
          value={value}
          multiline
          blurOnSubmit
          returnKeyType='done'
          inputStyle={styleSheet.text_input_container}
        />
      </View>
    );
  }

  /**
   * Renders input component for questions of type NumericInput.
   *
   * @param onChange Must be called for every character input by the user
   * @param value Current value of this field
   */
  const renderNumericInput = (onChange, value) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <TextField
          onChangeText={text => { onChange(text); }}
          underlineColorAndroid={'white'}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={String(value)}
          keyboardType={'numeric'}
          maxLength={3}
          inputStyle={styleSheet.text_input_container}
        />
      </View>
    );
  }

  /**
   *  Renders text on questionType: 'Info' Screens.
   *
   * @param infoText String as passed in the JSON field questionText for questionType: "Info"
   */
  const renderInfoText = (infoText) => {
    return (
      <View style={styles.infoContainer}>
        <Text preset="header" text={infoText} style={{ textAlign: 'center' }} />
      </View>
    );
  }


  const survey = require("./survey-demo.json");

  return (
    <View style={styles.background}>
      <Wallpaper />
      <View style={styles.container}>
        <SimpleSurvey
          survey={survey}
          containerStyle={styles.surveyContainer}
          selectionGroupContainerStyle={styles.selectionGroupContainer}
          navButtonContainerStyle={styles.navButtonContainerStyle}
          renderPrevious={renderPrevious}
          renderNext={renderNext}
          renderFinished={renderFinished}
          renderQuestionText={renderQuestionText}
          renderSelector={renderSelector}
          onSurveyFinished={onSurveyFinished}
          onAnswerSubmitted={onQuestionAnswered}
          renderTextInput={renderTextInput}
          renderNumericInput={renderNumericInput}
          renderInfo={renderInfoText}
        />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    minWidth: '70%',
    maxWidth: '90%',
    minHeight: '50%',
    maxHeight: '90%',
    alignItems: 'stretch',
    justifyContent: 'center',
    elevation: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  surveyContainer: {
    minWidth: '70%',
    maxWidth: '90%',
    minHeight: '50%',
    alignSelf: 'center',
    alignContent: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  selectionGroupContainer: {
    flexGrow: 1,
    marginHorizontal: spacing.medium,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  navButtonContainerStyle: {
    flexDirection: 'row',
    minWidth: '100%',
    justifyContent: 'space-between',
  },
});
