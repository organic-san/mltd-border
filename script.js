import { query } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    let target = 35;
    let nearbyBase = 0;
    let nearbyRange = 10;

    const idolSelectInput = document.getElementById('idolSelect');
    const nearbyRangeInput = document.getElementById('nearbyRange');
    const updateButton = document.getElementById('update-btn');

    updateButton.addEventListener('click', () => {
        const nearbyBaseInput = document.querySelector('input[name="btnrk"]:checked');
        target = parseInt(idolSelectInput.value, 10);
        nearbyBase = parseInt(nearbyBaseInput.value, 10);
        nearbyRange = parseInt(nearbyRangeInput.value, 10);
        if(isNaN(target)) {
            alert('Idol not selected');
            return;
        }
        if(isNaN(nearbyBase) || isNaN(nearbyRange)) {
            alert('Invalid input');
            return;
        }
        if(nearbyRange < 1 || nearbyRange > 104) {
            alert('Nearby range must be between 1 and 104');
            return;
        }
        updateCharts();
    });

    function createChart(containerId, rank) {
        const svg = d3.select(containerId)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        const line = d3.line()
            .x(d => x(new Date(d.aggregatedAt)))
            .y(d => y(d.score));

        const tooltip = d3.select("#index-square");

        return function updateChart(data) {
            svg.selectAll("*").remove();

            const filteredData = data.flatMap(d => d.ranklogs.filter(r => r.rank === rank));
            const dataPoints = filteredData.flatMap(r => r.data);

            x.domain(d3.extent(dataPoints, d => new Date(d.aggregatedAt)));
            y.domain([0, d3.max(dataPoints, d => d.score)]);

            svg.append("g")
                .attr("class", "y grid")
                .call(d3.axisLeft(y)
                    .ticks(10) 
                    .tickSize(-width)
                    .tickFormat(""))
                .selectAll(".tick line")
                .attr("stroke", "#e0e0e0");

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0,${height})`)
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            const paths = svg.selectAll(".line")
                .data(filteredData)
                .enter().append("path")
                .attr("class", "line")
                .attr("d", d => line(d.data))
                .attr("stroke", d => data.find(item => item.ranklogs.includes(d)).color)
                .on("mouseover", function(event, d) {
                    d3.selectAll(".line").classed("hidden", true);
                    d3.select(this).classed("hidden", false).attr("stroke-width", 4);
                    tooltip.style("display", "block");

                    focus.style("display", null);
                })
                .on("mousemove", function(event, d) {
                    const [xPos, yPos] = d3.pointer(event);
                    const x0 = x.invert(xPos);
                    const bisectDate = d3.bisector(e => new Date(e.aggregatedAt)).left;
                    const index = bisectDate(d.data, x0, 1);
                    const d0 = d.data[index - 1];
                    const d1 = d.data[index];
                    const dClosest = x0 - new Date(d0.aggregatedAt) > new Date(d1.aggregatedAt) - x0 ? d1 : d0;

                    focus.attr("transform", `translate(${x(new Date(dClosest.aggregatedAt))},${y(dClosest.score)})`);
                    focus.select("text").text(dClosest.score);
                    focus.select(".x-hover-line").attr("y2", height - y(dClosest.score));
                    focus.select(".y-hover-line").attr("x2", -x(new Date(dClosest.aggregatedAt)));

                    const current = data.find(item => item.ranklogs.includes(d));
                    const time = new Date(dClosest.aggregatedAt);
                    const timtMonth = time.getMonth() + 1;
                    const timeDay = time.getDate();
                    const timeHour = time.getHours().toString().padStart(2, "0");
                    const timeMinute = time.getMinutes().toString().padStart(2, "0");
                    tooltip
                        .html(`
                            <strong>${current.name} ${current.annv}th</strong><br>
                            Score: ${d3.format(",")(dClosest.score)}<br>
                            Max Score: ${d3.format(",")(d.data[d.data.length - 1].score)}<br>
                            Time: ${timtMonth}/${timeDay} ${timeHour}:${timeMinute}
                        `)
                        .style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    d3.selectAll(".line").classed("hidden", false).attr("stroke-width", 2);
                    tooltip.style("display", "none");

                    focus.style("display", "none");
                });

            const focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none");

            focus.append("text")
                .attr("x", 9)
                .attr("dy", ".35em");
        };
    }

    const updateRank100 = createChart("#chart-rank-100", 100);
    const updateRank1000 = createChart("#chart-rank-1000", 1000);

    function updateCharts() {
        const d = query(target, nearbyBase, nearbyRange)
        if(!d) return;
        updateRank100(d);
        updateRank1000(d);
    }
});
