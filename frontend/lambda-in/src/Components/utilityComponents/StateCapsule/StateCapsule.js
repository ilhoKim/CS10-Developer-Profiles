import React, { Component } from 'react';
// import EventEmitter
import PropTypes from 'prop-types';

/**
 * Create a local state to manage an object whilist is edited.
 *
 * @description
 */
class StateCapsule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
    this.removeItem = this.removeItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // eslint-disable-next-line arrow-parens
    this.mapAndResetKeysValues = (object) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      Object.keys(object).reduce((resetKeys, key) => {
        // eslint-disable-next-line no-param-reassign
        const valueType = Object.prototype.toString.call(object[key]);

        switch (valueType) {
          case '[object Array]':
            // eslint-disable-next-line no-param-reassign
            resetKeys[key] = [];
            // eslint-disable-next-line no-param-reassign
            resetKeys[`${key}_edit`] = '';
            break;
          default:
            // eslint-disable-next-line no-param-reassign
            resetKeys[key] = '';
        }

        return resetKeys;
      }, {});
  }

  componentDidMount() {
    this.resetState();
  }

  resetState() {
    const { schema, object } = this.props;
    const newState = {
      ...this.mapAndResetKeysValues(schema),
      ...object,
      ready: true,
    };
    // console.log('SC: resetState', newState);
    // Set local state with object-properties and initialize its values.
    this.setState(newState);
    // console.log('SC: resetState', this.state);
  }

  /**
   * Sync local state with input field.
   */
  handleChange(event) {
    // // console.log('Form Dev update');
    event.stopPropagation();

    const { id } = event.target;
    const details = id.split('-');
    const field = details[1];
    const { value } = event.target;
    // // console.log('SC handleChange:', this.state, { details, value });

    this.setState({ [field]: value });
  }

  handleKeyPress(e) {
    // console.log({
    //   key: e.key,
    //   value: e.target.value,
    //   'data-chips': e.target.dataset.chips,
    // });
    e.stopPropagation();
    const { chips } = e.target.dataset;

    if (e.key === 'Enter' && chips) {
      e.preventDefault();

      const details = e.target.id.split('-');

      const { field } = e.target.dataset;
      const { value } = e.target;
      // eslint-disable-next-line react/destructuring-assignment
      this.setState((prevState, props) => {
        const toUpdate = prevState[field];
        // // console.log({
        //   [field]: toUpdate,
        //   prevState,
        //   'prevState[field]': prevState[field],
        // });
        toUpdate.push(value);
        return { [field]: toUpdate, [details[1]]: '' };
      });
    }
  }

  createItem(field) {
    const newData = { ...this.state };
    delete newData.ready;

    const createEvent = new CustomEvent('onCreateItem', {
      bubbles: true,
      detail: {
        newData,
        field,
      },
    });
    // eslint-disable-next-line arrow-parens
    return (e) => {
      // console.log('SC createItem', { field });
      e.stopPropagation();

      e.target.dispatchEvent(createEvent);
      this.resetState();
    };
  }

  removeItem(field, index) {
    const removeEvent = new CustomEvent('onDeleteItem', {
      bubbles: true,
      detail: { field, index },
    });

    // eslint-disable-next-line arrow-parens
    return (e) => {
      // console.log('SC removeItem', { field, index });
      e.stopPropagation();

      //
      e.target.dispatchEvent(removeEvent);

      const typeOfField = Object.prototype.toString.call(field);

      if (
        // prettier-ignore
        typeOfField === '[object String]'
        || typeOfField === '[object Number]'
        || typeOfField === '[object Boolean]'
      ) {
        this.setState((prevState, props) => {
          const toUpdate = prevState[field];
          toUpdate.splice(index, 1);
          return { [field]: toUpdate };
        });
      }
    };
  }

  render() {
    const { ready } = this.state;

    const stateCapsule = { ...this.state };
    delete stateCapsule.ready;

    const { children } = this.props;

    return ready ? (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="state-capsule"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      >
        {children({
          stateCapsule,
          removeItem: this.removeItem,
          createItem: this.createItem,
        })}
      </div>
    ) : null;
  }
}

StateCapsule.propTypes = {};

export default StateCapsule;