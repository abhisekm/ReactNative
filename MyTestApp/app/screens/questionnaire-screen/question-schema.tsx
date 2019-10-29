//  survey : Array<Info | TextInput | NumericInput | SelectionGroup | MultipleSelectionGroup>;

interface Info {
  questionType: "Info",
  questionText: string
}

interface TextInput {
  questionType: "TextInput",
  questionText: string,
  questionId: string,
  placeholderText?: string
}

interface NumericInput {
  questionType: "NumericInput",
  questionText: string,
  questionId: string,
  placeholderText?: string
}

interface SelectionGroupOption {
  optionText: string,
  value: any
}

interface SelectionGroup {
  questionType: "SelectionGroup",
  questionText: string,
  questionId: string,
  options: SelectionGroupOption[]
}

interface MultipleSelectionGroup {
  questionType: "MultipleSelectionGroup",
  questionText: string,
  questionId: string,
  questionSettings: {
    maxMultiSelect: number,
    minMultiSelect?: number,
  },
  options: SelectionGroupOption[]
}

export type ISurvey = Array<Info | TextInput | NumericInput | SelectionGroup | MultipleSelectionGroup>;