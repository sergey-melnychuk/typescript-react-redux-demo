import React from 'react';

type Props = {
    initial: number
}

type State = {
    current: number
}

// PureComponent - depends on props only (optimization - is then not re-rendered with parent)
class Counter extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            current: props.initial
        };
    }

    // lexical this - no need to bind method
    inc = () => {
        const next: number = this.state.current + 1;
        this.setState({ current: next })
    }

    // lexical this - no need to bind method
    dec = () => {
        const next: number = this.state.current - 1;
        this.setState({ current: next })    
    }

    render() {
        return <>
        <button data-testid="dec" onClick={ this.dec }>↓</button>
        <span data-testid="count">{ this.state.current }</span>
        <button data-testid="inc" onClick={ this.inc }>↑</button>
        </>
    }
}

export default Counter;
