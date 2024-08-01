import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Courses from '../Courses'

import './index.css'

class Home extends Component {
  state = {isLoading: true, isSuccess: false, isFailed: false, courseList: {}}

  componentDidMount() {
    this.getApiDetials()
  }

  getApiDetials = async () => {
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        courseList: updatedData,
        isLoading: false,
        isFailed: false,
        isSuccess: true,
      })
    } else {
      this.setState({isLoading: false, isSuccess: false, isFailed: true})
    }
  }

  render() {
    const {isLoading, isFailed, isSuccess, courseList} = this.state
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" className="spinner">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          )}
          {isSuccess && (
            <div className="success-container">
              <h1>Courses</h1>
              <ul className="course-list">
                {courseList.map(each => (
                  <Courses key={each.id} courseDetials={each} />
                ))}
              </ul>
            </div>
          )}
          {isFailed && (
            <div className="failure-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                alt="failure view"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button className="retry-btn" onClick={this.getApiDetials}>
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default Home
