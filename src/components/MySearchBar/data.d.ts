import { SearchBarPropsType } from 'antd-mobile/es/search-bar/PropsType';
export interface IAliasProps {
  label?: string;
  value?: string;
}

export interface ISearchBarProps extends SearchBarPropsType {
  type?: 'light' | 'dark';
  onOk: (e: string) => void;
  onCancel?: (e: string) => void;
  cRef?: any;
  data?: any[];
  filterValue?: string | number;
  alias?: IAliasProps;
  filterChange?: (e: string | number) => void;
}
