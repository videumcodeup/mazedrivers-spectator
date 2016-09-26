import React, { Component, PropTypes } from 'react'
// import './HostDetailsForm.css'

class HostDetailsForm extends Component {
  constructor (props) {
    super(props)

    const { host, port } = this.props.initialValues
    this.state = { host, port }

    this.onSubmit = this.onSubmit.bind(this)

    this.onChange = [
      'host', 'port'
    ].reduce((result, name) => ({
      ...result,
      [name]: (event) => {
        this.setState({ [name]: event.target.value })
      }
    }), {})
  }

  onSubmit (event) {
    event.preventDefault()
    const values = this.state
    this.props.onSubmit(values)
  }

  render () {
    return (
      <form
        className='HostDetailsForm'
        name='hostDetailsForm'
        onSubmit={this.onSubmit}
      >
        ws://
        <input
          type='text'
          name='host'
          value={this.state.host}
          onChange={this.onChange['host']}
        />
        <input
          type='text'
          name='port'
          value={this.state.port}
          onChange={this.onChange['port']}
        />
        <button
          type='submit'
        >
          Save
        </button>
      </form>
    )
  }
}

HostDetailsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default HostDetailsForm
