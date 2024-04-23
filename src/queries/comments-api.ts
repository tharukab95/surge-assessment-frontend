import axiosPrivate from "@/utils/axiosPrivate";

export const getComments = async (laureateId: string) => {
  const { data } = await axiosPrivate.get(`/api/comments/${laureateId}`);

  return data.comments;
};

export const createComment = async ({
  comment,
  laureateId,
}: {
  comment: string;
  laureateId: string;
}) => {
  await axiosPrivate.post(`/api/comments`, {
    comment,
    laureateId,
  });
};
