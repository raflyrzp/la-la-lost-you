const lyrics = [
    { time: 0, text: "..." },

    // VERSE 1
    { time: 7.0, text: "While I'm on Sunset, are you on the subway?" },
    { time: 11.0, text: "While I drive, are you gettin' on the L-train?" },
    { time: 15.0, text: "I mean, Manhattan's nice, but so are Malibu nights" },
    { time: 21.0, text: "You would know if you stayed" },
    { time: 23.5, text: "You would know if you put up a fight" },

    { time: 26.0, text: "Your toes turn blue in winter, I'm gettin' red" },
    { time: 30.0, text: "Rum does the trick for all of the things left unsaid" },
    { time: 35.0, text: "I'm missin' our drunken 2 A.M. strolls in K-Town" },
    { time: 40.0, text: "Now you're chasing fake highs in the Upper West Side" },

    // PRE-CHORUS 1
    { time: 44.5, text: "And fuckin' on Brooklyns in Brooklyn" },
    { time: 47.5, text: "Your Chelseas in Chelsea" },
    { time: 50.0, text: "Hope that eases the pain, so you remember to miss me" },
    { time: 54.5, text: "And you sold your car, now you walk for miles" },
    { time: 58.5, text: "Bet your feet feel numb" },
    { time: 61.5, text: "(Crosswalks in my mind are shaky, so please hold on tight)" },

    // CHORUS
    { time: 64.5, text: "All my demons run wild" },
    { time: 70.0, text: "All my demons have your smile" },
    { time: 75.2, text: "In the city of angels, in the city of angels" },
    { time: 84.0, text: "Hope New York holds you" },
    { time: 89.5, text: "Hope it holds you like I do" },
    { time: 94.0, text: "While my demons stay faithful" },
    { time: 98.5, text: "In the city of angels" },

    // VERSE 2
    { time: 102.0, text: "Summer's endin' now and the nights are coolin' down" },
    { time: 107.5, text: "Remember last winter when we would drive around" },
    { time: 111.5, text: "Silverlake, Hollywood, pretty little white lies got me good" },
    { time: 117.0, text: "Thought this was love, I was misunderstood, mm" },

    // PRE-CHORUS 2
    { time: 121.8, text: "Feelin' low on the low, drivin' through NoHo" },
    { time: 126.0, text: "If I'm honest, I'd call, but I'm trying to let go" },
    { time: 131.0, text: "And I hope you're happy, livin' life in taxis" },
    { time: 136.0, text: "But you'll always have me, you'll always have me" },

    // CHORUS
    { time: 142.0, text: "All my demons run wild" },
    { time: 146.5, text: "All my demons have your smile" },
    { time: 151.0, text: "In the city of angels, in the city of angels" },
    { time: 160.8, text: "Hope New York holds you" },
    { time: 165.8, text: "Hope it holds you like I do" },
    { time: 169.9, text: "While my demons stay faithful" },
    { time: 174.5, text: "In the city of angels" },

    // OUTRO
    { time: 181.0, text: "..." }
];

const audioPlayer = document.getElementById('audio-player');
const lyricsContainer = document.getElementById('lyrics-content');

function initLyrics() {
    lyricsContainer.innerHTML = "";
    lyrics.forEach((line, index) => {
        const p = document.createElement('p');
        p.textContent = line.text;
        p.classList.add('line');
        p.dataset.index = index;
        p.addEventListener('click', () => {
            audioPlayer.currentTime = line.time;
            audioPlayer.play();
        });
        lyricsContainer.appendChild(p);
    });
}

function syncLyrics() {
    const currentTime = audioPlayer.currentTime;
    const activeIndex = lyrics.findIndex((line, i) => {
        const nextLineTime = lyrics[i + 1] ? lyrics[i + 1].time : Infinity;
        return currentTime >= line.time && currentTime < nextLineTime;
    });
    if (activeIndex !== -1) {
        highlightLine(activeIndex);
    }
}

function highlightLine(index) {
    const allLines = document.querySelectorAll('.line');

    // PERBAIKAN: Menambahkan kurung kurawal {} agar Biome Lint tidak error
    allLines.forEach(line => {
        line.classList.remove('active');
    });

    const activeLine = allLines[index];
    if (activeLine) {
        activeLine.classList.add('active');
        activeLine.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

initLyrics();
audioPlayer.addEventListener('timeupdate', syncLyrics);
