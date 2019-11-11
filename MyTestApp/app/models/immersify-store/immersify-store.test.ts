import { ImmersifyStoreModel, ImmersifyStore } from "./immersify-store"

test("can be created", () => {
  const instance: ImmersifyStore = ImmersifyStoreModel.create({})

  expect(instance).toBeTruthy()
})