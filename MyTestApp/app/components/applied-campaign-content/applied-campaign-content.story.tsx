import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppliedCampaignContent } from "./"

declare var module

storiesOf("AppliedCampaignContent", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppliedCampaignContent text="AppliedCampaignContent" />
      </UseCase>
    </Story>
  ))
