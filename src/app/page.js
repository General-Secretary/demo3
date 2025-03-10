import * as React from 'react';
import Header from './../components/Home Comp/Header';
import Describe from '@/components/Home Comp/Describe';
import MoreThan450 from '@/components/Home Comp/Morethan450';
import Video from './../components/Home Comp/Video';

export default function page() {
  return (
    <div>
      <Header />
      <Describe marginTop={"mt-20"} />
      <MoreThan450 />
      <Video />
    </div>
  )
}
