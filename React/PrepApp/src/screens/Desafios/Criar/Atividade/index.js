import React, { useState, useEffect } from 'react';

import { classes } from './styles';
import Container from '@material-ui/core/Container';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@material-ui/core/Button';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import AddCircleOutlineIcon from '@material-ui/icons/ControlPoint';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import _ from 'lodash';
import {
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
} from '@material-ui/core';
import ChallangePreviewDialog from 'components/Actions/challengePreviewDialog/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { activity } from 'store/modules/desafio/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Atividade(props) {
  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'X',
    'Z',
    'W',
    'Y',
  ];
  const dispatch = useDispatch();
  const editar = props.location.action === 'edit' ? true : false;
  const [html, setHtml] = useState([]);
  const [enunciado, setEnunciado] = useState('');
  const [contPage, setContPage] = useState(0);
  const [contCharacterPagina, setContCharacterPagina] = useState(5000);
  const [conteudoEditor, setConteudoEditor] = useState([]);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [contagem, setContagem] = useState(0);
  const [contentEnunciado, setContentEnunciado] = useState('');
  const [delet, setDelet] = useState();
  const { activityPages } = useSelector(state => state.desafio);
  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleEditorChange(content) {
    const contagem = content.length;
    const cont = 5000 - contagem;
    setContCharacterPagina(cont);
  }

  function handleEditorBlur(content, local, id, alternativa) {
    if (local === 'enunciado') {
      setEnunciado(content);
    } else {
      if (conteudoEditor.length > 0) {
        const newArr = conteudoEditor;
        let newarr2 = [];
        newArr.forEach(el => {
          newarr2.push(el);
        });
        newarr2[id] = {
          letter: alternativa,
          html: content,
          isCorrect: false,
        };
        setConteudoEditor(newarr2);
        setHtml(newarr2);
      } else {
        setConteudoEditor([
          ...conteudoEditor,
          {
            letter: alternativa,
            html: content,
            isCorrect: false,
          },
        ]);
      }
    }
    setContagem(contagem + 1);
  }

  function handleClose(id) {
    setHtml(html.filter((item, index) => index !== id));
    setContPage(contPage - 1);
    setDelet(delet + 1);
  }

  function editor(e) {
    e.preventDefault();
    setContPage(contPage + 1);

    setHtml([
      ...html,
      {
        letter: contPage ? alphabet[contPage] : alphabet[0],
        isCorrect: false,
        html: conteudoEditor,
      },
    ]);
  }

  const handleCorrectAnswer = index => e => {
    const isCorrect = e.target.value;
    setValue(isCorrect === 'correta' ? true : false);
    let newArr = [...conteudoEditor]; // copying the old datas array
    let newArr2 = []; // copying the old datas array
    if (newArr.length > 1) {
      newArr.forEach(element => {
        newArr2.push({
          letter: element.letter,
          html: element.html,
          isCorrect: false,
        });
      });
      newArr2[index].isCorrect = isCorrect ? true : false;
      setConteudoEditor(newArr2);
    }

    let newArr3 = [...html];
    let newArr4 = [];
    if (newArr.length > 1) {
      newArr3.forEach(element => {
        newArr4.push({
          letter: element.letter,
          isCorrect: false,
        });
      });
      newArr4[index].isCorrect = true;
      setHtml(newArr4);
    }
  };

  useEffect(() => {
    if (conteudoEditor.length === 0) {
      if (activityPages) {
        setContentEnunciado(_.cloneDeep(activityPages.html));
        const alternatives = _.cloneDeep(activityPages.alternatives);
        if (alternatives) {
          setHtml(alternatives);
          setContPage(alternatives.length);
          setConteudoEditor(alternatives);
        }
      }
    }

    if (contentEnunciado) {
      setEnunciado(contentEnunciado);
    }
    props.match.params = {
      ...props.match.params,
      activity: enunciado
        ? conteudoEditor.length > 0
          ? {
              html: enunciado,
              alternatives: conteudoEditor,
            }
          : ''
        : [],
    };
  }, [activityPages, editar]);

  useEffect(() => {
    props.match.params = {
      ...props.match.params,
      activity: enunciado
        ? conteudoEditor.length > 0
          ? {
              html: enunciado,
              alternatives: conteudoEditor,
            }
          : ''
        : [],
    };

    dispatch(activity(props.match.params.activity));
  }, [enunciado, html, contPage, contagem]);

  return (
    <React.Fragment>
      <Container>
        <div style={classes.root}>
          <div style={classes.containerEditor}>
            <div style={classes.containerEditorCabecalho}>
              <span style={classes.containerEditorCabecalhoNumPag}>
                Enunciado:
              </span>
            </div>
            <Editor
              apiKey="Get your free API key at tiny.cloud and paste it here"
              plugins="wordcount"
              initialValue={contentEnunciado}
              init={{
                height: 400,
                menubar: false,
                statusbar: false,
                language: 'pt_BR',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste filemanager backgroundManager code help',
                  'autoresize',
                ],
                toolbar: `undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | 
                 link quicklink openlink unlink | filemanager | backgroundManager | code | help`,
              }}
              name="editor"
              onChange={event => {
                handleEditorChange(event.target.getContent({ format: 'text' }));
              }}
              onBlur={event => {
                handleEditorBlur(event.target.getContent(), 'enunciado');
              }}
            />
            <div id={'contadorCaracteres'}>
              <div style={classes.contadorCaracteresEditor}>
                {contCharacterPagina + ' caracteres restantes'}
              </div>
            </div>
          </div>
          <FormControl component="fieldset">
            <>
              {html.map((item, index) => {
                item = {
                  ...item,
                  id: index,
                };
                return (
                  <div
                    style={classes.containerEditor}
                    className="containerEditor"
                    id={`${item.id}`}
                    key={item.id}
                  >
                    <div key={index} style={classes.containerEditorCabecalho}>
                      <span style={classes.containerEditorCabecalhoNumPag}>
                        Alternativa: {item.letter}
                      </span>
                      <IconButton
                        style={classes.containerEditorCabecalhoX}
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleClose(item.id);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                    <Editor
                      id={`${contPage}`}
                      apiKey="Get your free API key at tiny.cloud and paste it here"
                      plugins="wordcount"
                      initialValue={item.html ? item.html : ''}
                      init={{
                        selector: 'textarea',
                        height: 400,
                        menubar: false,
                        statusbar: false,
                        language: 'pt_BR',
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code filemanager help',
                          'autoresize',
                          'maxchars',
                        ],
                        toolbar: `undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | 
                        bullist numlist outdent indent | removeformat | emoticons | 
                        link quicklink openlink unlink | code | filemanager | help`,
                        setup: function(editor) {
                          editor.maxChars = 200;
                        },
                      }}
                      name="editor"
                      onBlur={event => {
                        handleEditorBlur(
                          event.target.getContent(),
                          'alternativa',
                          item.id,
                          item.letter
                        );
                      }}
                    />
                    <div>
                      <div
                        style={classes.contadorCaracteresEditor}
                        id={'contadorCaracteres_' + item.id}
                      >
                        {/* {contCharacterPagina + ' caracteres restantes'} */}
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <RadioGroup
                        row
                        name="radioButton"
                        defaultValue={'correta'}
                        checked={item.isCorrect === true}
                        onChange={handleCorrectAnswer(index)}
                      >
                        <FormControlLabel
                          checked={item.isCorrect}
                          value="true"
                          control={<Radio color="primary" />}
                          label="Correta"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                );
              })}
            </>
          </FormControl>
          <div style={classes.containerDivButtoms}>
            <Button
              variant="contained"
              startIcon={
                <AddCircleOutlineIcon style={{ fontSize: 'x-large' }} />
              }
              style={classes.btnAddPagina_VizualizarPrevia}
              onClick={editor}
            >
              Adicionar Alternativa
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
              open={open}
              tab={1}
              pages={[{ html: enunciado, navigation: conteudoEditor }]}
            />
          </Dialog>
        </div>
      </Container>
    </React.Fragment>
  );
}
