import { Instance, SnapshotOut, types, flow, applySnapshot, getSnapshot } from "mobx-state-tree"
import { withRootStore, withEnvironment } from "../extensions";
import { RootStore } from "../root-store";
import { AuthStore } from "../auth-store";
import { omit } from "ramda";
import { InfluencerData, BaseResponse, InfluencerProfile } from "../../services/api";
import { NavigationStore } from "../../navigation/navigation-store";
import { getCampaignFromId } from "../../utils/campaignTypeData";

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
    name: types.optional(types.string, ''),
    gender: types.optional(types.enumeration<Gender>(Object.keys(Gender).map(key => Gender[key])), Gender.MALE),
    age: types.optional(types.number, 0),
    location: types.optional(types.string, ''),
    phoneNumber: types.optional(types.string, ''),
    smsPermission: types.optional(types.boolean, false),
    profession: types.optional(types.string, ''),
    languages: types.optional(types.array(types.string), []),
    interests: types.optional(types.map(types.boolean), {}),
    igUsername: types.optional(types.string, ''),
    igUsernameValidated: types.optional(types.boolean, false),
    igFollowerCount: types.optional(types.string, ''),
    socialAccounts: types.optional(types.map(types.string), {}),
    brandsWillNotRecommend: types.optional(types.array(types.string), []),
    renumerationPerGig: types.optional(types.number, 0),
    renumerationPerPhysicalShot: types.optional(types.number, 0),
    workedOnCampaignBefore: types.optional(types.boolean, false),
    interestedCampaignType: types.optional(types.array(types.string), []),
    calculated: false,
    toast: types.optional(types.string, ''),
    alert: types.optional(types.string, ''),
    loading: false,
    isEditing: false,
  })
  .extend(withRootStore)
  .extend(withEnvironment)
  .actions(self => ({
    afterAttach() {
      if (!self.name)
        self.name = (((self.rootStore) as RootStore).authStore as AuthStore).displayName;
    }
  }))
  .actions(self => ({
    clear() {
      Object.keys(self).forEach(key => {
        self[key].reset && self[key].reset()
      })
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
    isValidInterest() {
      if (!self.calculated)
        return true;
      else
        return self.selectedInterests && self.selectedInterests.length > 0;
    },

    get isLoading() {
      return self.loading;
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

    setAge(age: number) {
      self.age = age;
    },

    setLocation(location: string) {
      self.location = location;
    },

    setPhoneNumber(phoneNumber: string) {
      self.phoneNumber = phoneNumber;
    },

    setSmsPermission(permission: boolean) {
      self.smsPermission = permission;
    },

    setProfession(profession: string) {
      self.profession = profession;
    },

    addLanguage(language: string) {
      if (self.languages.indexOf(language) == -1)
        self.languages.push(language);
    },

    removeLanguage(language: string) {
      self.languages.remove(language);
    },

    setFollowerCount(count: string) {
      self.igFollowerCount = count;
    },

    setIgUsernameValidated() {
      self.igUsernameValidated = true;
    },

    addBrands(brand: string) {
      if (self.brandsWillNotRecommend.indexOf(brand) == -1)
        self.brandsWillNotRecommend.push(brand);
    },

    removeBrands(brand: string) {
      self.brandsWillNotRecommend.remove(brand);
    },

    setRenumerationGig(amount: number) {
      self.renumerationPerGig = amount;
    },

    setRenumerationShoot(amount: number) {
      self.renumerationPerPhysicalShot = amount;
    },

    updateSocialAccounts(mediaAccounts: Map<string, string>) {
      self.socialAccounts.clear();
      mediaAccounts.forEach((value, key) => self.socialAccounts.set(key, value));
    },

    socialAccountsMap() {
      const result = new Map<string, string>();
      self.socialAccounts.forEach((value, key) => result.set(key, value))
      return result;
    },

    mediaAccounts() {
      return JSON.stringify(self.socialAccounts);
    },

    setEditing() {
      self.isEditing = true;
    },

    resetEditing() {
      self.isEditing = false;
    },

    setWorkedOnCampaignBefore(value: boolean) {
      self.workedOnCampaignBefore = value;
    },

    toggleCampaignType(campaignTypeId: string) {
      if (self.interestedCampaignType.indexOf(campaignTypeId) == -1)
        self.interestedCampaignType.push(campaignTypeId);
      else
        self.interestedCampaignType.remove(campaignTypeId);
    },

    interestedCampaignAsString() {
      const campaignType: string[] = [];
      self.interestedCampaignType.forEach((value) => {
        const campaign = getCampaignFromId(value);
        if (campaign)
          campaignType.push(campaign.title);
      })

      return campaignType.join(", ");
    }
  }))
  .actions(self => ({
    influencerSignup: flow(function* () {
      self.loading = true;
      self.alert = '';
      self.toast = '';

      const data: InfluencerData = {
        name: self.name,
        insta_account: self.igUsername,
        number_of_followers: self.igFollowerCount,
        location: self.location,
        interests: self.selectedInterests,
        phone: self.phoneNumber,
        allowed_to_send_sms: self.smsPermission
      }

      const result: { kind: string, response: BaseResponse }
        = yield self.environment.api.influencerSignUp(data);

      const { response } = result;


      if (response) {
        if (response.isSuccess) {
          self.toast = 'Signup successfull!';
          ((self.rootStore as RootStore).navigationStore as NavigationStore).navigateTo("OnboardingSuccess");
        } else {
          self.alert = response.msg;
        }
      } else {
        self.alert = 'Something went wrong! Try again later';
      }

      self.loading = false;
    }),

    getInfluencerProfile: flow(function* (onSuccess: () => void) {
      self.loading = true;
      self.alert = '';
      self.toast = '';


      const result: { kind: string, response: BaseResponse, data: InfluencerProfile }
        = yield self.environment.api.getUserProfile();

      const { response, data } = result;


      if (response) {
        if (response.isSuccess) {
          if (data) {
            self.name = data.name ? data.name : self.name;
            self.igUsername = data.insta_account ? data.insta_account : '';
            self.igFollowerCount = data.number_of_followers ? data.number_of_followers : '';
            self.location = data.location ? data.location : '';
            self.phoneNumber = data.phone ? data.phone : '';
            self.smsPermission = data.allowed_to_send_sms ? data.allowed_to_send_sms : false;
            self.profession = data.profession ? data.profession : '';
            self.age = data.age ? data.age : 0;
            self.gender = data.gender && data.gender == 'm' ? Gender.MALE : Gender.FEMALE;
            self.renumerationPerGig = data.expected_renumeration_per_gig ? data.expected_renumeration_per_gig : 0;
            self.renumerationPerPhysicalShot = data.expected_renumeration_per_pp_shoot ? data.expected_renumeration_per_pp_shoot : 0;

            if (data.interests && data.interests.length > 0) {
              data.interests.forEach((item) => {
                self.addInterest(item);
              })
            }

            if (data.languages && data.languages.length > 0) {
              self.languages.clear();
              data.languages.forEach((item) => {
                self.languages.push(item);
              })
            }

            if (data.not_recomended_brands_and_products && data.not_recomended_brands_and_products.length > 0) {
              self.brandsWillNotRecommend.clear();
              data.not_recomended_brands_and_products.forEach((item) => {
                self.brandsWillNotRecommend.push(item);
              })
            }

            const mediaAccounts: Map<string, string> = new Map();
            if (data.youtube_account) {
              mediaAccounts.set('youtube', data.youtube_account);
            }
            if (data.facebook_account) {
              mediaAccounts.set('facebook', data.facebook_account);
            }
            if (data.tiktok_account) {
              mediaAccounts.set('tiktok', data.tiktok_account);
            }
            if (data.twitter_account) {
              mediaAccounts.set('twitter', data.twitter_account);
            }
            if (mediaAccounts.size > 0) {
              self.updateSocialAccounts(mediaAccounts);
            }

            if (onSuccess)
              onSuccess();
          } else {
            self.alert = 'Corrupted Data!'
          }
        } else {
          self.alert = response.msg;
        }
      } else {
        self.alert = 'Something went wrong! Try again later';
      }

      self.loading = false;
    }),

    saveInfluencerProfile: flow(function* (onSuccess: () => void) {
      self.loading = true;
      self.alert = '';
      self.toast = '';

      const data: InfluencerProfile = {
        name: self.name,
        insta_account: self.igUsername,
        number_of_followers: self.igFollowerCount,
        location: self.location,
        interests: self.selectedInterests,
        phone: self.phoneNumber,
        allowed_to_send_sms: self.smsPermission,
        social_media: Object.keys(self.socialAccountsMap()),
        profession: self.profession,
        languages: self.languages,
        age: self.age,
        gender: self.gender,
        not_recomended_brands_and_products: self.brandsWillNotRecommend,
        expected_renumeration_per_gig: self.renumerationPerGig,
        expected_renumeration_per_pp_shoot: self.renumerationPerPhysicalShot,
        youtube_account: self.socialAccountsMap().get("youtube"),
        facebook_account: self.socialAccountsMap().get("facebook"),
        twitter_account: self.socialAccountsMap().get("twitter"),
        tiktok_account: self.socialAccountsMap().get("tiktok"),
      }

      const result: { kind: string, response: BaseResponse }
        = yield self.environment.api.saveUserProfile(data);

      const { response } = result;

      if (response) {
        if (response.isSuccess) {
          self.toast = 'Signup successfull!';
          if (onSuccess)
            onSuccess();
          self.isEditing = false;
        } else {
          self.alert = response.msg;
        }
      } else {
        self.alert = 'Something went wrong! Try again later';
      }

      self.loading = false;
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(omit(["loading", "toast", "alert"]));
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
