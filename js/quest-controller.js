'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.i-know button').click(onRestartGame)
$('.teach-me button').click(onOpenNewQuest)

function init() {
  console.log('Started...');
  createQuestsTree();
  $('.i-know').hide()
  $('.teach-me').hide() 
}

function onStartGuessing() {
  $('.game-start').hide()   // hide the game-start section
  renderQuest();
  $('.quest').show() // show the quest section
}

function renderQuest() {
  //select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(gCurrQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  console.log(res)
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.i-know').show() 
      // alert('Yes, I knew it!');
      // TODO: improve UX
    } else {
      $('.teach-me').show()
      // alert('I dont know...teach me!');
      // $('.quest').hide()
      // $('.new-quest').show()
      // hide and show new-quest section
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();

  // Get the inputs' values
  //  Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  $('.quest').hide()
  $('.i-know').hide() 
  gLastRes = null;
  createQuestsTree()
}

function onOpenNewQuest(){
  $('.teach-me').hide()
  $('.quest').hide()
  $('.new-quest').show()
}