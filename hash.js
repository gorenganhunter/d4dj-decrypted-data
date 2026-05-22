const { hash } = require("@sonolus/core")
const fs = require("fs")

const music = process.argv.findIndex(arg => arg === "music")
const jacket = process.argv.findIndex(arg => arg === "jacket")
const preview = process.argv.findIndex(arg => arg === "preview")

function hashMusic() {
    const data = {}
    for (const file of fs.readdirSync("./music")) {
        data[file.replace("music_", "").replace(".mp3", "")] = hash(fs.readFileSync("./music/" + file))
    }
    return data
}

function hashJacket() {
    const data = {}
    for (const file of fs.readdirSync("./jacket")) {
        data[file.replace("music_jacket_", "").replace(".jpg", "")] = hash(fs.readFileSync("./jacket/" + file))
    }
    return data
}

function hashPreview() {
    const data = {}
    for (const file of fs.readdirSync("./preview")) {
        data[file.replace("music_preview_", "").replace(".mp3", "")] = hash(fs.readFileSync("./preview/" + file))
    }
    return data
}

try {
    if (music >= 0) fs.writeFileSync("./music.json", JSON.stringify(hashMusic()))
    if (jacket >= 0) fs.writeFileSync("./jacket.json", JSON.stringify(hashJacket()))
    if (preview >= 0) fs.writeFileSync("./preview.json", JSON.stringify(hashPreview()))
} catch (err) {
    console.log(err)
}
