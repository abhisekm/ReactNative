import { CampaignModel, Campaign } from "./campaign"

test("can be created", () => {
  const instance: Campaign = CampaignModel.create({})

  expect(instance).toBeTruthy()
})