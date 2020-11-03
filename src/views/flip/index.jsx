import React from 'react';

class FLIP extends React.Component {
    state = {
        list: [1]
    }

    componentDidMount(){
        this.updateItemInfo()
        document
            .querySelector('body')
            .addEventListener('click', () => { console.log('o b') }, true)
        document
            .querySelector('#root')
            .addEventListener('click', () => { console.log('o r') }, true)
    }

    listRef = React.createRef()

    updateItemInfo = () => {
        const { listRef } = this
        const listItem = listRef.current.children
        console.log(listItem)
    }

  inner=() => {
      console.log('r i')
  }
  outer=() => {
      console.log('r o')
  }

  render(){
      const { list } = this.state
      const { inner, outer } = this
      return (
          <div ref={this.listRef}>
              <div
                  role="button"
                  tabIndex={-1}
                  onKeyUp={() => {}}
                  className="outer" 
                  onClick={outer}
              >111
                  <div
                      role="button"
                      tabIndex={-1}
                      onKeyUp={() => {}}
                      className="inner"
                      onClick={inner}
                  >
                      222
                  </div>
              </div>
              {
                  list.map((cur, ind) => (
                      <div key={ind}>
                          <div>{cur}</div>
                          <div>del</div>
                      </div>
                  ))
              }
          </div>
      )
  }
}

export default FLIP
