import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AddSocialMediaAccountModal } from "./"

declare var module

storiesOf("AddSocialMediaAccountModal", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddSocialMediaAccountModal text="AddSocialMediaAccountModal" />
      </UseCase>
    </Story>
  ))
