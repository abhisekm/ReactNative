import { CampaignQuoteModel, CampaignQuote } from "./campaign-quote"

test("can be created", () => {
  const instance: CampaignQuote = CampaignQuoteModel.create({})

  expect(instance).toBeTruthy()
})