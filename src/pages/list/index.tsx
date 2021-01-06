import React, { FC, useEffect } from 'react';
import { List } from 'antd-mobile';
import { queryList } from '@/services/memberApi';
import LoadMoreListView from '@alitajs/list-view';
import { ListModelState, ConnectProps, connect } from 'alita';
import Logo from '@/assets/logo.png';

import styles from './index.less';
import { pushViewController } from '@/utils/NativeBridge';

const { Item } = List;
const { Brief } = Item;

interface PageProps extends ConnectProps {
  list: ListModelState;
}

const ListPage: FC<PageProps> = ({ list, dispatch }) => {
  useEffect(() => {}, []);
  const { name } = list;

  const renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <Item
      arrow="horizontal"
      thumb={<img src={Logo} className={styles.listIcon} />}
      multipleLine
      onClick={() => {}}
    >
      {rowData ? rowData.title : ''} <Brief>{rowID}</Brief>
    </Item>
  );
  return (
    <>
      <div
        style={{ fontSize: '40px' }}
        onClick={() => {
          dispatch!({
            type: 'myOrder/archivesUpAndCertification',
            payload: {
              imageBest:
                'data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABygAwAEAAAAAQAAABwAAAAA/8AAEQgAHAAcAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/dAAQAAv/aAAwDAQACEQMRAD8A+4tA+CXw40GS4sbXTdIfyGWNheSwTykKNoJLhmU8ck8sRzzW5P8ABzwbDbrLNomiRRFVKyPb2wUn+8CY/wBO9TN4E8DWmr6tdGwslvLyWVrtWuUzO0h/eFgX56Dr0xwK53xf8KfhT4q1dH8Q/wClahFCkYhk8RSxsqKgCfILgDlcHOOc5PXNYqlGK1ikdrxuKm23Ubfqzdb4N+EQqzN4e0QRMQVLQW5U47f6vBye9co/7Jnwh8WSSXMNqZmgdreX+zNUeJFkBJZXETAbxu5zzjA6AVvSfs7/AAu1/QNEszp7XOlWMLW1hGmr3DIql2dgCJfmbcWySSe2eK6/4cfCXwp8JtDn0fwppKaTps1y948EcjsplYKGb5icZ2j+fc1m6cJOzirf15Dp5hjaTbhUa+bP/9D688XfsofA7xR4h8Q3+sWMk1/q91JPqDL4muIh5pbLYUXA8vnsgHX610dv8JPhNoOqvdJFDZ3clpb2krtrZBeCKJY4QwabkeWq84yevOah179iT4S+J/FGreIb/Rb99V1S5e6upY9Xuow8jnLYVZAFBPYACpdd/Yt+EnivWP7W1Lw3JNqH2aGz85b+dCYoYxFGuA4HCqBn8awlzzTjKKa9f+AUptap6nSt4c8BpPoN8JI7caRHIdM26qqwoHb5nRPN2McgjcQSMEAiu+0fU7PU7TzLS4S4iVthdZ0k59ypIzyK8b1j9ib4S67pmi6feaHeSWej2n2KziGqXICReY0mCd+WO52OTk84r0L4Z/CHwx8IvD8uieGLKSx06S4a6aJ53lPmMFBOWJPRRxWUKfJJ8sIq/wDwPI0lPnS5pN/16n//2Q==',
              liveNess: '1',
              rotate: '1',
              orderId: 3132,
              authChannel: '2000',
              accNbr: '18009313600',
            },
          });
        }}
      >
        申请开票
      </div>
      {/* Model Name:{name}
      <LoadMoreListView
        requestFunc={queryList}
        renderRow={renderRow}
        requestParams={{
          abc: '123',
          token: 'alita',
          pageSize: 10,
          offset: 0,
        }}
      /> */}
    </>
  );
};

export default connect(({ list }: { list: ListModelState }) => ({ list }))(ListPage);
