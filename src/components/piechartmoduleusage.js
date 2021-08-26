import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper";

const PieChart = ({id, userlogs}) => {
    const [chartdata, setChartData] = useState([]);

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
        let thechartdata = countTopTenLogs(userlogs.data.user_module_logs, "Overall");
        setChartData(thechartdata);
    }, [userlogs])

    useEffect(() => {
        let chart = am4core.create(id, am4charts.PieChart);
        chart.data = chartdata;

        let series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "amount";
        series.dataFields.category = "module";

        let grouper = series.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
        grouper.threshold = 5;
        grouper.groupName = "Other";
        grouper.clickBehavior = "break";

        return () => {
            chart.dispose();
        }
    }, [userlogs, id, chartdata])


    return(
        <div id={id} style={{height: "200px"}}></div>
    )
}

export default PieChart;