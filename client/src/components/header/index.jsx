import {LogOut} from 'lucide-react'
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { callLogoutApi } from '../../services';
import { useContext } from 'react';
import { TaskManagerContext } from '../../context';
// import { useNavigate } from 'react-router-dom';

function Header() {

     const {setUser}=useContext(TaskManagerContext)
     const navigate=useNavigate()

    async function handleLogout(){
      const response=await callLogoutApi();
      if(response?.success){
       setUser(null);
       navigate("/auth")
      }
    }
        
    

    return (
        <header className="border-b border-gray-200 ">
            <div className="container mx-auto h-16">
                <div className="flex h-[64px] items-center w-full justify-between">

                    <div className="w-auto">
                        <h1>Task Manager</h1>
                    </div>

                    <div className="flex gap-3">
                        <Link className="text-black text-xl font-bold" to={'/tasks/list'}>Tasks</Link>
                        <Link className="text-black text-xl font-bold" to={'/tasks/scrum-board'}>Scrum-board</Link>
                    </div>
                   <div>
                    <LogOut onClick={handleLogout}  color='#000' className='cursor-pointer'/>
                   </div>

                </div>

            </div>

        </header>

    );
}

export default Header;