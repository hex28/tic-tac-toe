import React, {Component} from 'react';

const sliceGridBy3 = (grid) => {
  let gridArr = [];
  let groupedItems = [];
  let count = 0;
  for (var i = 0; i < grid.length; i++) {
    groupedItems.push(grid[i]);
    count++;
    if (count === 3) {
      gridArr.push(groupedItems);
      count = 0;
      groupedItems = [];
    }
  }
  return gridArr
}

const createBorder = (id) => {
  let borderStyle = '4px solid #000'
  let border;
  switch (id) {
    case 0:
      border = {borderRight: borderStyle}
      break;
    case 1:
      border = {borderRight: borderStyle}
      break;
    case 2:
      border = {border: 'none'}
      break;
    case 3:
      border = {borderTop: borderStyle, borderRight: borderStyle}
      break;
    case 4:
      border = {borderTop: borderStyle, borderRight: borderStyle}
      break;
    case 5:
      border = {borderTop: borderStyle}
      break;
    case 6:
      border = {borderTop: borderStyle, borderRight: borderStyle}
      break;
    case 7:
      border = {borderTop: borderStyle, borderRight: borderStyle}
      break;
    case 8:
      border = {borderTop: borderStyle}
      break;
    default:

  }

  return border
}

class TicTacToe extends Component {

  state = {
    grid: [
        {id: 0, value: ''},
        {id: 1, value: ''},
        {id: 2, value: ''},
        {id: 3, value: ''},
        {id: 4, value: ''},
        {id: 5, value: ''},
        {id: 6, value: ''},
        {id: 7, value: ''},
        {id: 8, value: ''}
    ],
    ai: '',
    player: ''
  }

  componentDidMount(){
    let player, ai;
    let coinFlip = Math.floor(Math.random() * 2)
    player = coinFlip > 0 ? 'x' : 'o'
    ai = player === 'x' ? 'o' : 'x'
    this.setState({
      player: player,
      ai: ai,
    })
  }

  checkWin(grid, player){
    const winObj = []
    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (var i = 0; i < grid.length; i++) {
      if (grid[i].value === player) {
        winObj.push(grid[i].id)
      }
    }

    let count = 0;
    for (var i = 0; i < winningCombinations.length; i++) {
      for (var j = 0; j < winObj.length; j++) {
        if (winningCombinations[i].includes(winObj[j])){
          count++;
        }
      }
      if (count === 3){
        return true;
      }
      count = 0;
    }

    return false;

  }

  addXO = (id, player) => {
    const grid = this.state.grid
    if (grid[id].value === ''){
      grid[id].value = this.state[player]
      const win = this.checkWin(grid, this.state[player])
      this.setState({
        grid: grid
      }, ()=>{
        if (!win){
          let i = this.findEmptySpot()
          if (i !== null){
            if (player !== 'ai'){
              this.addXO(i, 'ai')
            }
          } else {
            setTimeout(()=>{
              alert('draw')
              this.reset()
            }, 100)
          }
        }
      })
      if (win){
        setTimeout(()=>{
          if (player === 'player'){
            this.props.handleScore(1)
          }
          alert(
            (player === 'player') ? 'You won!' : 'You lost!'
          )
          this.reset()
        }, 100)
        return
      }
    }
  }

  findEmptySpot = () => {
    const grid = this.state.grid
    const emptySpotsDivisibleBy2 = []
    const emptySpots = []
    for (var i = 0; i < grid.length; i++) {
      if (i % 2 === 0 && grid[i].value === ''){
        emptySpotsDivisibleBy2.push(grid[i].id)
      }
      if (i % 2 !== 0 && grid[i].value === '') {
        emptySpots.push(grid[i].id)
      }
    }
    if (emptySpotsDivisibleBy2.length > 0){
      let index = Math.floor(Math.random() * emptySpotsDivisibleBy2.length)
      return grid[emptySpotsDivisibleBy2[index]].id
    }
    if (emptySpots.length > 0 && emptySpotsDivisibleBy2.length === 0){
      let index = Math.floor(Math.random() * emptySpots.length)
      return grid[emptySpots[index]].id
    } else {
      return null
    }
  }

  reset = () => {
    let player, ai;
    let coinFlip = Math.floor(Math.random() * 2)
    player = coinFlip > 0 ? 'x' : 'o'
    ai = player === 'x' ? 'o' : 'x'
    this.setState({
      grid: this.state.grid.map(i => {
        i.value = ''
        return i
      }),
      player: player,
      ai: ai
    })
  }

  render () {

    const { grid, player, ai } = this.state

    return (
      <div className="margin-center text-center mb-4">
        <div className="w-2/5 margin-center rounded overflow-hidden shadow-lg mt-2 mb-2">
          <div className="w-4/5 margin-center px-6 py-4">
            <div className="font-bold text-4xl mb-2">{'Tic Tac Toe'}</div>
            {
              sliceGridBy3(grid).map(row=>
                <div className="flex h-32">
                  {
                    row.map(box =>
                      <div
                        className={
                          box.value === player ?
                          "w-1/3 xo cursor-pointer text-red-500 hover:bg-gray-200"
                          :
                          "w-1/3 xo cursor-pointer hover:bg-gray-200"
                        }
                        style={createBorder(box.id)}
                        onClick={ ()=>{ this.addXO(box.id, 'player') } }
                        >{box.value}</div>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
};


export default TicTacToe;
