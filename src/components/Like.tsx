import React from 'react';

type LikeProps = {
  item: {
    _id: string;
    isLike: boolean;
  };
  onLike: (id: string) => void;
};

function Like({ item, onLike }: LikeProps) {
  return (
    <i
      onClick={() => onLike(item._id)}
      className={item.isLike ? 'fa fa-heart' : 'fa fa-heart-o'}
    ></i>
  );
}

export default Like;
