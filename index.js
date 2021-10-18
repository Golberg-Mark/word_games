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

const uniqueValues = () => {
  for (let i = 0; i < filesCount; i++) {
      console.log(`Unique in ${i} file: ${new Set(phrases.slice(i * fileLength, (i + 1) * fileLength)).size}`);
  }
};

// uniqueValues();

const existInAllFiles = () => {
    console.log(`Unique in all files: ${new Set(phrases).size}`);
};

// existInAllFiles();

const existInAtLeastTen = () => {
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

    let phrasesCounter = 0;

    for (let [_, value] of Object.entries(results)) {
        if (value >= 10) phrasesCounter++;
    }

    console.log(`Phrases count which exist at least in ten files: ${phrasesCounter}`);
};

// existInAtLeastTen();