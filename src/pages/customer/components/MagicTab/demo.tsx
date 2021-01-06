import React, { FC } from 'react';
import { MagicTab } from 'ge-components';

const Page: FC = (props) => {
  return (
    <div>
      <MagicTab
        onTabClick={(e) => {
          console.log(e);
        }}
        initiazePage={1}
        data={[
          {
            title: '新加入青年一派',
            key: '01',
          },
          {
            title: '新加入青年一派',
            key: '02',
          },
        ]}
      />
    </div>
  );
};

export default Page;
