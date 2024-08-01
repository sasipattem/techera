import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

class CourseItem extends Component {
  state = {isLoading: true, isSuccess: false, isFailed: false, itemDetials: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        itemDetials: updatedData,
      })

      console.log(data)
    } else {
      this.setState({isLoading: false, isSuccess: false, isFailed: true})
    }
  }

  render() {
    const {isLoading, isFailed, isSuccess, itemDetials} = this.state
    const {name, imageUrl, description} = itemDetials
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid='loader' className='spinner'>
              <Loader type='TailSpin' color='#00BFFF' height={50} width={50} />
            </div>
          )}
          {isSuccess && (
            <div className='success-container'>
              <div className='image-item-container'>
                <img src={imageUrl} alt={name} className='img' />
                <div>
                  <h1 className='name'>{name}</h1>
                  <p className='description'>{description}</p>
                </div>
              </div>
            </div>
          )}
          {isFailed && (
            <div className='failure-container'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png'
                alt='failure view'
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button className='retry-btn' onClick={this.getCourseDetails}>
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default CourseItem
