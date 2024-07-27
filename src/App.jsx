import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}
function App() {
  const [form,setform]=useState({})
  const[task,settask]=useState([])
  function HandleChange(e){
    const{name,value}=e.target
    setform({...form,[name]:value})
  }
  function HandleSubmit(){
    settask(
      (prev)=>{
        const newtask=[...prev,{...form,id:generateRandomId(6)}]
        return newtask
      }
    )
    console.log(task)
  }
  function HandleDelete(id){
    settask((prev)=>{
      const updatedarray=prev.filter((task)=>task.id!==id)
      return updatedarray
    })
  }
  function HandleUpdate(id){
   const UpdatedTask=prompt('Enter The Task')
   if(UpdatedTask.trim()===''){
    alert('Cant accept empty value')
    return
   }
    settask((prev)=>{
      const updatedarray=prev.map((task)=>task.id===id?{...task,Task:UpdatedTask}:task)
      return updatedarray
    })
  }
  return (
    <>
    
    <div className='todoapp'>
      
     <input type='text' name="Task" value={form.Task} onChange={HandleChange}/>
     <button onClick={HandleSubmit}> Add Task</button>
    </div>
    {task.map((tasks)=>{
      return(<div key={tasks.id} className='tasks'>
           <p>{tasks.Task}</p>
           <button onClick={()=>HandleUpdate(tasks.id)}>Update</button> 
           <button onClick={()=>HandleDelete(tasks.id)}>Delete</button>
      </div>)
    })}
    </>
  )
}

export default App
