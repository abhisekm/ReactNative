import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { BidEntryDialog } from "./"

declare var module

storiesOf("BidEntryDialog", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <BidEntryDialog text="BidEntryDialog" />
      </UseCase>
    </Story>
  ))
