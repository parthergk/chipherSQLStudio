import { useParams } from 'react-router-dom'

const Assignment = () => {
  const param = useParams()
  console.log("param", param.id);
  
  return (
    <div>Assignment</div>
  )
}

export default Assignment