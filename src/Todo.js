import React, {Component} from 'react';
import {ACTIONS} from './App';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            confirm: false,
        };
    }

    componentDidMount() {
        console.log("mounted");
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.confirm !== prevState.confirm) {
            console.log('confirm changed');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.confirm !== this.state.confirm) {
            console.log("don't update")
            return false;
        }
    }

    render() {
        const {id, complete, text, dispatch} = this.props;

        const confirmation = () => {
            if (window.confirm("Are you sure?")) {
                this.setState({confirm: true});
                dispatch({
                    type: ACTIONS.MARK_COMPLETE, 
                    payload: {id},
                });
            }
        };

        return (
            <li style={complete ? {'text-decoration': 'line-through'} : {}}>
                {this.state.id}
                <a style={complete ? {'display': 'none'} : {}} href="#" onClick={confirmation}>Mark Complete</a> {text}
            </li>
        );
    }
}

export default Todo;