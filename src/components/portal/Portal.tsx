import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
interface PortalProps {
    children:any
    selector: string
}
let ref:HTMLElement|null;
//先判断组件是否已经被挂载到页面上了，再渲染传送门以及子组件， 否则均返回null
export const Portal:React.FC<PortalProps> = ({ children, selector }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        ref = document.querySelector(selector);
        setMounted(true);
    }, [selector]);
    if (!ref) {
        return null;
    }
    return mounted ? createPortal((<div>{children}</div>), ref) : null;
};

