import { FeaturePostModel, FeaturePost } from "./feature-post"

test("can be created", () => {
  const instance: FeaturePost = FeaturePostModel.create({})

  expect(instance).toBeTruthy()
})