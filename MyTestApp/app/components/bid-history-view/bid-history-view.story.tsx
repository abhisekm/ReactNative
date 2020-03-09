import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { BidHistoryView } from "./"

declare var module

storiesOf("BidHistoryView", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <BidHistoryView text="BidHistoryView" />
      </UseCase>
    </Story>
  ))
