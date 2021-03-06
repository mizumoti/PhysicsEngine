import React from 'react'
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import CheckBox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'

class BoxTabPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lotation: props.boxConfig.initialLotation.map(l => l * 180 / Math.PI),
      position: props.boxConfig.initialPosition.slice(),
      velocity: props.boxConfig.initialVelocity.map(v => v / props.boxConfig.standardVelocity),
      lotVelocity: props.boxConfig.initialLotVelocity.map(lv => lv / props.boxConfig.standardLotVelocity),
      fixed: props.boxConfig.fixed,
      size: props.boxConfig.size,
      error: {
        velocity: [false, false, false],
        lotVelocity: [false, false, false],
        size: [false, false, false],
      },
    }
  }

  NumberRegExpPattern = /^-?[0-9]+(.[0-9]+)?$/

  handleBoxLotationSliderChange = (i) => (event, newValue) => {
    const newLotation = this.state.lotation.slice()
    newLotation[i] = newValue
    this.setState({ lotation: newLotation })

    const box = Object.assign({}, this.props.box)
    box.lotation[i] = newValue * Math.PI / 180.0
    this.props.updateBox(this.props.index, box)
  }

  handleBoxLotationSliderCommit = (i) => (event, newValue) => {
    const boxConfig = Object.assign({}, this.props.boxConfig)
    boxConfig.initialLotation[i] = newValue * Math.PI / 180.0
    this.props.updateBoxConfig(this.props.index, boxConfig)
  }

  handleBoxLotationInputChange = (i) => (event) => {
    const newValue = event.target.value

    if (isFinite(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.lotation[i] = Number(newValue * Math.PI / 180.0)
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialLotation[i] = Number(newValue * Math.PI / 180.0)
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)
    }
  }

  handleBoxPositionSliderChange = (i) => (event, newValue) => {
    const newPosition = this.state.position.slice()
    newPosition[i] = newValue
    this.setState({ position: newPosition })

    const box = Object.assign({}, this.props.box)
    box.position[i] = newValue
    this.props.updateBox(this.props.index, box)
  }

  handleBoxPositionSliderCommit = (i) => (event, newValue) => {
    const boxConfig = Object.assign({}, this.props.boxConfig)
    boxConfig.initialPosition[i] = newValue
    this.props.updateBoxConfig(this.props.index, boxConfig)
  }

  handleBoxPositionInputChange = (i) => (event) => {
    const newValue = event.target.value

    if (isFinite(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.position[i] = Number(newValue)
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialPosition[i] = Number(newValue)
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)
    }
  }

  handleBoxVelocityInputChange = (i) => (event) => {
    const newValue = event.target.value

    if (this.NumberRegExpPattern.test(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.velocity[i] = Number(newValue) * this.props.boxConfig.standardVelocity
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialVelocity[i] = Number(newValue) * this.props.boxConfig.standardVelocity
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)

      const velocity = Object.assign([], this.state.velocity)
      velocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.velocity[i] = false
      this.setState({ velocity: velocity, error: error })
    } else {
      const velocity = Object.assign([], this.state.velocity)
      velocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.velocity[i] = true
      this.setState({ velocity: velocity, error: error })
    }
  }

  handleBoxLotVelocityInputChange = (i) => (event) => {
    const newValue = event.target.value

    if (this.NumberRegExpPattern.test(newValue)) {
      const box = Object.assign({}, this.props.box)
      box.lotVelocity[i] = Number(newValue) * this.props.boxConfig.standardLotVelocity
      const boxConfig = Object.assign({}, this.props.boxConfig)
      boxConfig.initialLotVelocity[i] = Number(newValue) * this.props.boxConfig.standardLotVelocity
      this.props.updateBox(this.props.index, box)
      this.props.updateBoxConfig(this.props.index, boxConfig)

      const lotVelocity = Object.assign([], this.state.lotVelocity)
      lotVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.lotVelocity[i] = false
      this.setState({ lotVelocity: lotVelocity, error: error })
    } else {
      const lotVelocity = Object.assign([], this.state.lotVelocity)
      lotVelocity[i] = newValue
      const error = Object.assign({}, this.state.error)
      error.lotVelocity[i] = true
      this.setState({ lotVelocity: lotVelocity, error: error })
    }
  }

  handleFixCheck = (event) => {
    const newValue = event.target.checked

    this.setState({ fixed: newValue })

    const boxConfig = Object.assign({}, this.props.boxConfig)
    boxConfig.fixed = newValue
    this.props.updateBoxConfig(this.props.index, boxConfig)
  }

  render() {
    const { showTabIndex, index } = this.props

    if (showTabIndex !== index) { return <div hidden={true} ></div>}

    return (
      <div style={{backgroundColor: '#444', marginRight: 5, marginLeft: 5, border: 'solid', borderWidth: 2, borderColor: '#222'}}>
        <Box p={3}>
          Lotation
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    min={0}
                    max={90}
                    value={this.state.lotation[i]}
                    onChangeCommitted={this.handleBoxLotationSliderCommit(i)}
                    onChange={this.handleBoxLotationSliderChange(i)}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value={this.state.lotation[i]}
                    onChange={this.handleBoxLotationInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Position
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    min={-3.0}
                    max={3.0}
                    step={0.1}
                    value={this.state.position[i]}
                    onChangeCommitted={this.handleBoxPositionSliderCommit(i)}
                    onChange={this.handleBoxPositionSliderChange(i)}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value={this.state.position[i]}
                    onChange={this.handleBoxPositionInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Velocity
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs>
                  <TextField
                    error={this.state.error.velocity[i]}
                    helperText={this.state.error.velocity[i] ? 'only number' : ''}
                    value={this.state.velocity[i]}
                    onChange={this.handleBoxVelocityInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Angular Velocity
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={1}>
                  {label}
                </Grid>
                <Grid item xs>
                  <TextField
                    error={this.state.error.lotVelocity[i]}
                    helperText={this.state.error.lotVelocity[i] ? 'only number' : ''}
                    value={this.state.lotVelocity[i]}
                    onChange={this.handleBoxLotVelocityInputChange(i)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          Size
          {['x', 'y', 'z'].map((label, i) => {
            return (
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  {label}
                </Grid>
                <Grid item>
                  <TextField
                    error={this.state.error.size[i]}
                    helperText={this.state.error.size[i] ? 'only number' : ''}
                    label="read only"
                    InputProps={{ readOnly: true }}
                    value={this.state.size[i]}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Box>
        <Box p={3}>
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <CheckBox
                color="primary"
                checked={this.state.fixed}
                onChange={this.handleFixCheck}
              />
            </Grid>
            <Grid item xs>
              fix this Object
            </Grid>
          </Grid>
        </Box>
      </div>
    )
  }
}

export default BoxTabPanel
