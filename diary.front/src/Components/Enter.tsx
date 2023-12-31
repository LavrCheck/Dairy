import './Enter.sass'
import important from '../images/important.svg'
import submitEnter from '../images/submitEnter.svg'
import { Button } from '../ui/Button'
import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid';
import { actions } from '../store'
import { useDispatch } from 'react-redux'
import { addTaskBD } from '../api'



class Task {
    userId: string | null
    taskId: string
    taskName: string
    important: boolean
    date: number | null

    constructor(userId: string | null, taskName: string, important: boolean, date: number | null) {
        this.userId = userId
        this.taskId = uuidv1()
        this.taskName = taskName
        this.important = important
        this.date = date
    }
}



export const Enter = ({
    userId,
    date,
    hideEnter,
}: {
    userId: string | null
    date: number | null
    hideEnter: () => void
}) => {

    const [taskName, setTaskName] = useState<string>('')
    const changeTask = (e: any) => { setTaskName(e.target.value) }
    const [isCheckbox, setIsCheckbox] = useState<boolean>(false)
    const changeCheckbox = (e: any) => { setIsCheckbox(e.target.checked) }

    const dispatch = useDispatch()

    async function submit() {
        hideEnter()
        dispatch(actions.addTask(new Task(userId, taskName, isCheckbox, date)))
        if (userId !== null) { await addTaskBD(new Task(userId, taskName, isCheckbox, date)) }
    }



    return (
        <div className="Enter">
            <input value={taskName} onChange={changeTask} type='text' className='task' />
            <div className='important'>
                <input checked={isCheckbox} onChange={changeCheckbox} type='checkbox' />
                <img src={important} alt='!' />
            </div>
            <Button onClick={() => submit()} ><img src={submitEnter} alt='+' /></Button>
        </div>
    )
}