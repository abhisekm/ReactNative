import { CampaignDetailModel, CampaignDetail } from "./campaign-detail"

test("can be created", () => {
  const instance: CampaignDetail = CampaignDetailModel.create({})

  expect(instance).toBeTruthy()
})