import React, {useState} from 'react'
import {Accordion, Icon} from 'semantic-ui-react'

const Rules = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e) => {
    e.preventDefault()
    if (activeIndex === 0){
      setActiveIndex(1)
    } else{
      setActiveIndex(0)
    }
  }
  return(
    <>
      <Accordion className="rules" fluid styled>
          <Accordion.Title
            active={activeIndex === 0}
            activeIndex={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            Rules
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
            <ol>
              <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
              <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
              <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
              <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ol>
            <p>These rules, which compare the behavior of the automaton to real life, can be condensed into the following:</p>
            <ol>
              <li>Any live cell with two or three live neighbours survives.</li>
              <li>Any dead cell with three live neighbours becomes a live cell.</li>
              <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
            </ol>
            <p>The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.</p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            activeIndex={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            About
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>For this project I've done a lot of research about turing completeness, what a programming language needs to fundamentally be in order to be turing complete.</p> 
            <p>In order to be turing complete the computer language needs to be able to do everything a turing machine can do. A turing machine is an endless series (as long as it needs to be) of readable/writable 0's and 1's which is powerful enough to compute anything you need it to.</p> 
            <p>Two things are vital in a turing machine. Coniditonal branching and arbitrary memory. There will be if statements assigned to each 0 and each 1.. if it is a 0 do ___ and if it is a 1 do ___. You also need an arbitrary amount of memory, as much as you need for your program to compute what it needs to.</p>
            <p>I think this relates a lot to this project because each cell I've assigned a 0 or a 1.. 0 for dead cells and 1 for live cells. Each cell both dead and alive needs to look to each of its neighbors to know what it needs to do next. I've coded an if statement for the rules specified in this project so each of these 0's and 1's have conditional statements which tell them what to do next.</p>
            <p>What a turing machine does is it starts with a pattern of 0's and 1's and follows the rules from the conditional statements one square at a time transforming that pattern of 0's and 1's into a different pattern of 0's and 1's. Eventually it moves into a halting state where it finishes computing and we are left with the answer to our problem coded up as 0's and 1's.</p>
            <p>It is simple but is the essence of what all modern computers do. Turing complete programs will be our strongest programs, nothing has yet to surpass the capabilities of a turing machine. There may be computers that can do it more efficiently, but none that can do more.</p>
          </Accordion.Content>
        </Accordion>
    </>
  )
}
export default Rules;