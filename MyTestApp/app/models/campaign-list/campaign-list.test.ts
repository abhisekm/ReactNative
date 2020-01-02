import { CampaignListModel, CampaignList } from "./campaign-list"

test("can be created", () => {
  const instance: CampaignList = CampaignListModel.create({})

  expect(instance).toBeTruthy()
})