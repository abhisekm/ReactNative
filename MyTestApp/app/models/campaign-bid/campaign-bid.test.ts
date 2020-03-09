import { CampaignBidModel, CampaignBid } from "./campaign-bid"

test("can be created", () => {
  const instance: CampaignBid = CampaignBidModel.create({})

  expect(instance).toBeTruthy()
})