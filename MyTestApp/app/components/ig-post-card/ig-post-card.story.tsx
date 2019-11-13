import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { IgPostCard } from "./"

declare var module

storiesOf("IgPostCard", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <IgPostCard text="IgPostCard" />
      </UseCase>
    </Story>
  ))
