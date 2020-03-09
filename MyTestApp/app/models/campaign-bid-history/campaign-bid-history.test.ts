import { CampaignBidHistoryModel, CampaignBidHistory } from "./campaign-bid-history"

test("can be created", () => {
  const instance: CampaignBidHistory = CampaignBidHistoryModel.create({})

  expect(instance).toBeTruthy()
})