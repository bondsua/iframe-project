/**
 * Created by Bondarev Evgeniy
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Container = styled.span`
    display: inline-block;
    color: ${props => props.color || '#222'};
    font-size: 1.5rem;
`;


const DotsText = styled.span`
    display: inline-block;
    text-align: left;
    min-width: ${props => props.minWidth || 12}px;
`;

class LoadingDots extends Component {
    _timer;

    constructor(props) {
        super(props);

        this.state = {
            dots: 0,
            dotsText: ""
        };
    }

    componentDidMount() {
        if (this.props.isEnable) {
            this._runTimer();
        }
    }

    componentWillUnmount() {
        this._stopTimer();
    }

    componentWillReceiveProps(nextProps) {
        if (this._timer && !nextProps.isEnable) {
            this._stopTimer();
        } else if (!this._timer && nextProps.isEnable) {
            this._runTimer();
        }
    }

    render() {
        const {width, text, color} = this.props;

        return <Container color={color}>
            {text} <DotsText minWidth={width}>{this.state.dotsText}</DotsText>
        </Container>
    }

    _updateDotsTimer = () => {
        let newDots = this.state.dots + 1;
        if (newDots > this.props.maxDots) {
            newDots = 0;
        }

        this.setState({
            dots: newDots,
            dotsText: new Array(newDots + 1).join(this.props.dotSymbol)
        });
    };

    _runTimer() {
        this._stopTimer();

        this._timer = window.setInterval(this._updateDotsTimer, 1000);
    }

    _stopTimer() {
        if (this._timer) {
            window.clearInterval(this._timer);
            this._timer = null;
        }
    }
}

LoadingDots.defaultProps = {
    isEnable: true,
    maxDots: 3,
    speedUpdate: 1000, // ms
    width: 14, // in px
    dotSymbol: '.',
    text: '',
    color: '#333'
};

LoadingDots.propsTypes = {
    isEnable: PropTypes.bool,
    maxDots: PropTypes.number,
    width: PropTypes.number, // width block
    speedUpdate: PropTypes.number,
    dotSymbol: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string
};

export default LoadingDots;