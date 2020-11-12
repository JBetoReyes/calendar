/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import {connect} from 'react-redux';
import {IStoreState} from '../../store/storeModel';
import {AppChangeEvent, AppSubmitEvent} from '../../../typings/htmlEvents';
import {closeModal} from '../../reducers/uiActions';
import {
  setActiveEvent,
  startAddActiveEvent,
  startUpdateEvent,
} from '../../reducers/calendarActions';
import './Modal.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#app');
}

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const initialEndDate = now.clone().add(1, 'hours');

const mapDispatchToProps = {
  closeModal,
  startAddActiveEvent,
  setActiveEvent,
  startUpdateEvent,
};

const mapStateToProps = (state: IStoreState) => ({
  isOpen: state.ui.modalOpen,
  activeEvent: state.calendar.activeEvent,
});

type DispatchPropsType = typeof mapDispatchToProps;
type StatePropsType = ReturnType<typeof mapStateToProps>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OwnPropsType = Record<string, any>;
type PropsType = StatePropsType & DispatchPropsType & OwnPropsType;

const Modal = (props: OwnPropsType) => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(initialEndDate.toDate());
  const newEvent = {
    title: '',
    notes: '',
    startDate,
    endDate,
  };
  const {
    isOpen,
    activeEvent,
    closeModal: dispatchCloseModal,
    startAddActiveEvent: dispatchStartAddActiveEvent,
    startUpdateEvent: dispatchUpdateEvent,
  } = props as PropsType;
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [form, setForm] = useState(newEvent);
  const {title, notes, startDate: start, endDate: end} = form;
  useEffect(() => {
    if (activeEvent) {
      setForm({
        title: activeEvent.title as string,
        notes: activeEvent.notes as string,
        startDate: activeEvent.start as Date,
        endDate: activeEvent.end as Date,
      });
    } else {
      setForm(newEvent);
    }
  }, [activeEvent, setForm]);
  const handleCloseModal = () => {
    dispatchCloseModal();
  };
  const handleStartDateChange = (e: Date) => {
    setStartDate(e);
    setForm({
      ...form,
      startDate: e,
    });
  };
  const handleEndDateChange = (e: Date) => {
    setEndDate(e);
    setForm({
      ...form,
      endDate: e,
    });
  };
  const handleInputChange = ({target}: AppChangeEvent) => {
    setForm((formData) => ({
      ...formData,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e: AppSubmitEvent) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire('Error', 'The end date cannot be before the start date');
      return;
    }
    if (title && title.length < 2) {
      setIsTitleValid(false);
      return;
    }
    setIsTitleValid(true);
    console.log('form: ', form);
    if (activeEvent) {
      dispatchUpdateEvent({
        title: form.title,
        notes: form.notes,
        start: form.startDate,
        end: form.endDate,
        id: activeEvent.id,
      });
    } else {
      dispatchStartAddActiveEvent({
        title: form.title,
        notes: form.notes,
        start: form.startDate,
        end: form.endDate,
      });
    }
    dispatchCloseModal();
  };
  return (
    <ReactModal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-background"
      ariaHideApp={!(process.env.NODE_ENV === 'test')}
    >
      <h1>{activeEvent ? 'Edit Event' : 'New Event'}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startdate">
            Star date and time
            <DateTimePicker
              name="stardate"
              onChange={handleStartDateChange}
              value={startDate}
              className="form-control"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="enddate">
            End date and time
            <DateTimePicker
              className="form-control"
              name="enddate"
              onChange={handleEndDateChange}
              minDate={startDate}
              value={endDate}
            />
          </label>
        </div>

        <hr />
        <div className="form-group">
          <label htmlFor="title">
            Title
            <input
              type="text"
              className={`form-control ${!isTitleValid && 'is-invalid'}`}
              placeholder="Title"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
              required
            />
          </label>
          <small id="emailHelp" className="form-text text-muted">
            Brief description
          </small>
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Notes"
            rows={5}
            name="notes"
            value={notes}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Aditional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <FontAwesomeIcon icon={faSave} />
          <span> Save</span>
        </button>
      </form>
    </ReactModal>
  );
};

Modal.propTypes = {};

export default connect<
  StatePropsType,
  DispatchPropsType,
  OwnPropsType,
  IStoreState
>(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
