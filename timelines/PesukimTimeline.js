// Convert Chapter:Verse to "global verse index number"
function refToIndex(chapter, verse) {
    let idx = 0;
    // 1. Add up all the verses from the chapters before the given one
    for (let c = 0; c < chapter - 1; c++) idx += verseCounts[c] || 0;
    // 2. Add the verse number within the current chapter
    return idx + (verse - 1);
}

// Convert "global verse index number" to Chapter:Verse
function indexToRef(idx) {

    // Subtract verses per chapter until we reach the right chapter
    let remainder = idx;
    for (let chapterIdx = 0; chapterIdx <= verseCounts.length; chapterIdx++) {
        const versesInNextChapter = verseCounts[chapterIdx];
        if (remainder < versesInNextChapter) return { chapter: chapterIdx + 1, verse: remainder + 1 };
        remainder -= versesInNextChapter;
    }

    return null;
}

const baseDate = new Date(2000, 0, 1);
function indexToDate(idx) { return new Date(baseDate.getTime() + idx * 1000); } // 1 sec per verse
function refToDate(ch, v) { return indexToDate(refToIndex(ch, v)); }
function refToDateInclusive(ch, v) {
    const idx = refToIndex(ch, v) + 1;  // +1 to include last verse
    return indexToDate(idx);
}

const chapterStartDates = [];
for (let c = 0; c < verseCounts.length; c++) {
    chapterStartDates.push(refToDate(c + 1, 1)); // chapter is 1-based
}

let timeline, items;

Papa.parse('./data/5BooksOfMoses/annotations_Devarim.csv', {
    download: true,
    complete: function (results) {
        const data = results.data;
        showTimeline(data);
    }
});

function showTimeline(data) {

    items = new vis.DataSet();

    // Add Chapter point events
    verseCounts.forEach((verseCount, i) => {
        const chapter = i + 1; // 1-based
        items.add({
            id: `perek-${chapter}`,
            content: `${chapter}`,
            start: refToDate(chapter, 1),
            subgroup: "Perek",
            type: "point"
        });
    });

    // Add events from CSV file
    data.forEach((row, i) => {
        if (row.length == 6) { // range
            const startCh = +row[0].trim(), startV = +row[1].trim();
            const subgroup = row[2].trim();
            const content = row[3].trim(); // ToDo: maybe add pre/suffixes?
            const endCh = +row[4].trim(), endV = +row[5].trim();
            items.add({ id: i + 1, content, start: refToDate(startCh, startV), end: refToDateInclusive(endCh, endV), subgroup: subgroup }); //group: subgroup });
        }
        else if (row.length == 4) { // point/event
            const startCh = +row[0].trim(), startV = +row[1].trim();
            const subgroup = row[2].trim();
            const content = row[3].trim(); // ToDo: maybe add pre/suffixes?
            items.add({ id: i + 1, content, start: refToDate(startCh, startV), subgroup: subgroup, type: "point" }); //group: subgroup });
        }
        else {
            alert('Unexpected number of columns for data entry');
        }
    });

    const options = {
        format: {
            minorLabels: date => {
                const idx = Math.round((date - baseDate) / 1000);
                const r = indexToRef(idx);
                return r ? `${r.verse}` : '';
            },

            /* DEAD CODE because of "showMajorLabels: false" below
            majorLabels: date => {
              const idx = Math.round((date - baseDate) / 1000);
              const r = indexToRef(idx);
              return r ? `Genesis ${r.chapter}` : '';
            },*/

        },

        // Attempt at preventing too far zoom-in (resulting in duplicate minor ticks)
        timeAxis: { scale: 'second', step: 1 },

        showMajorLabels: false,  // 👈 hides the "chapter X" ticks
        // The property vis.js uses for custom tick positions depends on version:
        // For v7+, use 'major': { tick: { values: [...] } }
        // Older standalone UMD may not expose tick.values, so we'll use a workaround below
        // - ditto the standalone UMD build of vis-timeline that I'm using is a slimmed-down
        // package that does not expose the same axis-tick configuration API
        // (major: { tick: { values: [...] } } etc.) that you’d get if you imported the
        // ES module version (import { Timeline } from "vis-timeline") via npm/modern bundler.

        stack: false,   /* don’t stagger items within a subgroup (into separate swim lanes).
                              NB: This happens even when items are only back-to-back and not overlapping;
                              would be nice if that was not so - then this feature could we used for visual sanity checking
                              - i.e. where items NOT supposed to overlap were clearer... Maybe investigate further? */

        stackSubgroups: false, // do not stack across subgroups; keeps items in same subgroup on same line

    };

    if (!timeline) {

        /* Clear placeholder content, then
           Display timeline */
        document.getElementById('visualization').innerHTML = "";
        timeline = new vis.Timeline(document.getElementById('visualization'), items, options); //groups, options);

        // Lock the default view as maximum zoom out
        var defaultWindow = timeline.getWindow();
        timeline.setOptions({ min: defaultWindow.start, max: defaultWindow.end });

        // Blue vertical lines at chapters
        for (let i = 0; i < chapterStartDates.length; i++) {
            timeline.addCustomTime(chapterStartDates[i], 'chapter' + (i + 1));
        }

        // Click to show details
        // - BUT see alternative implementation in jewishHistory.html...
        timeline.on('select', props => {
            if (props.items.length) {
                const item = items.get(props.items[0]);
                const sIdx = Math.round((item.start - baseDate) / 1000);
                const eIdx = Math.round((item.end - baseDate) / 1000) - 1; // -1 because we want last verse, not the one after that (which the event box stretches to)
                const sRef = indexToRef(sIdx), eRef = indexToRef(eIdx);
                document.getElementById('details').textContent =
                    `${item.content} (${sRef.chapter}:${sRef.verse}–${eRef.chapter}:${eRef.verse})`;
            }
        });
    } else {
        timeline.setItems(items);
    }
}