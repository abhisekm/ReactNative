import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AddSocialMediaAccount } from "./"

declare var module

storiesOf("AddSocialMediaAccount", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddSocialMediaAccount text="AddSocialMediaAccount" />
      </UseCase>
    </Story>
  ))
