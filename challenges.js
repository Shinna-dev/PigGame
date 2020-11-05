var score, roundScore, activePlayer, gamePlaying;

init();

var lastDice;
//document.querySelector('#current-' + activePlayer).textContent = dice;
function hideDice() {
	document.getElementById('dice-1').style.display = none;
	document.getElementById('dice-2').style.display = none;
}

function nextPlayer() {

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	
	hideDice();
}

document.querySelector('.btn-roll').addEventListener('click', function() {

	if (gamePlaying) {
		// 1. random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		// 2. display the result with correct image

		document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';
		// 3. update the round score if dice is not 1

		if ( dice1 !== 1 && dice2 !== 1) {
			// add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			// next player
			nextPlayer();
		}
		
		/*if ( dice === 6 && lastDice === 6) {
			//player looses score and next player
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if ( dice !== 1) {
			// add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			// next player
			nextPlayer();
		}
		lastDice = dice; */
	}	
})

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		//update local score to global
		scores[activePlayer] += roundScore;

		// update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-value').value;
		var winningScore;

		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
		//check if the player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			hideDice();
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;

		} else {
			nextPlayer();
		}
	}
})

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);
hideDice();