import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import acorn from '../images/Acorn.png'
import pulsar from '../images/Pulsar.png'
import penta_decathlon from '../images/Penta-Decathlon.png'
import the_r_pentomino from '../images/The_R-Pentomino.png'
import diehard from '../images/Diehard.png'

import {Card, Image, Button, Input, Icon} from 'semantic-ui-react'

// this is better than checking with an if statement and incrementing neighbors based off of position --- keeps our code DRY
// [0, 0] is the alive cell we are checking
const operations = [
  [0, 1], // right of [0, 0]
  [0, -1], // left of [0, 0]
  [1, -1], // bottom left diagonal of [0, 0]
  [-1, 1], // top right diagonal of [0, 0]
  [1, 1], // bottom right diagonal of [0, 0]
  [-1, -1], // top left diagonal of [0, 0]
  [1, 0], // bottom of [0, 0]
  [-1, 0] // top of [0, 0]
]

// initialize an empty grid - will also use this for reset button later

const Game = () => {
  const [size, setSize] = useState({ numRows: 33, numCols: 26})

  const generateGrid = () => {
      const rows = [];
      // create rows of all dead cells
      for (let i = 0; i < size.numRows; i++){
        rows.push(Array.from(Array(size.numCols), () => 0))
      }
      return rows;
    }

  const [generation, setGeneration] = useState(0);
  const [grid, setGrid] = useState(generateGrid())
  const [speed, setSpeed] = useState(1000)
  const speedRef = useRef(speed);
  speedRef.current = speed; 
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running


  // this is where the cells come to life
  // we don't want the function to be recreated every render so we use callback
  // since we are only creating this function once and trying to access the running value in state, we must create a reference to that value to make sure we have the current state information
  const runSimulation = useCallback(() => {
    // this is kind of like a recursive function
    // so this is our base case
    if (!runningRef.current) {
      return
    }
    //g is current value of the grid.. we want to return new value in produce function
    //we can mutate the gridcopy
    setGrid(g => {
      return produce(g, gridCopy => {
        // going over every cell in the grid so we can apply the rules to each cell
        for (let i = 0; i < size.numRows; i++){
          for(let j = 0; j < size.numCols; j++){
            //computing how many neighbors there are and then what to do with it
            let neighbors = 0;
            //made operations array so we can check neighbors more efficiently, keeping code DRY
            operations.forEach(([x, y]) => {
              //compute new i
              const newI = i + x;
              //compute new j
              const newJ = j + y;
              //checking the bounds of our grid
              if (newI >= 0 && newI < size.numRows && newJ >= 0 && newJ < size.numCols) {
                //computing # neighbors
                neighbors += g[newI][newJ]
              }
            })
            //now that we know what neighbors exist -
            //here are our rules being applied to the cell and its neighbors
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    })
    //this is what updates our generation count 
    setGeneration((prev) => {
      const next = prev + 1;
      return next;
    })
    // depending on speed every 1000ms or whatever it is - do a state update
    setTimeout(runSimulation, speedRef.current)
  }, [size.numRows, size.numCols])


  // const Blinker = () => {
  //   let grid = generateGrid()
  //   grid[12][12] = 1
  //   grid[12][13] = 1
  //   grid[12][14] = 1
  //   setGrid(grid)
  // }

  // const Toad = () => {
  //   let grid = generateGrid()
  //   grid[12][12] = 1
  //   grid[12][13] = 1
  //   grid[12][14] = 1
  //   grid[13][11] = 1
  //   grid[13][12] = 1
  //   grid[13][13] = 1
  //   setGrid(grid)
  // }

  // const Beacon = () => {
  //   let grid = generateGrid()
  //   grid[10][11] = 1
  //   grid[10][12] = 1
  //   grid[11][11] = 1
  //   grid[11][12] = 1
  //   grid[12][13] = 1
  //   grid[12][14] = 1
  //   grid[13][13] = 1
  //   grid[13][14] = 1
  //   setGrid(grid)
  // }

  // const Glider = () => {
  //   let grid = generateGrid()
  //   grid[0][0] = 1
  //   grid[1][1] = 1
  //   grid[1][2] = 1
  //   grid[2][0] = 1
  //   grid[2][1] = 1
  //   setGrid(grid)
  // }

  const Pulsar = () => {
    let grid = generateGrid()
    grid[10][8] = 1
    grid[10][9] = 1
    grid[10][10] = 1
    grid[12][6] = 1
    grid[13][6] = 1
    grid[14][6] = 1
    grid[12][11] = 1
    grid[13][11] = 1
    grid[14][11] = 1
    grid[15][8] = 1
    grid[15][9] = 1
    grid[15][10] = 1
    grid[10][14] = 1
    grid[10][15] = 1
    grid[10][16] = 1
    grid[12][18] = 1
    grid[13][18] = 1
    grid[14][18] = 1
    grid[18][18] = 1
    grid[19][18] = 1
    grid[20][18] = 1
    grid[22][14] = 1
    grid[22][15] = 1
    grid[22][16] = 1
    grid[22][8] = 1
    grid[22][9] = 1
    grid[22][10] = 1
    grid[18][6] = 1
    grid[19][6] = 1
    grid[20][6] = 1
    grid[12][13] = 1
    grid[13][13] = 1
    grid[14][13] = 1
    grid[15][14] = 1
    grid[15][15] = 1
    grid[15][16] = 1
    grid[18][11] = 1
    grid[19][11] = 1
    grid[20][11] = 1
    grid[17][8] = 1
    grid[17][9] = 1
    grid[17][10] = 1
    grid[18][13] = 1
    grid[19][13] = 1
    grid[20][13] = 1
    grid[17][14] = 1
    grid[17][15] = 1
    grid[17][16] = 1
    setGrid(grid)
  }

  const Penta_Decathlon = () => {
    let grid = generateGrid()
    grid[16][8] = 1
    grid[16][9] = 1
    grid[15][10] = 1
    grid[17][10] = 1
    grid[16][11] = 1
    grid[16][12] = 1
    grid[16][13] = 1
    grid[16][14] = 1
    grid[15][15] = 1
    grid[17][15] = 1
    grid[16][16] = 1
    grid[16][17] = 1
    setGrid(grid)
  }

  const The_R_Pentomino = () => {
    let grid = generateGrid()
    grid[15][12] = 1
    grid[16][12] = 1
    grid[17][12] = 1
    grid[16][11] = 1
    grid[15][13] = 1
    setGrid(grid)
  }
  
  const Diehard = () => {
    let grid = generateGrid()
    grid[16][9] = 1
    grid[16][10] = 1
    grid[17][10] = 1
    grid[17][14] = 1
    grid[15][15] = 1
    grid[17][15] = 1
    grid[17][16] = 1
    setGrid(grid)
  }

  const Acorn = () => {
    let grid = generateGrid()
    grid[15][10] = 1
    grid[16][12] = 1
    grid[17][13] = 1
    grid[17][14] = 1
    grid[17][15] = 1
    grid[17][9] = 1
    grid[17][10] = 1
    setGrid(grid)
  }
  if (speed === ""){
    setSpeed(1000)
  }
  return (
    <>
      <div className="game">
        <span><h2>Generation: #{generation}</h2>
        <Input placeholder={`Enter speed in ms. Current: ${speed}ms`} icon="fast forward" iconPosition="left" type="input" onChange={e => setSpeed(e.target.value)} />
        </span>
        {/* the styling here makes it to where it displays as an actual grid */}
        <div className="grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size.numCols}, 20px)`,
          gridTemplateRows: `repeat(${size.numRows}, 20px)`
        }}>
          {/* displaying the rows
              adding an onclick to each cell so that if you click it you can toggle the cell between dead and alive states*/}
          {grid.map((rows, i) => 
            rows.map((col, j) => (
              <div  
                className="cells"
                key={`${i}-${j}`}
                onClick={() => {
                  // don't want to mutate the state value so we are using the immer library and the produce function
                  //we can alter gridcopy in any way we want
                  const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                  })
                  setGrid(newGrid)
                }}
                style={{
                  width: '21px',
                  height: '21px',
                  backgroundColor: grid[i][j] ? `${'#'+Math.floor(Math.random()*16777215).toString(16)}` : '#FFF',
                  // border: '1px solid black'
                }} 
              />
            ))
          )}
        </div>
        <Button.Group>
          <Button
            color="black" 
            className="purple-btn"
            onClick={() => {
              setRunning(!running);
              if (!running){
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? 'Pause' : 'Start'}
          </Button>
          <Button
            color="black" 
            className="reset-btn purple-btn"
            onClick={() => {
              setGrid(generateGrid())
              setGeneration(0)
            }}>
            Reset
          </Button>
          <Button
            color="black" 
            className="purple-btn"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < size.numRows; i++){
                rows.push(Array.from(Array(size.numCols), () => Math.random() > .7 ? 1 : 0))
              }
              setGrid(rows);
            }}>
            Randomize
          </Button>
        </Button.Group>
        
        {/* <button onClick={Blinker}>Blinker</button>
        <button onClick={Toad}>Toad</button>
        <button onClick={Beacon}>Beacon</button>
        <button onClick={Glider}>Glider</button> */}
      </div>
      <div className="presets">
        <Card color="red">
          <Image src={pulsar} alt="Pulsar" wrapped ui={false} />
          <Button color="black" className="red-btn" onClick={Pulsar}>Pulsar</Button>
        </Card>
        <Card color="orange">
          <Image src={penta_decathlon} alt="Penta-Decathlon" wrapped ui={false} />
          <Button color="black" className="orange-btn" onClick={Penta_Decathlon}>Penta-Decathlon</Button>
        </Card>
        <Card color="green">
          <Image src={the_r_pentomino} alt="The R-Pentomino" wrapped ui={false} />
          <Button color="black" className="green-btn" onClick={The_R_Pentomino}>The R-Pentomino</Button>
        </Card>
        <Card color="teal">
          <Image src={diehard} alt="Diehard" wrapped ui={false} />
          <Button color="black" className="teal-btn" onClick={Diehard}>Diehard</Button>
        </Card>
        <Card color="purple">
          <Image src={acorn} alt="Acorn" wrapped ui={false} />
          <Button color="black" className="purple-btn" onClick={Acorn}>Acorn</Button>
        </Card>
      </div>
    </>
  );
}

export default Game;