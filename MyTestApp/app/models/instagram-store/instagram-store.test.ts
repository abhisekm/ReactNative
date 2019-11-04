import { InstagramStoreModel, InstagramStore } from "./instagram-store"

test("can be created", () => {
  const instance: InstagramStore = InstagramStoreModel.create({})

  expect(instance).toBeTruthy()
})