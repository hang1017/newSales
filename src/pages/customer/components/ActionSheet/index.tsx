// import React, { useState, useEffect } from 'react';
// import { Grid } from 'antd-mobile';

// import closeIcon from '@/assets/img/close.png';
// import backIcon from '@/assets/img/back.png';
// import { SelectAlertType } from '@/utils/AppContext';

// import styles from './index.less';
// /**
//  * 数组数据格式：
//  * [{
//  * value: "18900010001",
//  * id: "3",
//  * attr: "预存100，最低消费0",
//  * select: true}]
//  */
// interface ActionSheet {
//   children?: React.ReactNode;
//   show?: boolean; // 是否显示弹框
//   closeClick?: () => {};//
// }
// let selectItem: any = [];

// const Page: React.FC<ActionSheet> = (props) => {
//   const {
//     children,
//     show
//   } = props;

//   const [showNew, updateShowNew] = useState(show);

//   return (
//     <div className={styles.actionModel}>
//       {show && (
//         <div
//           className={styles.actionBg}
//           onClick={(e) => {
//             e.stopPropagation();
//             closeClick(e);
//           }}
//         ></div>
//       )}
//       <div className={`${styles.actAlert} ${show && styles.show}`}>
//         <div className={styles.alertHead}>
//           <div className={styles.leftBack}>
//             {showNew && !isShowNew ? (
//               <img
//                 src={backIcon}
//                 alt=""
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   updateShowNew(false);
//                 }}
//               />
//             ) : (
//                 <div />
//               )}
//           </div>
//           <div className={styles.alertTitle}>{showNew ? newTitle : currentTitle}</div>
//           <div
//             className={styles.rightClose}
//             onClick={(e) => {
//               e.stopPropagation();
//               closeClick(e);
//             }}
//           >
//             <img src={closeIcon} alt="" />
//           </div>
//         </div>
//         <div className={styles.titleView}>
//           <div>
//             <input placeholder='请输入你的幸运数字'
//               className={styles.myInput}
//               type='number'
//               maxLength={11}
//               value={inputValue}
//               onChange={myOnChange}
//             />
//           </div>
//           <div className={styles.searchBtn}>搜索</div>
//         </div>
//         <div className={styles.list}>
//           <Grid
//             data={showNew ? newData : dataList}
//             hasLine={false}
//             columnNum={2}
//             itemStyle={{ height: '100px' }}
//             activeStyle={false}
//             renderItem={(item) =>
//               showNew && type === SelectAlertType.phone ? (
//                 <div
//                   className={
//                     item.select ? styles.itemPhoneSelectStyle : styles.itemPhoneUnselectStyle
//                   }
//                 >
//                   <div>{item.value}</div>
//                   {from !== 'bilibi' && <div className={styles.attr}>{item.attr}</div>}
//                 </div>
//               ) : (
//                   <div className={item.select ? styles.itemSelectStyle : styles.itemUnselectStyle}>
//                     <span>{item.value}</span>
//                   </div>
//                 )
//             }
//             itemStyle={{ height: showNew && type === SelectAlertType.phone ? 200 : 140 }}
//             onClick={showNew ? changeNews : changeData}
//           />
//         </div>

//         <div onClick={changeNewData} className={styles.refreshData}>换一批</div>
//         {

//           //   <div
//           //   className={styles.alertFooter}
//           //   onClick={selectPhone}
//           // >
//           //   <div className={styles.footerBtn}>确定</div>
//           // </div>

//         }

//       </div>
//     </div >
//   );
// };

// export default Page;
