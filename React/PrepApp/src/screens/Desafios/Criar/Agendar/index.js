import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import brLocale from '@fullcalendar/core/locales/pt-br';

import * as moment from 'moment';
import './styles.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { useDispatch } from 'react-redux';
import { dateSchandule } from 'store/modules/desafio/actions';

export default function Calendar(props) {
  const dispatch = useDispatch();

  const edit = props.location.action === 'edit';
  const calendarComponentRef = useRef();
  const [calendarWeekends] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([]);

  function handleDateClick(arg) {
    const data = moment.utc(arg.date).format('YYYY-MM-DD');
    const found = calendarEvents.find(
      el => el.start === moment(data).format('YYYY-MM-DD')
    );
    if (found) {
      window.alert('Semana ja possui agendamento');
      return;
    }
    if (moment(data) < moment(new Date())) {
      window.alert('Selecione uma data maior que hoje');
      return;
    }
    if (moment(data).weekday() !== 1) {
      window.alert('Selecione uma data que seja Segunda feira');
    } else {
      if (
        window.confirm(
          'Gostaria de adicionar um evento: ' +
            moment(data).format('DD-MM-YYYY') +
            ' ?'
        )
      ) {
        setCalendarEvents([
          ...calendarEvents,
          {
            title: props.match.params.title,
            start: moment(data).format('YYYY-MM-DD'),
            end: moment(data)
              .add(7, 'days')
              .format('YYYY-MM-DD'),
          },
        ]);
        props.match.params = {
          ...props.match.params,
          start: data,
          editou: true,
        };

        props.location.start = data;
        dispatch(dateSchandule(data));
      }
    }
  }

  useEffect(() => {
    let events = '';
    if (edit) {
      props.match.params = {
        ...props.match.params,
        id: props.location.challenge.id,
        listChallenges: props.match.params.listChallenges,
      };
      events = props.match.params.listChallenges;
    } else {
      events = props.match.params.listChallenges;
    }

    const eventos = [];
    events.forEach(el => {
      eventos.push({
        title: el.title,
        start: moment(el.startContent).format('YYYY-MM-DD'),
        end: moment(el.startContent)
          .add(7, 'days')
          .format('YYYY-MM-DD'),
      });
    });
    setCalendarEvents(eventos);

    if (edit) {
      props.location.challenge = {
        ...props.location.challenge,
        ...props.match.params,
      };
    }
  }, [edit, props.match.params.listChallenges]);

  return (
    <div className="calendar-style" key={'uuid'}>
      <div className="calendar" key={'uuid'}>
        <FullCalendar
          key={'uuid'}
          height={680}
          firstDay={1}
          className={'fc-button-primary'}
          defaultView="dayGridMonth"
          weekNumbers={true}
          locales={brLocale}
          locale="pt-br"
          header={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          weekends={calendarWeekends}
          events={calendarEvents}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  );
}
