/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import './Modal.scss';
import { AppChangeEvent, AppSubmitEvent } from 'src/typings/htmlEvents';

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
ReactModal.setAppElement('#app');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const initialEndDate = now.clone().add(1, 'hours');

const Modal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(initialEndDate.toDate());
  const [form, setForm] = useState({
    title: '',
    notes: '',
    startDate,
    endDate,
  });
  const { title, notes } = form;
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleStartDateChange = (e: Date) => {
    setStartDate(e);
  };
  const handleEndDateChange = (e: Date) => {
    setEndDate(e);
  };
  const handleInputChange = ({ target }: AppChangeEvent) => {
    setForm((formData) => ({
      ...formData,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e: AppSubmitEvent) => {
    e.preventDefault();
    console.log(form);
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
    >
      <h1> New Event </h1>
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
              className="form-control"
              placeholder="Title"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
            />
          </label>
          <small id="emailHelp" className="form-text text-muted">
            Breif description
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
            Aditiona information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          {/* <i className="far fa-save" /> */}
          <FontAwesomeIcon icon={faSave} />
          <span> Save</span>
        </button>
      </form>
    </ReactModal>
  );
};

Modal.propTypes = {};

export default Modal;
