import Avatar from "react-avatar";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

type props = {
  comment: string;
  username: string;
  createdAt: string;
};

const Comment = ({ comment, username, createdAt }: props) => {
  return (
    <div className="flex gap-4 mb-4">
      <Avatar name={username} size="30" round={true} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-8 items-center">
          <p className="text-sm text-gray-700">@{username}</p>
          <p className="text-xs text-gray-500">
            {timeAgo.format(new Date(createdAt))}
          </p>
        </div>

        <p className="text-gray-800">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
