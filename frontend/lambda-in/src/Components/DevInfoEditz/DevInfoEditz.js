import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import './DevInfoEditz.css';
import BioSkills from '../utilityComponents/SeekerUtils/BioSkills';
import Projects from '../utilityComponents/SeekerUtils/Projects';
import Education from '../utilityComponents/SeekerUtils/Education';
import Experience from '../utilityComponents/SeekerUtils/Experience';
import SocialLinks from '../utilityComponents/SeekerUtils/SocialLinks';
import BasicInfo from '../utilityComponents/SeekerEditUtils/BasicInfo';

export default class DevInfoEdit extends Component {
  handleChange = event => {
    /**
     * Updates APP's global state with input field.
     */
    this.props.setGS({ userInfo: { ...this.props.getGS('userInfo'), [event.target.id]: event.target.value } });
  };

  update = () => {
    const userInfo = this.props.getGS('userInfo');
    const _id = userInfo._id;

    if (_id) {
      console.log(_id);
      console.log(localStorage.getItem('token'));

      /**
       * Set in GS 'updateState': 'updateState' = 'updating'
       */
      this.props.setGS({ updateState: 'updating' });

      /**
       * axios.put: Make an HTTP PUT request
       *
       * @description update the 'seekers' model.
       * @param {string} endpoint - API endppoint
       * @param {objetc} userInfo - Data to be updated
       * @param {object} httpHeaders - Add Authorization header.
       * @return {promise}
       * @example axios.put( endpoint, userInfo, httpHeaders )
       */
      axios
        // axios 1 argument is URL and 2 argument is data 3 argument is options
        .put(
          `/api/seekers/${_id}`,
          {
            ...userInfo, // UPDATE current userInfo's state. TODO: pass only updated fields.
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then(response => {
          console.log(response.data);
          /**
           * Set in GS 'updateState': 'updateState' = 'updated'
           */
          this.props.setGS({ updateState: 'updated' });
        })
        .catch(error => {
          console.log(error);
          /**
           * Set in GS 'updateState': 'updateState' = 'error'
           */
          this.props.setGS({ updateState: 'error' });
        });
    } else {
      console.log('updating without ID');
      /**
       * Set in GS 'updateState': 'updateState' = 'error'
       */
      this.props.setGS({ updateState: 'error' });
      alert('An error occurred updating your information, please resubmit the form'); // TODO: improve UX
    }
  };
  render() {
    /**
     * Get a reference to APP's global state.
     */
    const userInfo = this.props.getGS('userInfo');

    return (
      <div className="EditContainer">
        <Paper className="paperContainer" elevation={1}>
          <Typography variant="display1" gutterBottom align="center">
            Lambda Network
          </Typography>
          <br />
          <form onChange={this.handleChange}>
            <div className="inputRow">
              {/* User basic info: name, desired title, current location */}
              <BasicInfo userInfo={userInfo} />

              {/* SOCIAL LINKS */}
              <SocialLinks userInfo={userInfo} />

              {/* BIO - TOP SKILLS */}
              <BioSkills userInfo={userInfo} />

              {/* PROJECTS */}
              <Projects userInfo={userInfo} />

              {/* EXPERIENCES */}
              <Experience userInfo={userInfo} />

              {/* EDUCATION */}
              <Education userInfo={userInfo} />

              <div>
                <Button variant="outlined" color="primary" align="center" onClick={this.update}>
                  {' '}
                  Save{' '}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
