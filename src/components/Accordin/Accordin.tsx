import { useCallback, useEffect, useState } from "react";
import "./Accordin.css";

type AccordinData = {
    title: string;
    content: string;
    icon?: string;
}

interface IItem {
    data: AccordinData;
    isOpen?: boolean;
    disable?: boolean;
}

function Item(props: IItem) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (props.isOpen) setIsOpen(props.isOpen);
    }, [])

    const handleOpenOnClick = useCallback(() => {
        if (!props.disable) setIsOpen((prevState) => !prevState);
    }, [])

    return (<div className={`accordin-item ${!!props.disable ? 'disabled' : ''}`}>
        <div className="accordin-title" onClick={handleOpenOnClick}>
            <h1>{props.data.title}</h1>
            <span>{props.data.icon}</span>
        </div>
        <p className={`${isOpen ? 'open' : 'closed'}`}>{props.data.content}</p>
    </div>)
}

type AccordinDirection = 'verticle' | 'horizontal';
interface IGroup {
    direction: AccordinDirection;
    children?: React.ReactNode;
}

function Group(props: IGroup) {
    return (<div className={`accordin-group ${props.direction}`}>
        {props.children}
    </div>);
}

export default function Accordin() {
    const content = [
        {title: 'Accordin #1', icon: '', content: 'This is an accordin, number 1'},
        {title: 'Accordin #2', icon: '', content: 'This is an accordin, number 2'}
    ];

    return <Group direction='horizontal'>
        {content.map((value, index: number) => {
            return <Item data={value} key={index} />
        })}
    </Group>
}
