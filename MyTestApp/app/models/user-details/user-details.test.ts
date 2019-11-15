import { UserDetailsModel, UserDetails } from "./user-details"

test("can be created", () => {
  const instance: UserDetails = UserDetailsModel.create({})

  expect(instance).toBeTruthy()
})