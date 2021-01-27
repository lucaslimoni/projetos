import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { classes, Title } from './styles';
import Container from '@material-ui/core/Container';
import ContentPage from '~/components/ContentPage';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import AddCircleOutlineIcon from '@material-ui/icons/ControlPoint';
import _ from 'lodash';

import './styles.css';
import { IconButton } from '@material-ui/core';
import ChallangePreviewDialog from 'components/Actions/challengePreviewDialog/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { titulo, conteudo } from 'store/modules/desafio/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Conteudo(props) {
  const dispatch = useDispatch();
  const editar = props.location.action === 'edit' ? true : false;

  const { conteudoPage, titleChallenge, idChallengeEdit } = useSelector(
    state => state.desafio
  );
  const [contCharacter, setContCharacter] = useState(0);
  const [pages, setPages] = useState([
    {
      html: '',
      navigation: [],
    },
  ]);
  const [contPage, setContPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  function handleChange(event) {
    const cont = event.length;
    setContCharacter(cont);
    setTitle(event);
    props.match.params = {
      ...props.match.params,
      title: event !== 'undefined' ? event : '',
    };
    dispatch(titulo(event));
  }

  function handleDelete(id) {
    setPages(pages.filter((item, index) => index !== id));
    setContPage(contPage - 1);
  }

  function addPage(e) {
    e.preventDefault();
    setPages([
      ...pages,
      {
        html: '',
        navigation: [],
      },
    ]);
    setContPage(contPage + 1);
  }

  useEffect(() => {
    titleChallenge && setTitle(titleChallenge);
    if (pages[0].html === '' && conteudoPage) {
      setPages(_.cloneDeep(conteudoPage));
      setContPage(conteudoPage.length);
    } else if (conteudoPage) {
      setPages(_.cloneDeep(conteudoPage));
      setContPage(conteudoPage.length);
    }
  }, [conteudoPage, titleChallenge, editar]);

  useEffect(() => {
    props.match.params = {
      ...props.match.params,
      content: pages,
    };
  }, [pages]);

  return (
    <Formik
      initialValues={{
        titulo: '',
      }}
    >
      {() => (
        <Form>
          <React.Fragment>
            <Container>
              <div style={classes.root}>
                <label style={Title}>Título do Desafio*</label>
                <Field
                  style={classes.tituloDesafio}
                  name="titulo"
                  maxLength={21}
                  value={title}
                  onChange={event => {
                    handleChange(event.target.value);
                  }}
                />
                <div style={classes.contadorCaracteres}>
                  {contCharacter + ' / 21'}
                </div>
                {pages.map((item, indexItem) => {
                  return (
                    <ContentPage
                      key={indexItem}
                      pageIndex={indexItem}
                      data={{
                        html: item.html,
                        navigation: item.navigation,
                      }}
                      pagesCount={contPage}
                      onChange={value => {
                        const item = pages[value.pageIndex];
                        item.html = value.html;
                        item.navigation = value.navigation;
                        setPages(pages);
                        dispatch(conteudo(pages));
                      }}
                      handleClose={index => {
                        handleDelete(indexItem);
                      }}
                    />
                  );
                })}
                <div style={classes.containerDivButtoms}>
                  <Button
                    variant="contained"
                    startIcon={
                      <AddCircleOutlineIcon style={{ fontSize: 'x-large' }} />
                    }
                    style={classes.btnAddPagina_VizualizarPrevia}
                    onClick={addPage}
                  >
                    Adicionar página
                  </Button>
                </div>
                <div style={classes.containerDivButtoms}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<RemoveRedEyeIcon />}
                    style={classes.btnAddPagina_VizualizarPrevia}
                    onClick={() => {
                      handleClickOpen();
                    }}
                  >
                    Visualizar prévia
                  </Button>
                </div>

                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle
                    style={{
                      padding: 0,
                      background: '#3796F6 no-repeat padding-box',
                      borderRadius: '5 5 0 0',
                      opacity: 1,
                    }}
                  >
                    <Alert
                      variant="filled"
                      severity="info"
                      icon={false}
                      style={{ paddingLeft: 20, fontSize: 18 }}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      Prévia
                    </Alert>
                  </DialogTitle>
                  <ChallangePreviewDialog
                    {...props}
                    pages={pages}
                    open={open}
                    tab={0}
                    pages={pages}
                  />
                </Dialog>
              </div>
            </Container>
          </React.Fragment>
        </Form>
      )}
    </Formik>
  );
}
