import { Instance, SnapshotOut, types } from "mobx-state-tree"
import type from "ramda/es/type";

export enum Gender {
  MALE = "m",
  FEMALE = "f"
}

/**
 * Model description here for TypeScript hints.
 */
export const UserDetailsModel = types
  .model("UserDetails")
  .props({
    name: types.maybeNull(types.string),
    gender: types.maybeNull(types.enumeration<Gender>(Object.keys(Gender).map(key => Gender[key]))),
    interests: types.optional(types.map(types.boolean), {}),
    igUsername: types.optional(types.string, ''),
    isValidName: true,
    isValidType: true,
    isValidInterest: true,
  })
  .views(self => ({
    get isValid() {
      return self.isValidName && self.isValidType && self.isValidInterest;
    },

    get selectedInterests() {
      const result = [];
      self.interests.forEach((v, k) => {
        if (v)
          result.push(k);
      })

      return result;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addInterest(id: string) {
      if (self.interests.has(id))
        self.interests.set(id, !self.interests.get(id))
      else
        self.interests.set(id, true);
    },

    setIgUsername(username: string) {
      self.igUsername = username;
    },

    setName(name: string) {
      self.name = name;
    },

    setIsValidName(isValid: boolean) {
      self.isValidName = isValid;
    },

    setIsValidType(isValid: boolean) {
      self.isValidType = isValid;
    },

    setIsValidInterest(isValid: boolean) {
      self.isValidInterest = isValid;
    },

    setGender(gender: Gender) {
      self.gender = gender;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type UserDetailsType = Instance<typeof UserDetailsModel>
export interface UserDetails extends UserDetailsType { }
type UserDetailsSnapshotType = SnapshotOut<typeof UserDetailsModel>
export interface UserDetailsSnapshot extends UserDetailsSnapshotType { }
