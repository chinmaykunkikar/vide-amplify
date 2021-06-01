import React from 'react'
import ContentLoader from 'react-content-loader'

const VideoTileSkeleton = props => (
  <ContentLoader
    backgroundColor='#eaeaea'
    foregroundColor='#f9f9f9'
    title=''
    speed={2}
    gradientRatio={1.5}
    {...props}>
    <rect x='15%' y='10%' rx='10' ry='10' width='70%' height='65%' />
    <circle cx='20%' cy='88%' r='4%' />
    <rect x='26%' y='82%' rx='4' ry='4' width='50%' height='3%' />
    <rect x='26.5%' y='90%' rx='3' ry='3' width='35%' height='3%' />
  </ContentLoader>
)

export default VideoTileSkeleton
