import React, { useState, useRef } from 'react';



const Otp = () => {
    const [modal, setModal] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    
  const toggleModal = () => {
    setModal(!modal);
  };
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

    const handleInputChange = (e, index) => {
      const value = e.target.value;
      if (isNaN(value)) {
        return;
      }
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text');
      if (pastedData.length === 6 && !isNaN(pastedData)) {
        const newOtp = pastedData.split('');
        setOtp(newOtp);
        newOtp.forEach((value, index) => {
          inputRefs.current[index].value = value;
        });
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (e.key === 'ArrowRight' && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    return (
        <>
        {!modal && (
             <button onClick={toggleModal} className="btn-modal">
             Verify OTP
          </button>
        )
    
        

        }
      {modal && (
      
     <> 

     <div className="popup">
     <div className="headline">
     <h2>Phone Verification</h2>
       <p>Please enter the 6 digit OTP sent to your phone number</p>
     </div>
       <div className="otp-input-container">
         {otp.map((value, index) => (
             <input className='inpt'
             key={index}
             type="text"
             maxLength="1"
             value={value}
             onChange={(e) => handleInputChange(e, index)}
             onKeyDown={(e) => handleKeyDown(e, index)}
             onPaste={(e) => handlePaste(e)}
             ref={(ref) => (inputRefs.current[index] = ref)}
           />
         ))}
       </div>
       <div className='btn'>
        <button  className='btn-verify'>Verify</button>
        <button className='back-btn'  onClick={()=>window.location.reload()} >Retry</button>        
       </div>
     </div>
     </>
      )}
        </>



    );
  }
export default Otp