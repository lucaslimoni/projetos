import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContentBody from '../../../components/ContentBody';
import { classes, Title, useStyles } from './styles';
import Calendar from './Agendar';
import * as moment from 'moment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { CloseOutlined } from '@material-ui/icons/';
import Atividade from './Atividade';
import Conteudo from './Conteudo';
import Resolucao from './Resolucao';
import {
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
} from '@material-ui/core';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createChallenge,
  updateChallenge,
  listChallenge,
  dateSchandule,
} from '~/store/modules/desafio/actions';
import history from 'services/history';
import { stateAll, conteudo, activity } from 'store/modules/desafio/actions';
import { toast } from 'react-toastify';

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

export default function CriarConteudo(props) {
  const edit = props.location.action === 'edit';
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [btnLabel, setBtnLabel] = useState('Próximo');
  const [startContent, setStartContent] = useState('');
  const [startActivity, setStartActivity] = useState('');
  const [startAnswer, setStartAnswer] = useState('');
  const [start, setStart] = useState('');
  const {
    createChallengeSuccess,
    result,
    conteudoPage,
    titleChallenge,
    activityPages,
    answerPage,
  } = useSelector(state => state.desafio);
  const MuiTabs = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 3) {
      setBtnLabel('Salvar');
    } else {
      setBtnLabel('Próximo');
    }
  };

  useEffect(() => {
    if (createChallengeSuccess) {
      toast.success('Sucesso');
      history.push('/desafios');
    }
  }, [createChallengeSuccess]);

  const challenges = result ? result.docs : [];

  useEffect(() => {
    dispatch(listChallenge({ status: 'active', limit: 100 }));

    props.match.params = {
      ...props.match.params,
      listChallenges: challenges,
    };

    if (edit) {
      if (props.location.start && props.location.editou === true) {
        setStart(props.location.start);
      }

      if (props.location.editou === false) {
        setStart(props.match.params.startContent);
      }
    }
    if (props.match.params.start && !edit) {
      setStart(props.match.params.start);
    }

    if (start) {
      setStartContent(
        moment(start)
          .format('dddd, DD/MM')
          .concat(' às 07:00')
      );
      setStartActivity(
        moment(start)
          .add(4, 'days')
          .format('dddd, DD/MM')
          .concat(' das 09:00 às 22:00')
      );
      setStartAnswer(
        moment(start)
          .add(7, 'days')
          .format('dddd, DD/MM')
          .concat(' às 07:00')
      );
    }
  }, [edit]);

  return (
    <div>
      <ContentBody title={edit ? 'EDITAR DESAFIO' : 'CRIAR DESAFIO'}>
        <Paper square className={MuiTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            indicatorColor="primary"
            className={MuiTabs.tabs}
          >
            <Tab
              className={MuiTabs.tab}
              icon={false}
              label="CONTEÚDO"
              {...a11yProps(0)}
              style={classes.select}
            />
            <Tab
              className={MuiTabs.tab}
              icon={false}
              label="ATIVIDADE"
              {...a11yProps(1)}
              style={classes.select}
            />
            <Tab
              className={MuiTabs.tab}
              icon={false}
              label="RESOLUÇÃO"
              {...a11yProps(2)}
              style={classes.select}
            />
            <Tab
              className={MuiTabs.tab}
              icon={false}
              label="AGENDAR"
              {...a11yProps(3)}
              style={classes.select}
            />
          </Tabs>
          <Divider style={{ paddingBottom: 5 }} />
          <TabPanel style={{ width: '100%' }} value={value} index={0}>
            <Conteudo {...props} />
          </TabPanel>
          <TabPanel style={{ width: '100%' }} value={value} index={1}>
            <Atividade {...props} />
          </TabPanel>
          <TabPanel style={{ width: '100%' }} value={value} index={2}>
            <Resolucao {...props} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Calendar {...props} />
          </TabPanel>
          {(btnLabel === 'Salvar' || btnLabel === 'Alterar') && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#78909C',
              }}
            >
              <div>
                <CalendarTodayIcon style={{ fontSize: 'xx-large' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <div>Conteúdo: {startContent}</div>
                <div>Atividade: {startActivity}</div>
                <div>Resolução: {startAnswer}</div>
              </div>
              <div>
                <>
                  <IconButton
                    style={classes.containerEditorCabecalhoX}
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(dateSchandule(''));
                      if (edit) {
                        setStart('');
                        setStartAnswer('');
                        setStartContent('');
                        setStartActivity('');
                        let newList = challenges.filter(
                          (item, index) =>
                            item.startContent !==
                            props.match.params.startContent
                        );
                        props.match.params.listChallenges = newList;
                        props.match.params.start = '';
                        props.location.start = '';
                        props.location.editou = true;
                      } else {
                        setStart('');
                        setStartAnswer('');
                        setStartContent('');
                        setStartActivity('');
                        let newList = challenges.filter(
                          (item, index) =>
                            item.startContent !==
                            props.match.params.startContent
                        );
                        props.match.params.listChallenges = newList;
                        props.match.params = {
                          ...props.match.params,
                          start: '',
                        };
                      }
                    }}
                  >
                    <CloseOutlined />
                  </IconButton>
                </>
              </div>
            </div>
          )}
          <div style={classes.containerDivButtoms}>
            <Button
              variant="contained"
              style={{
                backgroundColor:
                  !props.match.params.title && !titleChallenge
                    ? '#c2c2c2'
                    : '#3796F6',
                color: '#FFFFFF',
              }}
              disabled={
                !props.match.params.title && !titleChallenge ? true : false
              }
              type="submit"
              onClick={() => {
                if (btnLabel !== 'Salvar' && btnLabel !== 'Alterar') {
                  props.match.params = {
                    ...props.match.params,
                    content: conteudoPage ? conteudoPage : '',
                    title: titleChallenge,
                    activity: activityPages ? activityPages : '',
                    answer: answerPage ? answerPage : '',
                  };
                  setValue(value + 1);
                  if (props.match.params.activity) {
                    dispatch(activity(props.match.params.activity));
                  }
                  dispatch(stateAll(props.match.params));

                  if (value === 2) {
                    if (props.location.action === 'edit') {
                      setBtnLabel('Alterar');
                    } else {
                      setBtnLabel('Salvar');
                    }
                  } else {
                    setBtnLabel('Próximo');
                  }
                } else {
                  if (props.match.params.id) {
                    dispatch(updateChallenge(props.match.params));
                    if (createChallengeSuccess) {
                      history.push('/desafios');
                    }
                  } else {
                    dispatch(createChallenge(props.match.params));
                  }
                }
              }}
            >
              {btnLabel}
            </Button>
          </div>
        </Paper>
      </ContentBody>
    </div>
  );
}
