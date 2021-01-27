import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ContentBody from '../../components/ContentBody';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { classes } from './styles';
import List from './List';
import Button from '@material-ui/core/Button';
import history from 'services/history';
import { Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import { clearChallengeRedux } from 'store/modules/desafio/actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function create() {
  history.push({ pathname: '/criarConteudo', start: moment(new Date()) });
}
function createWarning() {
  history.push({ pathname: '/criarAviso', start: moment(new Date()) });
}

export default function IconLabelTabs() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ContentBody title="Desafios">
      <Paper square>
        <AppBar position="static" style={{ backgroundColor: 'transparent' }}>
          <Toolbar style={{ backgroundColor: 'transparent', display: 'flex' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              centered
              indicatorColor="primary"
            >
              <Tab
                icon={false}
                label="Todos"
                {...a11yProps(0)}
                style={classes.select}
              />
              <Tab
                icon={false}
                label="Não Agendados"
                {...a11yProps(1)}
                style={classes.select}
              />
              <Tab
                icon={false}
                label="Agendados"
                {...a11yProps(2)}
                style={classes.select}
              />
              <Tab
                icon={false}
                label="Finalizados"
                {...a11yProps(3)}
                style={classes.select}
              />
            </Tabs>
            <div style={classes.divInputbuscar}>
              <IconButton
                type="submit"
                style={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                style={classes.inputSearch}
                placeholder="Buscar"
                type="search"
                onChange={async event => {
                  if (event.target.value.length === 0) {
                    setSearch('');
                  } else {
                    await setSearch(event.target.value);
                  }
                }}
              />
            </div>
            <div style={classes.divBtnCriar}>
              <Button
                variant="outlined"
                color="primary"
                style={classes.btnCriarAviso}
                onClick={() => {
                  dispatch(clearChallengeRedux());
                  createWarning();
                }}
              >
                CRIAR AVISO
              </Button>
            </div>
            <div style={classes.divBtnCriar}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={classes.btnCriar}
                onClick={() => {
                  dispatch(clearChallengeRedux());
                  create();
                }}
              >
                CRIAR DESAFIO
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Divider />
        <TabPanel value={value} index={0}>
          <List status="all" search={search} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List status="draft" search={search} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List status="active" search={search} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <List status="finished" search={search} />
        </TabPanel>
      </Paper>
    </ContentBody>
  );
}
