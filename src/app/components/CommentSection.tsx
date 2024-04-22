"use client";

import FormInput from "./FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, getComments } from "@/queries/comments-api";
import { useSession } from "next-auth/react";
import Comment from "./Comment";

interface IFormInput {
  comment: string;
}

const CommentSection = ({ laureateId }: { laureateId: string }) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { data: session } = useSession();
  const queryCLient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(laureateId),
  });

  const { isSuccess, error, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  console.log("comments: ", comments);

  const onSubmit: SubmitHandler<IFormInput> = async ({
    comment,
  }: IFormInput) => {
    mutate({ comment, laureateId, token: session?.user.accessToken! });
  };

  return (
    <>
      <div className="border border-t-2 mt-4 w-3/5 mx-auto"></div>
      <div className="w-3/5 mx-auto mt-4">
        <div className=" ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-end gap-8"
          >
            <div className="flex-grow">
              <FormInput
                register={register}
                type={"text"}
                id="comment"
                label="Add Comment"
              />
            </div>

            <button
              type="submit"
              className="w-[120px] rounded bg-orange-500/80 px-6 py-2 text-sm font-medium uppercase
           leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-orange-500/90
         active:bg-orange-500 active:shadow-lg"
            >
              post
            </button>
          </form>
        </div>
        <div className=" mt-8">
          {comments?.map((comment: any, i: number) => (
            <Comment
              key={i}
              comment={comment.comment}
              username={comment.username}
              createdAt={comment.createdAt}
            ></Comment>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentSection;
