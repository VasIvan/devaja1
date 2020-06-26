import React, {useState, useEffect, useCallback} from 'react'

const KeyDown = () => {
const [userText, setUserText] = useState('');
const birdNames = ['Jack', 'Pekka', 'Tommi', 'Mikko', 'Henrik', 'Matias', 'Sofia', 'Maria', 'Sara', 'Sonja']
const [number, setNumber] = useState(0)
const [currentBird, setCurrentBird] = useState(birdNames[number].toUpperCase())
const [birdArray, setBirdArray] = useState(currentBird.split(""))
const [ready, setReady] = useState(false)
const [wrong, setWrong] = useState(false)
if(ready){
  if(window.confirm('Well done! Start over again?')){
    setReady(false)
  } else {
    setReady(false)
  }
}


const handleUserKeyPress = useCallback(event => {
  const { key, keyCode } = event;



  if(birdArray.length <= 0 || birdArray === 'undefined'){
    if(number<9){
      setNumber(number+1)
    } else {
      setNumber(0)
      setReady(true)
    }
  }



  if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {

    console.log(birdArray[0])
    if(key.toUpperCase() === birdArray[0]){
      setBirdArray( prev => prev.filter(e => e !== birdArray[0]).reverse())
      setWrong(false)
    } else {
      setWrong(true)
    }
    setUserText(`${key}`.toUpperCase());
  }
}, [birdArray, number]);

useEffect(() => {
  window.addEventListener('keydown', handleUserKeyPress);

  return () => {
    window.removeEventListener('keydown', handleUserKeyPress);
  };
}, [handleUserKeyPress]);

useEffect(()=>{
  setCurrentBird(birdNames[number].toUpperCase())
}, [number, birdNames])

useEffect(()=>{
  setBirdArray(currentBird.split(""))
}, [currentBird])

return (
  <div className="cont">
    <h3>User needs to press the first letter of the name from keyboard, then the last,
    then the first again etc!</h3>
    <i>press any key to move to the next name!</i>
    <div className="game">
      <blockquote>You typed: {userText}{wrong && <span className="wrong"> This is wrong letter</span>}</blockquote>
      <blockquote>Current name: {currentBird}</blockquote>
      <blockquote>Letters left: {birdArray.join("\u00B7")}</blockquote>
    </div>
  </div>
);
}

export default KeyDown