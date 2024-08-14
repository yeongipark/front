// 게시물 관련 react query정리

import { useQuery } from "@tanstack/react-query";
import { getFeed, getFeedImg } from "../apis/feedApis";

// 게시물 id값으로 특정 게시물 정보 받아오는 api
export const useGetFeed = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["feed", id],
    queryFn: () => getFeed(id),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
};

export const useGetFeedImg = (feedId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["feedImg", feedId],
    queryFn: () => getFeedImg(feedId),
    refetchOnWindowFocus: false, // 포커스 변경시에는 자동 새로 고침이 발생하지 않습니다.
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 데이터가 5분 후에 스테일하다고 판단합니다.
  });

  return { data, isLoading };
};
