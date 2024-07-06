
let eventData = {};
let idolData = [];
import defIdolData from './idoldata.js';

const getEventInfo = async () => {
    let data = await fetch(`https://api.matsurihi.me/api/mltd/v2/events?type=anniversary&orderBy=id!`);
    data = await data.json();
    eventData = data.filter(e => e.id != 271);
    
    const evt = document.getElementById('event-title');
    evt.innerHTML = `${eventData[0].name}`;
};

const getIdolInfo = async () => {
    const promiseList = [];
    for(let i = 1; i <= 52; i++) 
        for(let j = 0; j < 3; j++) 
            promiseList.push(fetch(`https://api.matsurihi.me/api/mltd/v2/events/${eventData[j].id}/rankings/idolPoint/${i}/logs/100,1000`));

    const response = await Promise.all(promiseList);
    const data = await Promise.all(response.map(r => r.json()));
    for(let i = 1; i <= 52; i++) {
        for(let j = 0; j < 3; j++) {
            const singleData = JSON.parse(JSON.stringify(defIdolData[i]));
            singleData.annv = eventData.length - j,
            singleData.ranklogs = data[(i - 1) * 3 + j];
            idolData.push(singleData);
        }
    }
}

(async () => {
    await defIdolData;
    await getEventInfo();
    await getIdolInfo();
    const updateButton = document.getElementById('update-btn');
    updateButton.disabled = false;
    updateButton.innerHTML = 'Analyze Data';
})();

const getEvent = () => {
    return eventData;
};

const query = (target, nearbyBase, nearbyRange) => {
    if(!idolData.length) return null;
    
    const data = JSON.parse(JSON.stringify(idolData));
    const newestAnnv = eventData.length;
    const targetData = data.find((d) => d.id == target && d.annv == newestAnnv).ranklogs[nearbyBase].data;
    const targetScore = targetData[targetData.length - 1]?.score;
    if(!targetScore) {
        alert('this idol has no data in this base');
        return null;
    }
    const targetTimeStamp = targetData[targetData.length - 1].aggregatedAt;
    const time = new Date(targetTimeStamp);
    const targetTime = {
        day: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes()
    };

    data.forEach((d) => {
        const ranklogs = d.ranklogs[nearbyBase].data;
        const score = ranklogs.find((t) => {
            const time = new Date(t.aggregatedAt);
            return time.getDate() === targetTime.day && time.getHours() === targetTime.hour && time.getMinutes() === targetTime.minute;
        })?.score;
        if(!score) return d.nearby = undefined;
        d.nearby = Math.abs(score - targetScore);
    });

    data.sort((a, b) => {
        if(a.nearby === undefined) return 1;
        if(!b.nearby === undefined) return -1;
        if(a.nearby === 0) return -1;
        if(b.nearby === 0) return 1;
        if(a.annv == newestAnnv) return 1;
        if(b.annv == newestAnnv) return -1;
        return a.nearby - b.nearby;
    });

    const nearData = data.slice(0, nearbyRange);

    nearData.forEach((d) => {
        d.ranklogs.forEach((r) => {
            r.data.forEach((t) => {
                const time = new Date(t.aggregatedAt);
                time.setFullYear(new Date().getFullYear());
                t.aggregatedAt = time.toISOString();
            });
        });
    });

    return nearData;
};

export { getEvent, query };