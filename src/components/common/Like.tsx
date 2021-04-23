import React from 'react';

type LikeProps = {
  liked: boolean;
  onLike: () => void;
};

function Like({ liked, onLike }: LikeProps) {
  return (
    <i
      onClick={onLike}
      style={{ cursor: 'pointer' }}
      className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}
    ></i>
  );
}

export default Like;
