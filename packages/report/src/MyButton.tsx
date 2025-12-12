import { useState } from 'react'
import {Button} from "antd";

interface MyButtonProps {
  type?: 'primary'
}

export const MyButton: React.FC<MyButtonProps> = ({ type }) => {
  const [count, setCount] = useState(0)
  return (
    <div>
      antd额按钮
      <Button>nihao</Button>
    </div>
  )
}
