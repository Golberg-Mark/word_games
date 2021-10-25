const fs = require('fs');

const phrases = [];

let fileLength = 0,
    filesCount = 0;

const dir = fs.readdirSync('./');

dir.forEach(elName => {
    if (elName.search('.txt$') > 0) filesCount++;
});

for (let i = 0; i < filesCount; i++) {
    const fileData = fs.readFileSync(`./out${i}.txt`).toString();
    const fileDataToArr = fileData.split('\n');

    if (!fileLength) fileLength = fileDataToArr.length;

    phrases.push(...fileDataToArr);
}

const getEachPhraseAmount = () => {
    const results = {};
    const uniqueFromEachFile = [];

    for (let i = 0; i < filesCount; i++) {
        uniqueFromEachFile.push(...new Set(phrases.slice(i * fileLength, (i + 1) * fileLength)));
    }

    const sortedPhrases = uniqueFromEachFile.sort((a, b) => a.localeCompare(b));

    sortedPhrases.forEach(phrase => {
        if (!results[phrase]) results[phrase] = 1;
        else results[phrase]++;
    });

    return results;
};

const uniqueValues = () => {
    console.log(`Unique in all files: ${new Set(phrases).size}`);
};

uniqueValues();

const existInAllFiles = () => {
    const results = getEachPhraseAmount();

    let phrasesCounter = 0;

    for (let [_, value] of Object.entries(results)) {
        if (value === 20) phrasesCounter++;
    }

    console.log(`Phrases count which exist in all files: ${phrasesCounter}`);
};

existInAllFiles();

const existInAtLeastTen = () => {
    const results = getEachPhraseAmount();

    let phrasesCounter = 0;

    for (let [_, value] of Object.entries(results)) {
        if (value >= 10) phrasesCounter++;
    }

    console.log(`Phrases count which exist at least in ten files: ${phrasesCounter}`);
};

existInAtLeastTen();