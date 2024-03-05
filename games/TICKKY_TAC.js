/*
@title: BAleBale
@tags: ['classic']
@img: ""
@addedOn: 2023-09-08
@author: riteshraj

This isn't 100% made by me, as I heavily modified Northernside's code and added some bugs and a AI player.credits : https://sprig.hackclub.com/gallery/Tic_Tac_Toe

@credits: NORTHSIDE-> because this game builds upon their work
*/

const x = "X",
  o = "O",
  cursor = "c";

const tile = "0",
  endScreenTile = "1";

setLegend(
  [ cursor, bitmap`
................
.LLLLLLLLLLLLLL.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.L............L.
.LLLLLLLLLLLLLL.
................`],
  [ x,  bitmap`
................
................
..337L...L4D33..
..3237L.L4D323..
..D3237L4D3237..
..4D3237L3237L..
..L4D3233237L...
...L4L3LL37L....
....L73LL3L4L...
...L7323323D4L..
..L7323L7323D4..
..7323D4L7323D..
..323D4L.L7323..
..33D4L...L733..
................
................`],
  [ o,  bitmap`
................
................
....22222222....
...2211111122...
..2244LLLL4422..
..214440044412..
..21L444444L12..
..21L044440L12..
..21L044440L12..
..21L444444L12..
..214440044412..
..2244LLLL4422..
...2211111122...
....22222222....
................
................`],
  [ tile, bitmap`
2222222222222222
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2222222222222222`],
  [ endScreenTile, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

setMap(map`
000
000
000`);
addSprite(1, 1, cursor);

let isPlayer = true,
  tileState = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ], gameEnded = false;

function checkWin() {
  const mappedChar = (isPlayer ? "X" : "O");
  
  // Vertical check
  for (let y = 0; y < 3; ++y)
    if (tileState[y][0] != " " && tileState[y][0] == tileState[y][1] && tileState[y][1] == tileState[y][2])
      endGame(mappedChar + " wins!");
      
  // Horizontal check
  for (let x = 0; x < 3; ++x)
    if (tileState[0][x] != " " && tileState[0][x] == tileState[1][x] && tileState[1][x] == tileState[2][x])
      endGame(mappedChar + " wins!");

  // Diagonal check
  if (tileState[0][0] != " " && tileState[0][0] == tileState[1][1] && tileState[1][1] == tileState[2][2])
    endGame(mappedChar + " wins!");
    
  // Antidiagonal check
  if (tileState[0][2] != " " && tileState[0][2] == tileState[1][1] && tileState[1][1] == tileState[2][0])
    endGame(mappedChar + " wins!");
  
  return;
}

function checkTie() {
  for (let y = 0; y < 3; y++)
    for (let x = 0; x < 3; x++)
      if (tileState[y][x] == " ")
        return;
  
  endGame("It was a tie...");
}

function endGame(phrase) {
  gameEnded = true;
  setMap(map`
111
111
111`);
  addText(phrase, {y:7, color: color`2`});
}

onInput("w", () => {
  if (gameEnded == false)
    getFirst(cursor).y -= 1;
});

onInput("a", () => {
  if (gameEnded == false)
    getFirst(cursor).x -= 1;
});

onInput("s", () => {
  if (gameEnded == false)
    getFirst(cursor).y += 1;
});

onInput("d", () => {
  if (gameEnded == false)
    getFirst(cursor).x += 1;
});

onInput("i", () => {
  if (gameEnded || tileState[getFirst(cursor).y][getFirst(cursor).x] != " ")
    return;
  
  const mappedChar = (isPlayer ? "X" : "O");
  
  addSprite(getFirst(cursor).x, getFirst(cursor).y, mappedChar);
  tileState[getFirst(cursor).y][getFirst(cursor).x] = mappedChar;

  checkWin();
  checkTie();
  
  isPlayer = !isPlayer;
});


function getRandomEmptyTile() {
  const emptyTiles = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (tileState[y][x] === " ") {
        emptyTiles.push({ x, y });
      }
    }
  }
  if (emptyTiles.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomIndex];
}
function computerTurn() {
  if (gameEnded || isPlayer) {
    return;
  }

  const emptyTile = getRandomEmptyTile();
  if (emptyTile) {
    const mappedChar = isPlayer ? "X" : "O";
    addSprite(emptyTile.x, emptyTile.y, mappedChar);
    tileState[emptyTile.y][emptyTile.x] = mappedChar;

    checkWin();
    checkTie();

    isPlayer = !isPlayer;
  }
}



setInterval(computerTurn, 1);


