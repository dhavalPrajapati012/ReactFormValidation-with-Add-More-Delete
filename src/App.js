import React, { Component } from 'react'
import "./App.css"
import moment from 'moment';
moment().format();
class App extends Component {
  constructor() {
    super();

    this.state = {
      error: [],
      formField: [
        {
          id: Math.random(),
          company: "",
          startDate: "",
          endDate: "",
          jobTitle: ""
        }
      ]
    }
  }

  changeField = (evt, index) => {
    let error = this.state.error;
    let data = this.state.formField
    data[index][evt.target.name] = evt.target.value;
    this.setState({
      formField: data
    })
    if (evt.target.name === "company") {
      if (!(evt.target.value)) {
        error.push(`invalidName${index}`)
      } else if (error.length) {
        let NewError = error.filter((val) => val !== `invalidName${index}`)
        error = NewError;
      } else {
        error = []
      }
    }
    // this.setState({ error: [] })
    if (evt.target.name === "jobTitle") {
      if (!(evt.target.value)) {
        error.push(`invalidTitle${index}`)
      }
      else if (error.length) {
        let NewError = error.filter((val) => val !== `invalidTitle${index}`)
        // this.setState({ error: NewError })
        error = NewError
      } else {
        error = []
      }
    }
    if (error.length) {
      this.setState({ error })
    } else {
      this.setState({ error: [] })
    }
  }
  submit = () => {
    let error = this.state.error
    for (let i = 0; i < this.state.formField.length; i++) {
      const formField = this.state.formField[i];
      let a = moment(formField.startDate);
      let b = moment(formField.endDate);
      if (a.diff(b, 'day') >= 0) {
        error.push(`endDateWrong${i}`)
        this.setState({ error })
      } else {
        let filteredError = this.state.error.filter((val) => val !== `endDateWrong${i}`)
        this.setState({ error: filteredError })
      }
      if (!formField.startDate || !formField.endDate) {
        error.push(`bothRequired${i}`)
        this.setState({ error })
      } else if (formField.startDate && formField.endDate && !(a.diff(b, 'day') >= 0)) {
        this.setState({ error: [] })
      } else {
        let filteredError = this.state.error.filter((val) => val !== `bothRequired${i}`)
        console.log(filteredError);
        this.setState({ error: filteredError })
      }
    }
    // if (!this.state.startDate || !this.state.endDate) {
    //   error.push(`both required$`)
    // } else if (error.length) {
    //   let NewError = error.filter((val) => val !== `both required`)
    //   // error = NewError;
    //   this.setState({ error: NewError })
    // } else {
    //   this.setState({ error: [] })

    // }
    // if (a.diff(b, 'day') > 0) {
    //   error.push(`end_date_wrong`);
    // } else if (error.length) {
    //   let NewError = error.filter((val) => val !== `end_date_wrong`)
    //   this.setState({ error: NewError })

    // } else {
    //   this.setState({ error: [] })
    // }
  }
  add = () => {
    this.state.formField.push({
      id: Math.random(),
      company: "",
      startDate: "",
      endDate: "",
      jobTitle: ""
    })
    this.setState({
      formField: this.state.formField
    })
  }
  reset = () => {
    this.setState({
      formField: [
        {
          company: "",
          startDate: "",
          endDate: "",
          jobTitle: ""
        }
      ]
    })
  }
  delete = (idx) => {
    let deleteFormField = this.state.formField.filter((val) => val.id !== idx);
    this.setState({
      formField: deleteFormField
    })
  }

  render() {
    return (
      <>
        <h2 className="text-center">Past Experiences</h2>
        {this.state.formField.map((val, idx) => (
          <>
            <div className="container my-3">
              <div className="row">
                <p>{idx + 1})</p>
                <div className="col-lg-6">
                  <label htmlFor="name">Company Name : </label>
                  <input key={idx} type='text' className="company mx-2" name='company' value={val.company} onChange={(evt) => this.changeField(evt, idx)} />
                  <button className="btn btn-danger" onClick={() => this.delete(val.id)}><i class="fas fa-trash-alt"></i> Delete</button>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    {this.state.error.includes(`invalidName${idx}`) && (<p className="error">Company name Shouldn't be Empty.</p>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="container my-3">
              <div className="row">
                <div className="col-lg-6 d-flex">
                  <label htmlFor="title">Job Title : </label>
                  <input key={idx} type='text' className="title mx-2" name='jobTitle' value={val.jobTitle} onChange={(evt) => this.changeField(evt, idx)} />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  {this.state.error.includes(`invalidTitle${idx}`) && (<p className="error1">Job title Shouldn't be Empty.</p>)}
                </div>
              </div>
            </div>
            <div className="container my-3">
              <div className="row">
                <div className="col-lg-3">
                  <label htmlFor="startdate">Start Date : </label>
                </div>
                <div className="col-lg-3">
                  <label htmlFor="enddate">End Date : </label>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-lg-3">
                  <input key={idx} type='date' name='startDate' value={val.startDate} onChange={(evt) => this.changeField(evt, idx)} />
                </div>
                <div className="col-lg-3">
                  <input key={idx} type='date' name='endDate' value={val.endDate} onChange={(evt) => this.changeField(evt, idx)} />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  {this.state.error.includes(`bothRequired${idx}`) && (<p className="dateerror">Both Field are required.</p>)}
                  {this.state.error.includes(`endDateWrong${idx}`) && (<p className="dateerror">Enddate isn't valid.</p>)}
                </div>
              </div>
            </div>
          </>
        ))}
        <div className="container">
          <button className="btn btn-primary" onClick={() => this.add()}>+Add more</button>
          <button className="btn btn-primary mx-3" onClick={() => this.reset()}>Reset</button>
          <button className="btn btn-primary mx-3" onClick={() => this.submit()}>Submit</button>
        </div>
      </>
    )
  }
}


export default App

