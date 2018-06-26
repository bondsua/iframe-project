/**
 * Created by Bondarev Evgeniy
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as appActions from './actions/app';
import * as communicatedFormActions from './actions/form/communicated';
import CommunicatedForm from './components/communicated-form/CommunicatedForm';
import LoadingDots from './components/loading-dots/LoadingDots';


const LoadingDotsWrap = styled.div`
    text-align: center;
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
`;

class App extends Component {

    componentDidMount() {
        this._authorizationProcess();
        this.props.subscribeForm();
    }

    componentWillUnmount() {
        this.props.unSubscribeForm();
    }

    render() {
        const {isReadyToShow, isTopWindow} = this.props;
        const showProcessMessage = !isTopWindow && !isReadyToShow;

        return (
            <div className="App">
                {showProcessMessage ?
                    <LoadingDotsWrap><LoadingDots color="#2975a5" text="Processing"/></LoadingDotsWrap> :
                    <CommunicatedForm/>}
            </div>
        );
    }

    _authorizationProcess = (event) => {
        const {isTopWindow} = this.props;

        if (isTopWindow) {
            this.props.readyToShow();
            return;
        }

        setTimeout(() => {
            this.props.readyToShow();
        }, 3000)
    }
}

const mapStateToProps = (state, ownProps) => {
    const {app} = state;
    const {isTopWindow} = app;

    return {
        isReadyToShow: app.isReady(),
        isTopWindow,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        readyToShow: () => {
            dispatch(appActions.ready());
        },
        subscribeForm: () => {
            dispatch(communicatedFormActions.subscribeChanges());
        },
        unSubscribeForm: () => {
            dispatch(communicatedFormActions.unsubscribeChanges());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
