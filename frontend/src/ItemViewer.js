import React from 'react'
import Item from './Item'

class ItemViewer extends React.Component {
  

  generateCards() {
    return( this.props.items.map( (anItem, index) => {
            console.log(anItem)
            return (<Item key={index} item={anItem} />)
          })
    )
  }


  render() {
    return(
      <div>
        {this.generateCards()}
      </div>
  )}

}

export default ItemViewer