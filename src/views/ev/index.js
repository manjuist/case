/**
 * name: 模块功能
 * author: Deve
 * date: 2020-09-23
 */
import React from 'react'
import './index.scss'

export default class App extends React.Component {
    componentDidMount() {
        document.getElementById('inner').addEventListener('click', () => {
            console.log('D: native inner click')
        })
        document.getElementById('outer').addEventListener('click', () => {
            console.log('C: native outer click')
        })
        document.getElementById('mid').addEventListener('click', () => {
            console.log('F: native mid click')
        })
    }

 innerClick = () => {
     console.log('A: react inner click.')
     // e.stopPropagation()
 }

 midClick = (e) => {
     console.log('E: react mid click.')
     e.stopPropagation()
 }

 outerClick = () => {
     console.log('B: react outer click.')
 }

  innerKeyUp = () => {
      console.log('G: react inner key up.')
  }

  render() {
      return (
          <div
              role="button"
              tabIndex={-1}
              onKeyUp={() => {}}
              id="outer"
              onClick={this.outerClick}
          >
              <div
                  role="button"
                  tabIndex={-1}
                  onKeyUp={() => {}}
                  id="mid"
                  onClick={this.midClick}
              >
                  <button id="inner" onClick={this.innerClick} onKeyUp={this.innerKeyUp}>
                      BUTTON
                  </button>
              </div>
          </div>
      )
  }
}
