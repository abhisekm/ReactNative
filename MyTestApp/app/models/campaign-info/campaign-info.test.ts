import { CampaignInfoModel, CampaignInfo } from "./campaign-info"

test("can be created", () => {
  const instance: CampaignInfo = CampaignInfoModel.create({})

  expect(instance).toBeTruthy()
})