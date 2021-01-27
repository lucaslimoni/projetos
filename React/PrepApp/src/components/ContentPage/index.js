import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import CloseIcon from '@material-ui/icons/Close';
import { classes } from './styles';
import ContentPageNavigation from 'components/ContentPageNavigation';
import _ from 'lodash';

export default function ContentPage(props) {
  const { pageIndex, pagesCount, data, onChange, handleClose } = props;
  const [navigation, setNavigation] = useState([]);
  const [html, setHtml] = useState(data.html);
  const [contCharacterPagina, setContCharacterPagina] = useState(5000);

  function handleEditorChange(content) {
    const newHtml = content.target.getContent();
    setHtml(newHtml);
    var conteudo = content.target.getContent({ format: 'text' });
    const contagem = conteudo.length;
    const cont = 5000 - contagem;
    setContCharacterPagina(cont);
    onChange &&
      onChange({
        pageIndex: pageIndex,
        html: content.target.getContent(),
        navigation: navigation,
      });
  }

  function handleChangeNavigation(item) {
    onChange &&
      onChange({
        pageIndex: pageIndex,
        html: html,
        navigation: item,
      });
  }

  useEffect(() => {
    setNavigation(data.navigation);
  }, [data.navigation]);

  return (
    <div style={classes.containerEditor}>
      <div style={classes.containerEditorCabecalho}>
        <div style={classes.containerEditorCabecalhoNumPag}>
          Página: {pageIndex + 1}
        </div>
        {pageIndex !== 0 && (
          <IconButton
            style={classes.containerEditorCabecalhoX}
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              handleClose(pageIndex);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>
      <>
        <Editor
          key={'uuid'}
          className={classes.editor}
          apiKey="Get your free API key at tiny.cloud and paste it here"
          plugins="wordcount"
          initialValue={data.html}
          init={{
            selector: 'textarea',
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
            handleEditorChange(event);
          }}
        />
        <div id={'contadorCaracteres'}>
          <div style={classes.contadorCaracteresEditor}>
            {contCharacterPagina + ' caracteres restantes'}
          </div>
        </div>
        {navigation.map((el, index) => {
          return (
            <ContentPageNavigation
              key={index}
              pageIndex={pageIndex}
              selectedPage={el.index}
              pagesCount={pagesCount}
              showDelete={true}
              index={index}
              title={el.title}
              onChange={value => {
                const item = navigation[value.index];
                item.index = value.selectedPage;
                item.title = value.title;
                handleChangeNavigation(navigation);
                setNavigation(navigation.filter(() => true));
              }}
              onDelete={index => {
                setNavigation(
                  navigation.filter((item, indexItem) => indexItem !== index)
                );
              }}
            />
          );
        })}
        <ContentPageNavigation
          pageIndex={pageIndex}
          selectedPage={-1}
          pagesCount={pagesCount}
          showDelete={false}
          index={navigation.length}
          onChange={value => {
            if (value.index === navigation.length) {
              setNavigation([
                ...navigation,
                {
                  index: value.selectedPage,
                  title: value.title,
                },
              ]);
            }
          }}
        />
      </>
    </div>
  );
}
