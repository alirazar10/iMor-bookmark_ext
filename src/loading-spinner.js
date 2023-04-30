import React, {Component} from 'react'
import ReactDOM from 'react-dom'


class LoadingSpinner extends React.Component{
    
    render (){
        return <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span> </div> 
    }

}

export default LoadingSpinner;