// timeline.js

let delimiter = "\t"; // Tab

// Very basic CSV parser: assumes first line = headers
function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines.shift().split(delimiter).map(h => h.trim());
    return lines.map(line => {
        const values = line.split(delimiter);
        const entry = {};
        headers.forEach((h, i) => {
            entry[h] = values[i].trim();
        });
        return entry;
    });
}

export function renderTimeline(containerId, dataFile) {
    fetch(dataFile)
        .then(res => res.text())
        .then(csvText => {
            const events = parseCSV(csvText);
            console.log(events);
            const container = document.getElementById(containerId);
            container.innerHTML = ''; // clear container

            events.forEach(event => {
                const div = document.createElement('div');
                div.className = 'timeline-event';
                div.innerHTML = `<strong>${event.HebYr}</strong>: ${event.Label}`;
                container.appendChild(div);
            });
        })
        .catch(err => console.error('Failed to load timeline:', err));
}
