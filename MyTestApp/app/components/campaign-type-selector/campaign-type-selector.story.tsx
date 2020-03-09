import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CampaignTypeSelector } from "./"

declare var module

storiesOf("CampaignTypeSelector", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CampaignTypeSelector text="CampaignTypeSelector" />
      </UseCase>
    </Story>
  ))
