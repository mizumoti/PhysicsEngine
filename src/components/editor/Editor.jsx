import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, createStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import BoxTabPanel from './BoxTabPanel'
import GeneralSettingsTabPanel from './GeneralSettingsTabPanel'

export default function Editor(props) {
  const {
    boxes,
    boxConfigs,
    generalConfig,
    addBox,
    updateBox,
    updateBoxConfig,
    updateGeneralConfig,
  } = props

  const [tabIndex, setTabIndex] = useState(0)

  const useStyles = makeStyles(theme => createStyles({
    button: {
      margin: 10,
    },
    tab: {
      backgroundColor: '#222',
      margin: 5,
      marginBottom: 0,
    },
  }))

  const classes = useStyles()

  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  })

  const handleChangeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex)
  }

  return(
    <div>
      <ThemeProvider theme={theme} >
        <Button variant="outlined" color="primary" className={classes.button} onClick={addBox} >
          new Box
        </Button>
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="tabs"
          className={classes.tab}
        >
          {boxConfigs.map((_, i) => <Tab label={`box ${i}`} />)}
          <Tab label='Genaral' />
        </Tabs>
        {boxConfigs.map((boxConfig, i) => (
          <BoxTabPanel
            box={boxes[i]}
            boxConfig={boxConfig}
            updateBox={updateBox}
            updateBoxConfig={updateBoxConfig}
            showTabIndex={tabIndex}
            index={i}
          />
        ))}
        <GeneralSettingsTabPanel
          generalConfig={generalConfig}
          updateGeneralConfig={updateGeneralConfig}
          showTabIndex={tabIndex}
          index={boxConfigs.length}
        />
      </ThemeProvider>
    </div>
  )
}
