import Clipboard from 'clipboard';
import { Toast } from 'antd-mobile';


export default function handleClipboard(text, event, tisMsg = '邀请链接复制成功啦，快去黏贴给受邀成员吧！') {

    const clipboard = new Clipboard(event.target, {

        text: () => text,

    });

    clipboard.on('success', () => {

        Toast.success(tisMsg);

        clipboard.destroy();

    });

    clipboard.on('error', () => {

        Toast.fail('该浏览器不支持自动复制');
        clipboard.destroy();

    });



    clipboard.onClick(event); // 解决！！

}
