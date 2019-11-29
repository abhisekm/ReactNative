import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CampaignSlider } from "./"

declare var module

storiesOf("CampaignSlider", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CampaignSlider text="CampaignSlider" />
      </UseCase>
    </Story>
  ))
