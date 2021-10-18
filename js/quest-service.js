const KEY = 'quests'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {

    var gQuestsTree = loadFromStorage(KEY)

    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        saveToStorage(KEY, gQuestsTree)
    }

    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {

    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = createQuest(gCurrQuest.txt)
    gPrevQuest[lastRes] = newQuest

    gCurrQuest = gQuestsTree
    gPrevQuest = null

    saveToStorage(KEY, gQuestsTree)
    // TODO: Create and Connect the 2 Quests to the quetsions tree
}

function getCurrQuest() {
    return gCurrQuest
}