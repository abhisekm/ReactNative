import { InstagramPostModel, InstagramPost } from "./instagram-post"

test("can be created", () => {
  const instance: InstagramPost = InstagramPostModel.create({})

  expect(instance).toBeTruthy()
})