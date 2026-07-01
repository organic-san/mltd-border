import { query } from './data.js?v=1.0.2';

document.addEventListener('DOMContentLoaded', function() {
    const MAX_WIDTH = 800;

    function computeLayout(containerId) {
        const scrollEl = document.querySelector(containerId).closest('.chart-scroll-container');
        const avail = Math.floor((scrollEl || document.body).getBoundingClientRect().width);
        const totalWidth = Math.max(300, Math.min(MAX_WIDTH, avail));
        const compact = totalWidth < 520;
        const margin = {
            top: 20,
            right: compact ? 16 : 30,
            bottom: 30,
            left: compact ? 46 : 60
        };
        const height = compact ? 300 : 350;
        return {
            totalWidth,
            compact,
            margin,
            width: totalWidth - margin.left - margin.right,
            height
        };
    }

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
        const svgRoot = d3.select(containerId).append("svg");
        const svg = svgRoot.append("g");

        const x = d3.scaleTime();
        const y = d3.scaleLinear();

        const line = d3.line()
            .x(d => x(new Date(d.aggregatedAt)))
            .y(d => y(d.score));

        const tooltip = d3.select("#index-square");

        function setHighlight(idx) {
            svg.selectAll(".line").classed("hidden", true);
            svg.selectAll(".legend-item").classed("hidden", true);
            svg.selectAll(`.line[data-idx="${idx}"]`).classed("hidden", false).attr("stroke-width", 4);
            svg.selectAll(`.legend-item[data-idx="${idx}"]`).classed("hidden", false);
        }

        function clearHighlight() {
            svg.selectAll(".line").classed("hidden", false).attr("stroke-width", 2);
            svg.selectAll(".legend-item").classed("hidden", false);
        }

        return function updateChart(data) {
            const { totalWidth, compact, margin, height } = computeLayout(containerId);

            svgRoot.attr("width", totalWidth);
            svg.selectAll("*").remove();

            const filteredData = data
                .flatMap(d => d.ranklogs.filter(r => r.rank === rank))
                .filter(r => r.data && r.data.length > 0);
            const dataPoints = filteredData.flatMap(r => r.data);
            const metaOf = d => data.find(item => item.ranklogs.includes(d));

            if (!dataPoints.length) {
                svgRoot.attr("height", margin.top + height + margin.bottom);
                return;
            }

            const yFormat = d3.format(",");
            const yMaxValue = d3.max(dataPoints, d => d.score) || 0;
            margin.left = Math.max(margin.left, Math.ceil(yFormat(yMaxValue).length * 7) + 12);
            const width = totalWidth - margin.left - margin.right;

            svg.attr("transform", `translate(${margin.left},${margin.top})`);

            x.range([0, width]).domain(d3.extent(dataPoints, d => new Date(d.aggregatedAt)));
            y.range([height, 0]).domain([0, yMaxValue]);

            const yTicks = compact ? 6 : 10;

            const dayTicks = x.ticks(d3.timeDay.every(1));
            const xFormat = d3.timeFormat(compact ? "%m/%d" : "%a %d");
            const labelWidth = compact ? 42 : 46;
            const maxLabels = Math.max(2, Math.floor(width / labelWidth));
            const labelStep = Math.max(1, Math.ceil(dayTicks.length / maxLabels));
            const xAxis = d3.axisBottom(x)
                .tickValues(dayTicks)
                .tickFormat((d, i) => (i % labelStep === 0 ? xFormat(d) : ""));

            const yAxis = d3.axisLeft(y)
                .ticks(yTicks)
                .tickFormat(yFormat);

            svg.append("g")
                .attr("class", "y grid")
                .call(d3.axisLeft(y)
                    .ticks(yTicks)
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
                .attr("data-idx", (d, i) => i)
                .attr("d", d => line(d.data))
                .attr("stroke", d => metaOf(d).color)
                .on("mouseover", function(event, d) {
                    setHighlight(this.getAttribute("data-idx"));
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
                        `);

                    const tipW = tooltip.node().offsetWidth;
                    const viewportRight = window.scrollX + document.documentElement.clientWidth;
                    let left = event.pageX + 12;
                    if (left + tipW > viewportRight - 4) left = event.pageX - tipW - 12;
                    if (left < window.scrollX + 4) left = window.scrollX + 4;
                    tooltip
                        .style("left", left + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    clearHighlight();
                    tooltip.style("display", "none");

                    focus.style("display", "none");
                });

            const focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none");

            focus.append("text")
                .attr("x", 9)
                .attr("dy", ".35em");

            const legend = svg.append("g")
                .attr("class", "legend")
                .attr("transform", `translate(0,${height + 45})`);

            const rowHeight = 22;
            const itemGap = compact ? 18 : 28;
            const fontSize = compact ? 11 : 12;
            let xOffset = 0;
            let rowCount = 1;

            filteredData.forEach((d, i) => {
                const info = metaOf(d);
                const finalScore = d.data[d.data.length - 1].score;
                const labelText = `${info.name} ${info.annv}th - ${d3.format(",")(finalScore)} pt`;

                const item = legend.append("g")
                    .attr("class", "legend-item")
                    .attr("data-idx", i)
                    .style("cursor", "pointer")
                    .on("mouseover", () => setHighlight(i))
                    .on("mouseout", clearHighlight);

                item.append("line")
                    .attr("x1", 0).attr("x2", 22)
                    .attr("y1", 0).attr("y2", 0)
                    .attr("stroke", info.color)
                    .attr("stroke-width", 3);

                item.append("circle")
                    .attr("cx", 11).attr("cy", 0).attr("r", 4)
                    .attr("fill", info.color);

                const text = item.append("text")
                    .attr("x", 30)
                    .attr("dy", "0.32em")
                    .attr("font-size", `${fontSize}px`)
                    .text(labelText);

                const itemWidth = 30 + text.node().getComputedTextLength() + itemGap;
                if (xOffset > 0 && xOffset + itemWidth > width) {
                    xOffset = 0;
                    rowCount += 1;
                }
                item.attr("transform", `translate(${xOffset},${(rowCount - 1) * rowHeight})`);
                xOffset += itemWidth;
            });

            svgRoot.attr("height", margin.top + height + 45 + rowCount * rowHeight + 10);
        };
    }

    const updateRank100 = createChart("#chart-rank-100", 100);
    const updateRank1000 = createChart("#chart-rank-1000", 1000);

    let lastData = null;
    function updateCharts() {
        const d = query(target, nearbyBase, nearbyRange)
        if(!d) return;
        lastData = d;
        updateRank100(d);
        updateRank1000(d);
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        if (!lastData) return;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateRank100(lastData);
            updateRank1000(lastData);
        }, 200);
    });
});
