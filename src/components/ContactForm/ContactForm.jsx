import styles from './ContactForm.module.css';
import Button from 'components/Button/Button';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/actions/contactsActions';



export const ContactForm = () => {
  const { contactForm, contactForm__field, contactLabel, contactInput } = styles;

  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const addNewContact = evt => {
    evt.preventDefault();

    const form = evt.target;
    const name = form.name.value;
    const number = form.number.value;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (contacts.some(contact => contact.number === number)) {
      const filteredNumber = contacts.filter(
        contact => contact.number === number
      )[0].name;
      alert(`${number} is already in contact with ${filteredNumber} `);
      return;
    }

    dispatch(addContact(newContact));
    form.reset();
  };

  return (
    <form className={contactForm} onSubmit={addNewContact}>
      <div className={contactForm__field}>
        <label htmlFor="contactName" className={contactLabel}>
          Name
        </label>
        <input
          className={contactInput}
          id="contactName"
          type="text"
          name="name"
          placeholder='Enter your name...'
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={contactForm__field}>
        <label htmlFor="contactTel" className={contactLabel}>
          Phone number
        </label>
        <input
          className={contactInput}
          id="contactTel"
          type="tel"
          name="number"
          placeholder='Enter your number...'
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <Button type="submit" title="ADD CONTACT"></Button>
    </form>
  );
};

