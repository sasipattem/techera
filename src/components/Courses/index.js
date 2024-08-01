import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {courseDetials} = props
  const {id, logoUrl, name} = courseDetials
  return (
    <Link className="link" to={`courses/${id}`}>
      <li className="course-item">
        <div>
          <img src={logoUrl} alt={name} />
        </div>
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default Courses
