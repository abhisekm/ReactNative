import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
const MediaModel = types
  .model("Media")
  .props({
    url: types.identifier,
    height: types.number,
    ts: types.Date
  })

export const CacheHeightModel = types
  .model("CacheHeight")
  .props({
    cache: types.map(MediaModel),
  })
  .views(self => ({
    hasHeight(url: string): boolean {
      return self.cache.has(url);
    },

    getHeight(url: string): number {
      return self.cache.get(url).height;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addHeight(url: string, height: number) {
      self.cache.put({ url: url, height: height, ts: new Date() })
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => {
    const isOldData = (timeStamp: Date): boolean => {
      const diff = 3600 * 24 * 5;

      return (new Date().getTime() - timeStamp.getTime()) > diff;
    }
    const purgeData = async () => {
      Object.keys(self.cache).forEach((key) => {
        if (isOldData(self.cache.get(key).ts)) delete self.cache[key];
      })
    }

    const refreshCache = flow(function* () {
      yield purgeData();
    })

    return { refreshCache }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CacheHeightType = Instance<typeof CacheHeightModel>
export interface CacheHeight extends CacheHeightType { }
type CacheHeightSnapshotType = SnapshotOut<typeof CacheHeightModel>
export interface CacheHeightSnapshot extends CacheHeightSnapshotType { }
