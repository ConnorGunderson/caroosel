// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faClock, faVolumeDown, faVolumeMute, faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons'



export default function GlobalSettings() {

  return (
      <div className="flex flex-row justify-around items-center">
        <h3
        >
          {
            0
          }
        </h3>
        {/* <FontAwesomeIcon 
          aria-label="volume" 
          icon={!active ? faVolumeMute : volume > .25 ? faVolumeUp : volume > 0 ? faVolumeDown : faVolumeOff } 
        /> */}
        <input
          aria-label="volume"
          type='range' 
          value={0} 
          min={0} 
          max={.5} 
          step={.005} 
          // onChange={(e: React.ChangeEvent<any>) => setVolume(e.target.value)} 
          >
        </input>
      </div>
  )
}