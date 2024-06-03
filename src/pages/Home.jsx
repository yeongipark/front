import { throttle } from "lodash";
import Feed from "../component/feed/main/Feed";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getAllFeed } from "../apis/feedApis";
import { useState } from "react";
import { Loading } from "../component/basic/Loading";
const Home = () => {
  // 게시물 받아오는 함수
  const fetchFeeds = ({ pageParam = { lastId: 0, nextPage: 1 } }) => {
    const { lastId, nextPage } = pageParam;

    console.log(lastId, nextPage);
    return getAllFeed(lastId, nextPage);
  };

  // 무한 스크롤 구현 부분
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: fetchFeeds,
    getNextPageParam: (lastPage, pages) => {
      const lastId =
        lastPage && Array.isArray(lastPage.data) && lastPage.data.length > 0
          ? lastPage.data[lastPage.data.length - 1].id
          : -1;
      if (lastId === -1) {
        return undefined; // 더 이상 페이지가 없음을 나타냅니다.
      }
      const nextPage = pages.length + 1;
      return { lastId, nextPage };
    },
    staleTime: 1000 * 10 * 5,
    gcTime: 1000 * 10 * 5,
    retry: 3,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <Loading text={"게시물 불러오는중..."}></Loading>;
  }

  // 화면 끝에 도달했는지 확인하는 함수
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  // 서버에서 받아온 데이터 저장
  let list = data?.pages.map((item) => item.data);

  list = list?.map((item1) => {
    return item1.map((item) => ({
      mentions: item.mentions,
      hashtags: item.hashtags,
      memberId: item.postMember?.id,
      id: item.id,
      content: item.content,
      isCommentEnabled: item.isCommentEnabled,
      fileCnt: item.fileCnt,
      createdAt: item.createdAt,
      loveNum: item.likeCnt,
      nickname: item.postMember?.nickname,
      commentCnt: item.commentCnt,
      liked: item.liked,
      profile: item.postMember?.profile,
    }));
  });

  let spreadList;
  spreadList = [...list[0]];
  if (list.length > 1) {
    for (let i = 1; i < list.length; i++) {
      spreadList = [...spreadList, ...list[i]];
    }
  }

  const feedList = spreadList?.map((item) => ({
    mentions: item.mentions,
    hashtags: item.hashtags,
    memberId: item.memberId,
    id: item.id,
    content: item.content,
    isCommentEnabled: item.isCommentEnabled,
    fileCnt: item.fileCnt,
    createdAt: item.createdAt,
    loveNum: item.loveNum,
    nickname: item.nickname,
    commentCnt: item.commentCnt,
    liked: item.liked,
    profile: item.profile,
    hashList: ["#하이요"],
  }));

  return (
    <div
      className="Home"
      onScroll={handleScroll}
      style={{ height: "100vh", overflow: "auto" }}
    >
      {feedList?.map((item, idx) => (
        <Feed feedList={item} key={idx}></Feed>
      ))}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center" }}>게시글 불러오는중 ...</div>
      )}
    </div>
  );
};

export default Home;
