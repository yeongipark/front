import { useParams } from "react-router-dom";
import { useGetFeed } from "../react-query/useFeed";
import Feed from "../component/feed/main/Feed";
import { FeedModal } from "../component/feed/main/FeedModal";
import { useEffect, useState } from "react";

export default function Post() {
  // 가공된 정보 저장할 state
  const [post, setPost] = useState(null);

  // post id가져오기
  const { id } = useParams();

  const { data, isLoading } = useGetFeed(id);

  useEffect(() => {
    if (data) {
      const feedData = {
        mentions: data.mentions,
        hashtags: data.hashtags,
        memberId: data?.postMember?.id,
        id: data.id,
        content: data.content,
        isCommentEnabled: data.isCommentEnabled,
        fileCnt: data.fileCnt,
        createdAt: data.createdAt,
        loveNum: data.likeCnt,
        nickname: data?.postMember?.nickname,
        commentCnt: data.commentCnt,
        liked: data.liked,
        profile: data?.postMember?.profile,
      };

      setPost(feedData);
    }
  }, [data]);

  if (isLoading) "로딩중...";

  return <>{post ? <FeedModal feedList={post} /> : "로딩중..."}</>;
}
