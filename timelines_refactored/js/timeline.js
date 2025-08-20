// timeline.js

let delimiter = "\t"; // Tab

// Very basic CSV parser: assumes first line = headers, comma-separated, no quoted commas
function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines.shift().split(delimiter);
    return lines.map(line => {
        const values = line.split(delimiter);
        const entry = {};
        headers.forEach((h, i) => {
            entry[h.trim()] = values[i].trim();
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
                div.innerHTML = `<strong>${event.year}</strong>: ${event.description}`;
                container.appendChild(div);
            });
        })
        .catch(err => console.error('Failed to load timeline:', err));
}

