import CodePush from 'react-native-code-push'
import React, { useEffect } from 'react';
const CODE_PUSH_OPTIONS = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START
  }

  const withCodePush = WrappedComponent => {
    const WrappedApp = () => {
        syncWithCodePush = (status) =>{
         //   console.log(status);
          }
          useEffect(() => {
            CodePush.sync({installMode:CodePush.InstallMode.IMMEDIATE},syncWithCodePush(),null)
          },[])
        return (
            <WrappedComponent />
        )
    }
    return CodePush(CODE_PUSH_OPTIONS)(WrappedApp)
  }

  export default withCodePush;