/**
 * Created by Bondarev Evgeniy
 */
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import * as communicatedFormActions from '../../actions/form/communicated';


const Form = styled.form`
    ${props => props.themeIframe && css`
        color: #ff924d;
    `}
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const FormInput = styled.input`
    font-size: 1.25rem;
    line-height: 1.3;
    flex: 5 1 auto;
    margin-right: 10px;
`;

const FormButton = styled.button`
    flex: 1 0 50px;
    font-size: 1.25rem;
    line-height: 1.3;
    
    ${props => props.themeIframe && css`
        background-color: #ff924d;
    `}
`;

class CommunicatedForm extends Component {

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.syncData();
    };

    onChangeText = (e) => {
        this.props.changeFormText(e.target.value);
    };

    render() {
        const {formText, formInIframe} = this.props;

        return <Form themeIframe={formInIframe} onSubmit={this.onFormSubmit}>
            <FormTitle>Form {formInIframe && <span>in iframe</span>}</FormTitle>
            <FormRow>
                <FormInput placeholder="Enter text here" value={formText} onChange={this.onChangeText}/>
                <FormButton themeIframe={formInIframe}>
                    Submit
                </FormButton>
            </FormRow>
        </Form>
    }
}

const mapStateToProps = (state, ownProps) => {
    const {communicated} = state.form;
    const {isTopWindow} = state.app;

    return {
        formText: communicated.text,
        formInIframe: !isTopWindow,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeFormText: function (value) {
            dispatch(communicatedFormActions.changeText(value));
        },
        syncData: function () {
            dispatch(communicatedFormActions.sync());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunicatedForm);