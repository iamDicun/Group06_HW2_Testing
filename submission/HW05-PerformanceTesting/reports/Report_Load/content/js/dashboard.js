/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 50.38280329799765, "KoPercent": 49.61719670200235};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5001483239394838, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "GET /api/products?search=Keychron"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/products/5"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/products/4"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/products/3"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/products/2"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/products/1"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/products?search=demo"], "isController": false}, {"data": [1.0, 500, 1500, "Transaction: Product Detail"], "isController": true}, {"data": [0.0, 500, 1500, "GET /api/products?search=MacBook"], "isController": false}, {"data": [0.015195791934541203, 500, 1500, "Transaction: Search Products"], "isController": true}, {"data": [0.0, 500, 1500, "GET /api/products?search=test"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/products?search=Samsung"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/products?search=accessories"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/products?search=iPhone"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/products?search=AirPods"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/products?search=phone"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/products?search=laptop"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3396, 1685, 49.61719670200235, 1.0067726737338034, 0, 186, 0.0, 2.0, 3.0, 4.0, 11.501766245906136, 10.311593618865132, 0.7196773373123257], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/products?search=Keychron", 169, 169, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5813513494919196, 0.7931131203517692, 0.0], "isController": false}, {"data": ["GET /api/products/5", 166, 0, 0.0, 1.8614457831325306, 1, 6, 2.0, 3.0, 3.0, 4.660000000000025, 0.5812243526001036, 0.2650700904924301, 0.07435584979552108], "isController": false}, {"data": ["GET /api/products/4", 332, 0, 0.0, 1.966867469879518, 1, 7, 2.0, 3.0, 3.0, 5.670000000000016, 1.1507519748221013, 0.518063144915028, 0.1472153405289993], "isController": false}, {"data": ["GET /api/products/3", 333, 0, 0.0, 1.942942942942941, 1, 8, 2.0, 3.0, 3.0, 5.980000000000075, 1.1507400329671469, 0.5034487644231267, 0.14721381281122678], "isController": false}, {"data": ["GET /api/products/2", 332, 0, 0.0, 2.4728915662650612, 1, 186, 2.0, 3.0, 3.0, 5.670000000000016, 1.1428492747037886, 0.5357105975174009, 0.14620435057245731], "isController": false}, {"data": ["GET /api/products/1", 498, 0, 0.0, 1.9839357429718867, 1, 10, 2.0, 3.0, 4.0, 7.0, 1.7118343439343315, 0.7539426651507651, 0.21899443267128657], "isController": false}, {"data": ["GET /api/products?search=demo", 168, 168, 100.0, 0.005952380952380953, 0, 1, 0.0, 0.0, 0.0, 0.3100000000000023, 0.5880396926792558, 0.8022377447977739, 0.0], "isController": false}, {"data": ["Transaction: Product Detail", 1685, 0, 0.0, 2.028486646884275, 0, 186, 2.0, 3.0, 3.0, 6.0, 5.706911967919365, 2.525999154123879, 0.7196846497192267], "isController": true}, {"data": ["GET /api/products?search=MacBook", 169, 169, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5772508513596136, 0.7875189837396291, 0.0], "isController": false}, {"data": ["Transaction: Search Products", 1711, 1685, 98.48042080654588, 5.844535359438942E-4, 0, 1, 0.0, 0.0, 0.0, 0.0, 5.709842553844716, 7.67132669263794, 0.0], "isController": true}, {"data": ["GET /api/products?search=test", 168, 168, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5885712083577112, 0.8029628692145727, 0.0], "isController": false}, {"data": ["GET /api/products?search=Samsung", 169, 169, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5751272766872669, 0.784621880402453, 0.0], "isController": false}, {"data": ["GET /api/products?search=accessories", 168, 168, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5896040177302351, 0.8043718874698618, 0.0], "isController": false}, {"data": ["GET /api/products?search=iPhone", 169, 169, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.572871646243284, 0.7815446189471364, 0.0], "isController": false}, {"data": ["GET /api/products?search=AirPods", 169, 169, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5790030868744453, 0.7899094847300784, 0.0], "isController": false}, {"data": ["GET /api/products?search=phone", 168, 168, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5828981836476242, 0.7952234009333311, 0.0], "isController": false}, {"data": ["GET /api/products?search=laptop", 168, 168, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.587026709715292, 0.8008557748752568, 0.0], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 1685, 100.0, 49.61719670200235], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3396, 1685, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 1685, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GET /api/products?search=Keychron", 169, 169, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/products?search=demo", 168, 168, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 168, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/products?search=MacBook", 169, 169, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/products?search=test", 168, 168, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 168, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET /api/products?search=Samsung", 169, 169, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET /api/products?search=accessories", 168, 168, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 168, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET /api/products?search=iPhone", 169, 169, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET /api/products?search=AirPods", 169, 169, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET /api/products?search=phone", 168, 168, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 168, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["GET /api/products?search=laptop", 168, 168, "Non HTTP response code: java.lang.ClassCastException/Non HTTP response message: class org.apache.jmeter.config.Argument cannot be cast to class org.apache.jmeter.protocol.http.util.HTTPArgument (org.apache.jmeter.config.Argument and org.apache.jmeter.protocol.http.util.HTTPArgument are in unnamed module of loader org.apache.jmeter.DynamicClassLoader @4eec7777)", 168, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
