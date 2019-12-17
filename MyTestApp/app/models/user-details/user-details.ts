import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withRootStore } from "../extensions";
import { RootStore } from "../root-store";
import { AuthStore } from "../auth-store";

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
    socialAccounts: types.optional(types.map(types.string), {}),
    calculated: false,
  })
  .extend(withRootStore)
  .actions(self => ({
    afterAttach() {
      if (!self.name)
        self.name = (((self.rootStore) as RootStore).authStore as AuthStore).displayName;
    }
  }))
  .actions(self => ({
    clear() {
      self.name = null;
      self.gender = null;
      self.interests.clear();
      self.igUsername = '';
      self.socialAccounts.clear();
      self.calculated = false;
    },

    updateCalculated() {
      self.calculated = true;
    }
  }))
  .views(self => ({
    get selectedInterests() {
      const result: string[] = [];
      self.interests.forEach((v, k) => {
        if (v)
          result.push(k);
      })

      return result;
    },

    get allInterest() {
      return self.interests;
    },
  }))
  .views(self => ({
    isValidName() {
      if (!self.calculated)
        return true;
      else
        return self.name && self.name.length > 0;
    },

    isValidType() {
      if (!self.calculated)
        return true;
      else
        return self.gender != null;
    },

    isValidInterest() {
      if (!self.calculated)
        return true;
      else
        return self.selectedInterests && self.selectedInterests.length > 0;
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

    setGender(gender: Gender) {
      self.gender = gender;
    },

    updateSocialAccounts(mediaAccounts: Map<string, string>) {
      self.socialAccounts.clear();
      mediaAccounts.forEach((value, key) => self.socialAccounts.set(key, value));
    },

    isValid() {
      return self.isValidName() && self.isValidType() && self.isValidInterest();
    },

    socialAccountsMap() {
      const result = new Map<string, string>();
      self.socialAccounts.forEach((value, key) => result.set(key, value))
      return result;
    },

    mediaAccounts() {
      return JSON.stringify(self.socialAccounts);
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
