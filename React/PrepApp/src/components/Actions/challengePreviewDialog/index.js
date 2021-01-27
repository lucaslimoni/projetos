import React, { useState, useEffect } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { classes } from './styles';
import { IconButton, Divider } from '@material-ui/core';

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

export default function ChallangePreviewDialog(props) {
  const pages = props.pages;
  const [indexPreview, setIndexPreview] = useState(0);
  const [navigation, setNavigation] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);

  function handleClickPreview(key) {
    if (key === '>') {
      if (pages.length - 1 > indexPreview) {
        setIndexPreview(indexPreview + 1);
      }
    } else {
      if (indexPreview > 0) {
        setIndexPreview(indexPreview - 1);
      }
    }
  }

  useEffect(() => {
    if (pages.length > 0 && pages[indexPreview].navigation) {
      setNavigation(pages[indexPreview].navigation);
    }
    if (pages.length <= 1) {
      setShowNext(true);
    } else {
      if (pages.length - 1 === indexPreview) {
        setShowNext(true);
      } else {
        setShowNext(false);
      }
    }
    if (indexPreview === 0) {
      setShowPrev(true);
    } else {
      setShowPrev(false);
    }
  }, [pages, indexPreview]);

  return (
    <>
      <div style={classes.divDialogContentExt}>
        <DialogContent key={'uuid'}>
          <div style={classes.divDialogContentSpeecker}>&nbsp;</div>
          <div style={classes.divDialogContentSensor}>&nbsp;</div>
          <DialogContent key={'uuid'} style={{ fontSize: 14 }}>
            <div style={classes.divDialogContentText}>
              <div style={classes.divDialogTitleContent}>
                <IconButton
                  disabled={showPrev}
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    handleClickPreview('<');
                  }}
                >
                  <ChevronLeft fontSize="inherit" />
                </IconButton>

                <DialogTitle style={{ padding: 10 }}>
                  <div style={classes.divDialogTitle}>
                    {props.match.params.title ? (
                      <span>{props.match.params.title}</span>
                    ) : (
                      <span>{'Título do desafio'}</span>
                    )}
                  </div>
                </DialogTitle>

                <IconButton
                  disabled={showNext}
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    handleClickPreview('>');
                  }}
                >
                  <ChevronRight fontSize="inherit" />
                </IconButton>
              </div>
              <Divider style={{ backgroundColor: '#FF0000' }} />
              {pages.length > 0 ? (
                <>
                  <DialogTitle style={classes.divDialogTitleConteudo}>
                    <div style={classes.divDialogTitleContentAndPage}>
                      {props.tab === 0 && (
                        <>
                          <div>CONTEÚDO</div>
                          <div>Página: {indexPreview + 1}</div>
                        </>
                      )}
                      {props.tab === 1 && <div>Atividade</div>}
                      {props.tab === 2 && <div>Resolução</div>}
                    </div>
                  </DialogTitle>

                  <div style={classes.divDialogContentInnerHTML}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pages[indexPreview].html,
                      }}
                    ></div>
                    {navigation.length > 0
                      ? navigation.map((nav, indexNav) => {
                          return (
                            <>
                              <div style={classes.divNavigation}>
                                <div
                                  style={classes.divNavigationIndex}
                                  dangerouslySetInnerHTML={{
                                    __html: alphabet[indexNav],
                                  }}
                                ></div>
                                <div
                                  style={classes.divNavigationTitle}
                                  dangerouslySetInnerHTML={{
                                    __html: nav.title
                                      ? nav.title
                                      : nav.html
                                      ? nav.html
                                      : '',
                                  }}
                                ></div>
                              </div>
                            </>
                          );
                        })
                      : ''}
                  </div>
                </>
              ) : (
                <>
                  <DialogTitle style={classes.divDialogTitleConteudo}>
                    <span style={classes.divDialogTitleContentAndPage}>
                      <span>CONTEÚDO</span>
                    </span>
                  </DialogTitle>
                  <span style={classes.divDialogContentInnerHTML}>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Nunc congue nisi vitae suscipit tellus mauris a.
                      Pellentesque massa placerat duis ultricies lacus sed
                      turpis tincidunt id. Amet facilisis magna etiam tempor
                      orci eu. Etiam tempor orci eu lobortis elementum nibh
                      tellus molestie nunc. Vel eros donec ac odio tempor orci
                      dapibus ultrices. Vel turpis nunc eget lorem dolor sed
                      viverra. Fermentum iaculis eu non diam phasellus
                      vestibulum lorem sed. Id eu nisl nunc mi ipsum faucibus.
                      Amet mattis vulputate enim nulla aliquet porttitor lacus
                      luctus accumsan. Cursus mattis molestie a iaculis at. In
                      massa tempor nec feugiat nisl pretium fusce id. Mi tempus
                      imperdiet nulla malesuada. Ornare quam viverra orci
                      sagittis eu volutpat odio. Ullamcorper sit amet risus
                      nullam eget. Egestas dui id ornare arcu odio ut. Morbi
                      tristique senectus et netus et malesuada. Lorem ipsum
                      dolor sit amet consectetur adipiscing elit. Sapien et
                      ligula ullamcorper malesuada proin libero nunc consequat.
                      Enim sed faucibus turpis in eu mi bibendum. Quis vel eros
                      donec ac odio tempor orci dapibus ultrices. Volutpat
                      maecenas volutpat blandit aliquam etiam erat velit
                      scelerisque. Augue neque gravida in fermentum et
                      sollicitudin ac orci. Elit duis tristique sollicitudin
                      nibh sit. Tristique sollicitudin nibh sit amet commodo
                      nulla facilisi. Nunc id cursus metus aliquam eleifend mi
                      in nulla posuere.
                    </span>
                  </span>
                </>
              )}
            </div>
          </DialogContent>
          <div style={classes.divDialogContentMicrophone}>&nbsp;</div>
        </DialogContent>
      </div>
    </>
  );
}
