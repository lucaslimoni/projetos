import React, { useState, useEffect, useRef } from 'react';
import { classes } from './styles';
import Container from '@material-ui/core/Container';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@material-ui/core/Button';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ChallangePreviewDialog from 'components/Actions/challengePreviewDialog/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { answer } from 'store/modules/desafio/actions';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Resolucao(props) {
  const dispatch = useDispatch();
  const { answerPage } = useSelector(state => state.desafio);
  const [contCharacterPagina, setContCharacterPagina] = useState(5000);
  const [conteudoEditor, setConteudoEditor] = useState([]);
  const [open, setOpen] = useState(false);

  const [contentAnswer, setContentAnswer] = useState('');
  const imageBackground = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  function handleEditorChange(content) {
    const contagem = content.length;
    const cont = 5000 - contagem;
    setContCharacterPagina(cont);
  }
  function handleEditorBlur(content) {
    setConteudoEditor(content);
    props.match.params = {
      ...props.match.params,
      answer: content,
    };
    dispatch(answer(content));
  }

  useEffect(() => {
    if (answerPage) {
      setContentAnswer(answerPage);
      setConteudoEditor(answerPage);
    }
  }, [answerPage, conteudoEditor]);

  useEffect(() => {
    props.match.params = {
      ...props.match.params,
      answer: conteudoEditor,
    };
  }, [conteudoEditor]);

  return (
    <Container>
      <div style={classes.root}>
        <div style={classes.containerEditor} id="containerEditor">
          <div style={classes.containerEditorCabecalho}>
            <span style={classes.containerEditorCabecalhoNumPag}>
              Página de resolução:
            </span>
          </div>
          <Editor
            apiKey="Get your free API key at tiny.cloud and paste it here"
            plugins="wordcount"
            initialValue={contentAnswer ? contentAnswer : ''}
            ref={imageBackground}
            init={{
              height: 400,
              menubar: false,
              statusbar: false,
              language: 'pt_BR',
              paste_data_images: true,
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
              handleEditorBlur(event.target.getContent());
            }}
          />
          <div id={'contadorCaracteres'}>
            <div style={classes.contadorCaracteresEditor}>
              {contCharacterPagina + ' caracteres restantes'}
            </div>
          </div>
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
              'Prévia'
            </Alert>
          </DialogTitle>

          <ChallangePreviewDialog
            {...props}
            open={open}
            tab={2}
            pages={[{ html: conteudoEditor }]}
          />
        </Dialog>
      </div>
    </Container>
  );
}
