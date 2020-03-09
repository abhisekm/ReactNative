import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TranslateXView } from "./"

declare var module

storiesOf("TranslateXView", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <TranslateXView text="TranslateXView" />
      </UseCase>
    </Story>
  ))
