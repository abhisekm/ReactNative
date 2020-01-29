import { CampaignStatusModel, CampaignStatus } from "./campaign-status"

test("can be created", () => {
  const instance: CampaignStatus = CampaignStatusModel.create({})

  expect(instance).toBeTruthy()
})