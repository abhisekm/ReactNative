import * as React from "react"
import { observer } from "mobx-react"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import styleSheet from "../../theme/styleSheet"
import { View, FlatList, ListRenderItem, ActivityIndicator, RefreshControl } from "react-native"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon, Badge } from "react-native-elements"
import { InstagramPost } from "../../models/instagram-post"
import { IgPostCard } from "../../components/ig-post-card"
import { Loading } from "../../components/loading"

export interface FeaturePostsScreenProps extends NavigationTabScreenProps<{}> {
}

export const FeaturePostsScreen: NavigationBottomTabScreenComponent<FeaturePostsScreenProps> = observer((props) => {
  const {
    immersifyStore: { isLoading, isLoadingMore, fetchFeaturedPosts, fetchMoreFeaturedPosts, loadPosts }
  } = useStores()

  React.useEffect(() => {
    fetchFeaturedPosts()
  }, []);

  const _renderItem: ListRenderItem<InstagramPost> = ({ item }) => <IgPostCard data={item} />;

  const _footerLoading = () => {
    return (
      isLoadingMore ? <ActivityIndicator /> : null
    )
  }

  return (
    <View style={styleSheet.view_full}>
      <Screen style={{ ...styleSheet.view_container }} preset="fixed" unsafe statusBar="light-content" backgroundColor={color.palette.grey9} hideWallpaper>

        <FlatList
          // onRefresh={fetchFeaturedPosts}
          // refreshing={isLoading}
          data={loadPosts}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          onEndReached={fetchMoreFeaturedPosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={_footerLoading}
          removeClippedSubviews
          initialNumToRender={3}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchFeaturedPosts}
              colors={[color.primary, color.secondary]}
            />
          }
        />
        <Badge containerStyle={{ position: 'absolute' }} value={loadPosts.length} />
      </Screen>
    </View>
  )
})

FeaturePostsScreen.navigationOptions = {
  title: 'Posts',
  tabBarIcon: ({ tintColor }) => <Icon name='heart' type='foundation' color={tintColor} />
}
