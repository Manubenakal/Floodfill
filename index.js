// isValid function
function isValid(screen, m, n, x, y, prevC, newC) {
  if (
    x < 0 ||
    x >= m ||
    y < 0 ||
    y >= n ||
    screen[x][y] != prevC ||
    screen[x][y] == newC
  )
    return false;
  return true;
}
// FloodFill function
function floodFill(screen, m, n, x, y, prevC, newC) {
  let queue = [];
  queue.push([x, y]);
  if (newC == undefined) {
    newC = prevC;
  }
  screen[x][y] = newC;
  while (queue.length > 0) {
    currPixel = queue[queue.length - 1];
    queue.pop();
    let posX = currPixel[0];
    let posY = currPixel[1];
    if (isValid(screen, m, n, posX + 1, posY, prevC, newC)) {
      screen[posX + 1][posY] = newC;
      queue.push([posX + 1, posY]);
    }
    if (isValid(screen, m, n, posX - 1, posY, prevC, newC)) {
      screen[posX - 1][posY] = newC;
      queue.push([posX - 1, posY]);
    }
    if (isValid(screen, m, n, posX, posY + 1, prevC, newC)) {
      screen[posX][posY + 1] = newC;
      queue.push([posX, posY + 1]);
    }
    if (isValid(screen, m, n, posX, posY - 1, prevC, newC)) {
      screen[posX][posY - 1] = newC;
      queue.push([posX, posY - 1]);
    }
  }
}

//various colors mapped to certain numbers
const colors = new Map([
  [0, 'purple'],
  [1, 'yellow'],
  [2, 'red'],
  [3, 'orange'],
  [4, 'green'],
  [5, 'blue'],
  [6, 'pink'],
  [7, 'brown'],
  [8, 'magenta'],
  [9, 'grey'],
]);

//matrix value
let screen = [
  [2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
  [2, 2, 2, 2, 3, 3, 3, 3, 8, 8],
  [2, 2, 2, 2, 3, 3, 3, 3, 8, 8],
  [2, 2, 2, 2, 3, 3, 3, 3, 8, 8],
  [4, 2, 2, 5, 5, 5, 5, 5, 8, 8],
  [4, 2, 2, 5, 5, 5, 5, 5, 8, 8],
  [4, 2, 2, 5, 5, 5, 5, 5, 8, 8],
  [4, 2, 2, 5, 5, 5, 5, 5, 8, 8],
  [4, 4, 4, 4, 4, 0, 0, 0, 0, 0],
  [4, 4, 4, 4, 4, 0, 0, 0, 0, 0],
];

// Row of the display
let m = screen.length;

// Column of the display
let n = screen[0].length;

//defining required variables
let x, y, prevC, newC, res0, res1, res2, res3;

//matrix represented in table with initial values and corresponding colors
document.write("<table id='myTable'>");
for (let i = 0; i < m; i++) {
  document.write('<tr>');
  for (var j = 0; j < n; j++) {
    var col = colors.get(screen[i][j]);
    document.write('<td style="background-color:' + col + '">' + '</td>');
  }
  document.write('</tr>');
}
document.write('</table>');

//Indicating sentence for Row and Column of matrix table
document.write("<div id='message'></div>");
$('#myTable tr').each(function (r) {
  var row = r;
  $('td', this).each(function (d) {
    var cell = d;
    $(this)
      .data('rowIndex', row)
      .data('cellIndex', cell)
      .click(function () {
        $('#message').text(
          'Row-Index is: ' +
            $(this).data('rowIndex') +
            ' and Cell-Index is: ' +
            $(this).data('cellIndex')
        );
        res1 = $(this).data('rowIndex');
        res2 = $(this).data('cellIndex');
        x = res1;
        y = res2;
        prevC = screen[x][y];
      });
  });
});

document.write('</br></br></br>'); //line breaks

//matrix represented in table for 10 colors
document.write("<table  id='myTable1'><tr>");
for (let i = 0; i < 10; i++) {
  var col = colors.get(i);
  document.write('<td style="background-color:' + col + '">' + '</td>');
}
document.write('</tr></table>');

//Indicating sentence for Row and Column of color panel
document.write("<div id='message1'></div>");
$('#myTable1 tr').each(function (r) {
  var row = r;
  $('td', this).each(function (d) {
    var cell = d;
    $(this)
      .data('rowIndex', row)
      .data('cellIndex', cell)
      .click(function () {
        $('#message1').text(
          'Row-Index is: ' +
            $(this).data('rowIndex') +
            ' and Cell-Index is: ' +
            $(this).data('cellIndex')
        );
        res0 = $(this).data('rowIndex');
        res3 = $(this).data('cellIndex');
        newC = res3;
      });
  });
});

//button to view the result after selecting matrix position and color
document.write('<button onclick="result()">Result</button>');

//on clicking result button this fuction is called
function result() {
  //floof fill function call
  floodFill(screen, m, n, x, y, prevC, newC);

  document.write('<h1>RESULT</h1>');
  document.write('</br>'); //line breaks

  //matrix represented in table with resultant values and corresponding colors
  document.write('<table >');
  for (let i = 0; i < m; i++) {
    document.write('<tr>');
    for (var j = 0; j < n; j++) {
      var col = colors.get(screen[i][j]);
      document.write('<td style="background-color:' + col + '">' + '</td>');
    }
    document.write('</tr>');
  }
  document.write('</table>');

  //button to reload the page
  document.write('<button onclick="location.reload();">Return</button>');

  $('body').addClass('body').css({
    'text-align': 'center',
    background:
      'linear-gradient(0deg, rgba(160,232,244,1) 14%, rgba(234,154,243,1) 94%)',
  });
  $('table').addClass('table2').css({
    'border-spacing': 0,
    'margin-left': 'auto',
    'margin-right': 'auto',
  });
  $('td').addClass('td').css({
    padding: '10px 20px',
    border: '1px solid',
  });
  $('button').addClass('button').css({
    position: 'relative',
    'background-color': 'cyan',
    color: 'black',
    border: '1px solid black',
    'border-radius': '10px',
    padding: '15px',
    margin: '15px',
    'min-height': '30px',
    'min-width': '120px',
  });
}
