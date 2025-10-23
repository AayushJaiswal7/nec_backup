import React from 'react'
import ReusableModal from '../../components/ReusableModal'
import PasswordField from '../../components/PasswordField'
import ButtonComponent from '../../components/ButtonComponent'

function ForceReset() {
  return (
    <>
    <ReusableModal
        isOpen={true}
        title={'Reset Your Password'}>
        <div className='flex flex-col space-y-8 items-center justify-center'>
          <PasswordField
          label={'New Password'}/>
          <PasswordField
          label={'Confirm Password'}/>
          <ButtonComponent
          title={'Reset Password'}/>
        </div>
        </ReusableModal>
    </>
  )
}

export default ForceReset