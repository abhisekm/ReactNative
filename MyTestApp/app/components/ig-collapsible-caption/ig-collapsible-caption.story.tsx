import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { IgCollapsibleCaption } from "./"

declare var module

storiesOf("IgCollapsibleCaption", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <IgCollapsibleCaption text="IgCollapsibleCaption" />
      </UseCase>
    </Story>
  ))
