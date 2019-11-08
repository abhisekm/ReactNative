import * as React from "react"
import { observer } from "mobx-react"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import styleSheet from "../../theme/styleSheet"
import { View, FlatList, ListRenderItem, ActivityIndicator } from "react-native"
import { Wallpaper } from "../../components/wallpaper"
import { Loading } from "../../components/loading"
import { NavigationTabScreenProps, NavigationBottomTabScreenComponent } from "react-navigation-tabs"
import { Icon, Badge } from "react-native-elements"
import { PostCard } from "../../components/postCard"
import { InstagramPost } from "../../models/instagram-post"

export interface FeaturePostsScreenProps extends NavigationTabScreenProps<{}> {
}

export const FeaturePostsScreen: NavigationBottomTabScreenComponent<FeaturePostsScreenProps> = observer((props) => {
  const { igStore: { isLoading, isLoadingMore, fetchPosts, fetchMorePosts, loadPosts } } = useStores()

  React.useEffect(() => {
    fetchPosts()
  }, []);

  const _renderItem: ListRenderItem<InstagramPost> = ({ item }) => <PostCard data={item} />;

  const _footerLoading = () => {
    return (
      isLoadingMore ? <ActivityIndicator /> : null
    )
  }

  return (
    <View style={styleSheet.view_full}>
      <Wallpaper />
      <Screen style={{ ...styleSheet.view_container }} preset="fixed" backgroundColor={color.palette.white}>
        <FlatList
          onRefresh={fetchPosts}
          refreshing={isLoading}
          data={loadPosts}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={_footerLoading}
        />
        {/* {isLoading && <Loading />} */}

        <Badge containerStyle={{ position: 'absolute' }} value={loadPosts.length} />
      </Screen>
    </View>
  )
})

FeaturePostsScreen.navigationOptions = {
  title: 'Posts',
  tabBarIcon: <Icon name='heart' type='foundation' color='red' />
}
