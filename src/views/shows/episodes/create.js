/**
 * @Date:   2020-01-15T14:39:38+00:00
 * @Last modified time: 2020-02-17T17:53:24+00:00
 */
 import React, { Component } from 'react';
 import axios from 'axios';

 import Form from 'react-bootstrap/Form';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Button from 'react-bootstrap/Button';
 import InputGroup from 'react-bootstrap/InputGroup';
 import Badge from 'react-bootstrap/Badge';
 import '../../../App.css';
 import {withRouter} from 'react-router-dom'


 import { GoDeviceCameraVideo } from "react-icons/go";
 import { FiMeh } from "react-icons/fi";
 import { TiUserAdd } from "react-icons/ti";
 import { IoIosDesktop, IoIosPlayCircle, IoIosPaper, IoIosAddCircleOutline } from "react-icons/io";
 import { MdGrade, MdFormatListNumbered, MdKeyboardHide } from "react-icons/md";

 class CreateEpisode extends Component {
   constructor(props) {
     super(props);
     this.state = {
       episode: {
       belongsto: '',
       title: '',
       description: '',
       seasonnumber: '',
       numinseason: '',
       director: '',

     },
     loggedIn: localStorage.getItem('jwtToken') !== null,
     show: {

     },
     newvalue: ''
     }
   }

   componentDidMount() {
     axios.get(process.env.REACT_APP_TVGUIDE + '/shows/'+this.props.match.params.id)
      .then(response => {
        this.setState({ show: response.data });
        console.log(response.data)
      })
      .catch((error) => {
         console.log(error);
      })

   }

   handleInputChange = e => {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     console.log(`Input name ${name}. Input value ${value}.`);

     this.setState({
       [name]: value
     });
   }

   onSubmit = e => {
     e.preventDefault();

     const episode = {
       belongsto: this.state.belongsto,
       title: this.state.title,
       description: this.state.description,
       seasonnumber: this.state.seasonnumber,
       numinseason: this.state.numinseason,
       director: this.state.director
     }
     const show = {
       numofepisodes: this.state.newvalue
     }

     console.log(show);
     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     axios.post(process.env.REACT_APP_TVGUIDE + '/episodes/', episode)
     axios.post(process.env.REACT_APP_TVGUIDE + '/shows/episode/'+this.props.match.params.id, show)
     .then(res => {
       console.log(res.data);
       this.props.history.push('/episodes/'+this.props.match.params.id)
     })
     .catch(err => {
       console.log(err)

     })

   };





   render() {
       this.state.belongsto = this.props.match.params.id;
       this.state.newvalue = this.state.show.numofepisodes + 1;
     return (
       <div className="container col-lg-9">
       <center><h1 className="allHeadings mt-5">Add Episode to {this.state.show.title}</h1></center>
       <div className="emptyPages2">
           <div className="card loginregistertop mt-5">
           <div className="card-header loginregister">

             <h3 className="text-center mb-0 pb-2 pt-2">Add Episode Form</h3>

           </div>
           <div className="card-body loginbody">
           <Form autoComplete="off" onSubmit={this.onSubmit} >
            <Row>
                <Form.Group className="col-lg-12">
                       <InputGroup className="inputfields">
                         <Form.Control
                             type="text"
                             name="title"
                             className="form-control sameRow"
                             placeholder="Episode Title"
                             value={this.state.title}
                             onChange={this.handleInputChange}
                             />

                       <Form.Control
                             type="text"
                             name="director"
                             pattern="[A-Z]*"
                             className="form-control"
                             placeholder="Director"
                             value={this.state.director}
                             onChange={this.handleInputChange} />
                       </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                      <Form.Group className="col-lg-12">
                             <InputGroup className="inputfields">
                               <Form.Control
                                   type="number"
                                   name="seasonnumber"
                                   className="form-control sameRow"
                                   placeholder="Season Number"
                                   value={this.state.seasonnumber}
                                   onChange={this.handleInputChange}
                                   />

                             <Form.Control
                                   type="number"
                                   name="numinseason"
                                   pattern="[0-9]*"
                                   className="form-control"
                                   placeholder="Number in Season"
                                   value={this.state.numinseason}
                                   onChange={this.handleInputChange} />
                             </InputGroup>
                          </Form.Group>
                        </Row>

        <Row>
        <Form.Group className="col-lg-12">
        <InputGroup className="inputfields">
          <Form.Control  as="textarea"
              required
              name="description"
              placeholder="Please enter a description of the episode"
              rows="3"
              className="form-control"
              value={this.state.description}
              onChange={this.handleInputChange}
              />
        </InputGroup>

        </Form.Group>
        </Row>


  <div className="row">
             <div className="form-group col-12">
               <center><input type="submit" value="Create Episode" className="btn loginBtn btn-block " /></center>
             </div>
  <div className="col-5"></div>
  </div>
           </Form>
           </div>
           <div className="card-footer loginfooter">
              <div className="regFooter loginCollapse"></div>
           </div>
           </div>
           </div>
            </div>
     )
   }
 }
  export default withRouter(CreateEpisode);
