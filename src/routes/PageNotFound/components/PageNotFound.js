import React, { Component } from 'react'
import NotFoundImage from '../assets/404.jpg'
import classes from './PageNotFound.scss'
import { withRouter } from 'react-router'

class PageNotFound extends Component {
  render () {
    const props = this.props
    return (
      <div className={classes.container}>
        <h1>Page not found!!!</h1>
      </div>
    )
  }
}

PageNotFound.propTypes = {
  router: React.PropTypes.object.isRequired
}

export default withRouter(PageNotFound)
