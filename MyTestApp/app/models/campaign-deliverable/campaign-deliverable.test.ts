import { CampaignDeliverableModel, CampaignDeliverable } from "./campaign-deliverable"

test("can be created", () => {
  const instance: CampaignDeliverable = CampaignDeliverableModel.create({})

  expect(instance).toBeTruthy()
})