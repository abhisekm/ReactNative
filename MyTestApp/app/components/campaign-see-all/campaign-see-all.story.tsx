import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CampaignSeeAll } from "./"

declare var module

storiesOf("CampaignSeeAll", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CampaignSeeAll text="CampaignSeeAll" />
      </UseCase>
    </Story>
  ))
