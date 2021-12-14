import React, { useContext } from 'react';

import './Post.css';

import { SocialContext } from '../../../context/SocialContext';
import Post from 'components/Shared/Post';

function withPostHOC(Component) {
  const mainComponentsNames = ['LAB', 'HOS', 'EPI'];

  const SparkDict = {
    FB: {
      LAB: false,
      HOS: false,
      EPI: false,
    },
    TW: {
      LAB: false,
      HOS: false,
      EPI: false,
    },
  };

  const WithPost = React.forwardRef((props, ref) => {
    const post = props.id.replace('post-', '').toUpperCase();
    const postsCount = mainComponentsNames.length;
    const { social } = useContext(SocialContext);
    const spark = SparkDict[social][post];
    const newProps = { ...props, spark, postsCount, className: 'Post' };

    return <Component forwardedRef={ref} {...newProps} />;
  });

  return WithPost;
}

export default withPostHOC(Post);
