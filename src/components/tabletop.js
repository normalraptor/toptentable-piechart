import React, { useEffect, useState } from "react";
import { Table, Cascader } from "antd";

const { Column } = Table;

const TopTen = ({ userlogs }) => {
    const [tabledata, setTabledata] = useState([]);
    const [cascadeval, setCascadeval] = useState("Overall");

    function countTopTenLogs(thelog, module_type){
        var countmodule = [];
        var filteredmodule= [];
        if(module_type !== "Overall"){
            filteredmodule = thelog.filter(function(log){
                return log.module_type === module_type;
            })
        }else{
            filteredmodule = thelog;
        }
        for(let log of filteredmodule){
            if(countmodule.find(data => data.module_id === log.module_id && data.module_type === log.module_type) !== undefined){
                let theindex = countmodule.findIndex(data => data.module_id === log.module_id && data.module_type === log.module_type);
                countmodule[theindex].amount += 1;
            }else{
                countmodule.push({
                    "module_id": log.module_id,
                    "module_type": log.module_type,
                    "module": log.module_name,
                    "amount": 1
                })
            }
        }
        let sortedcountedlogs = countmodule.sort((l1, l2) => (l1.amount<l2.amount) ? 1 : (l1.amount>l2.amount) ? -1 : 0);
        let toptenlogs = sortedcountedlogs.splice(0,10);
        return toptenlogs;
    }

    useEffect(() => {
        let thetabledata = countTopTenLogs(userlogs.data.user_module_logs, cascadeval);
        setTabledata(thetabledata);
    }, [cascadeval, userlogs]);

    const initiateTableData = (logs, moduletype) => {
        let thetabledata = countTopTenLogs(logs, moduletype);
        setTabledata(thetabledata);
    }

    const onchangeCascader = e => {
        const cascadevalue = e[0];
        setCascadeval(cascadevalue);
        initiateTableData(userlogs.data.user_module_logs, cascadeval);
    }

    const cascaderOptions = [
        {
            value: "KPI",
            label: "KPI"
        },
        {
            value: "MODULE",
            label: "Module"
        },
        {
            value: "regular",
            label: "Regular"
        },
        {
            value: "Overall",
            label: "Overall"
        }
    ]

    return(
        <div>
            <Cascader options={cascaderOptions} onChange={onchangeCascader} defaultValue={['Overall']}/>
            <Table dataSource={tabledata} pagination={{ disabled:true, hideOnSinglePage:true}}>
            <Column title="ID" dataIndex="module_id"/>
            <Column title="Module Type" dataIndex="module_type"/>
            <Column title="Module Name" dataIndex="module"/>
            <Column title="Amount Used" dataIndex="amount"/>
            </Table>
        </div>
    )

}

export default TopTen;