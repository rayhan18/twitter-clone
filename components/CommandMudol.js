import {useRecoilState} from 'recoil'
import {modalState} from '../atom/ComponentAtom'

export default function CommandMudol() {
    const [open ,setOpen] = useRecoilState(modalState)
  return (
    <div>
        <h2>Command modal</h2>
        {open && (<h1>the modal is open</h1>)}
    </div>
  )
}
