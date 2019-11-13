import { CacheHeightModel, CacheHeight } from "./cache-height"

test("can be created", () => {
  const instance: CacheHeight = CacheHeightModel.create({})

  expect(instance).toBeTruthy()
})