import { Table } from 'antd';
import {FC, ReactElement, PropsWithChildren} from 'react';
import { DataProps } from '../utils/types';

interface ContentLayoutProps {
    pageTitle: string,
    setModalState: (val: boolean) => void
    dataSource: DataProps[]
    columns: DataProps[]
    fetching: boolean
    extraButton?: ReactElement
}
const ContentLayout:FC<PropsWithChildren<ContentLayoutProps>> = ({
    children, 
    pageTitle, 
    setModalState,
    dataSource, 
    columns,
    fetching,
    extraButton
}) => {
    return (
        <>
            <div className="card">
                <div className="cardHeader">
                    <h1 className="headContent">{pageTitle}</h1>
                    <div className="rightContent">
                        <div className="searchInput">
                            <input type="text" />
                        </div>
                        <button onClick={() => setModalState(true)}>
                            Add {pageTitle}
                        </button>
                        {extraButton}
                    </div>
                </div>
                <br />
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    loading={fetching}>
                </Table>
            </div>
            {children}
        </>
    )
}

export default ContentLayout